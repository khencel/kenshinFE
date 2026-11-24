"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import styles from "./MenuManagement.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import CustomModal from "../../../../../components/Modal";
import {
    Category,
    CategoryForm,
    Menu,
    MenuForm,
} from "../../../../../types/kenshin/category";
import { showConfirmSwal } from "../../../../../components/CustomSwal";
import {
    createRecord,
    deleteRecord,
    getData,
    updateRecord,
} from "@/lib/api/apiEndpoint";
import { Branch } from "../../../../../types/kenshin/branch";
import CustomToast from "../../../../../components/Toas";

export default function MenuManagementPage() {
    // =========================
    // COMMON STATES
    // =========================
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Menu");
    const [branch, setBranch] = useState<Branch[]>([]);

    // Toast
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info");

    const showMessage = (
        text: string,
        status: "success" | "error" | "warning" | "info"
    ) => {
        setToastText(text);
        setToastStatus(status);
        setShowToast(true);
    };

    // =========================
    // CATEGORY STATES
    // =========================
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [openCategoryMenu, setOpenCategoryMenu] = useState<number | null>(null);
    const categoryMenuRef = useRef<HTMLDivElement | null>(null);

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [showModal, setShowModal] = useState(false);

    const initialForm: CategoryForm = {
        name: "",
        branch: 0,
        is_active: true,
    };

    const [form, setForm] = useState<CategoryForm>(initialForm);

    // =========================
    // MENU STATES
    // =========================
    const [menuList, setMenuList] = useState<Menu[]>([]);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [addItemModalShow, setAddItemModalShow] = useState(false);

    const initialFormMenu: MenuForm = {
        category: 0,
        image: null,
        name: "",
        description: "",
        price: "",
        is_active: true,
    };

    const [formMenu, setFormMenu] = useState<MenuForm>(initialFormMenu);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // =========================
    // INPUT HANDLERS
    // =========================

    // Category form handler
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "is_active"
                    ? value === "true"
                    : name === "branch"
                    ? Number(value)
                    : value,
        }));
    };

    // Menu form handler
    const handleMenuInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        // File input
        if (name === "image" && e.target instanceof HTMLInputElement) {
            const file = e.target.files?.[0];

            if (file) {
                setFormMenu((prev) => ({ ...prev, image: file }));
                setImagePreview(URL.createObjectURL(file));
            }

            return;
        }

        setFormMenu((prev) => ({
            ...prev,
            [name]:
                name === "is_active"
                    ? value === "true"
                    : name === "category"
                    ? Number(value)
                    : value,
        }));
    };

    // =========================
    // DERIVED DATA
    // =========================
    const filteredItems = useMemo(() => {
        return menuList.filter((item) => {
            const categoryName = categoryList.find(
                (c) => c.id === item.category
            )?.name;

            const matchesCategory = categoryName === selectedCategory;

            const matchesSearch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [menuList, categoryList, selectedCategory, search]);

    const formatPrice = (price: number) => `₱${price.toFixed(2)}`;

    // =========================
    // FETCH
    // =========================
    const getbranch = async () => {
        try {
            const res = await getData<Branch>("branches", 1, 1000);
            setBranch(res.results);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const res = await getData<Category>("category", 1, 1000);

            setCategoryList(res.results);

            // Automatically select the first category
            setSelectedCategory((prev) => prev || res.results[0]?.name || "");
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchMenu = async () => {
        try {
            const res = await getData<Menu>("menu", 1, 1000);
            setMenuList(res.results);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };

    // =========================
    // CATEGORY CRUD
    // =========================
    const handleAddCategory = () => {
        setEditingCategory(null);
        setForm(initialForm);
        setShowModal(true);
    };

    const handleEditCategory = (data: Category) => {
        setEditingCategory(data);

        setForm({
            name: data.name,
            branch: data.branch,
            is_active: data.is_active,
        });

        setShowModal(true);
    };

    const handleSaveConfirm = async () => {
        const isEditing = editingCategory !== null;

        await showConfirmSwal({
            title: isEditing ? "Update Category?" : "Save Category?",
            text: isEditing
                ? "Are you sure you want to update this Category?"
                : "Are you sure you want to create this Category?",
            confirmButtonText: isEditing ? "Yes, Update" : "Yes, Save",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                await handleSave();
            },
        });
    };

    const handleSave = async () => {
        try {
            if (editingCategory) {
                await updateRecord<Category, CategoryForm>(
                    "category",
                    editingCategory.id,
                    { ...form, id: editingCategory.id }
                );
                showMessage("Category updated successfully.", "success");
            } else {
                await createRecord<Category, CategoryForm>("category", form);
                showMessage("Category created successfully.", "success");
            }

            setShowModal(false);
            setEditingCategory(null);
            setForm(initialForm);

            await fetchCategory();
        } catch (error) {
            console.error("Error saving category:", error);
            showMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to save category.",
                "error"
            );
        }
    };

    const handleDelete = async (data: Category) => {
        await showConfirmSwal({
            title: "Delete Category?",
            text: `Are you sure you want to delete ${data.name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                try {
                    await deleteRecord("category", data.id);

                    showMessage("Category deleted successfully.", "success");

                    await fetchCategory();
                } catch (error) {
                    console.error("Delete error:", error);

                    showMessage(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete Category.",
                        "error"
                    );
                }
            },
        });
    };

    // =========================
    // MENU CRUD
    // =========================

    // Open modal for CREATE
    const handleAddItem = () => {
        setEditingMenu(null);
        setFormMenu({
            ...initialFormMenu,
            category:
                categoryList.find((c) => c.name === selectedCategory)?.id ?? 0,
        });
        setImagePreview(null);
        setAddItemModalShow(true);
    };

    // Open modal for UPDATE
    const handleEditMenu = (item: Menu) => {
        setEditingMenu(item);

        setFormMenu({
            category: item.category,
            image: item.image,
            name: item.name,
            description: item.description,
            price: item.price,
            is_active: item.is_active,
        });

        setImagePreview(null);
        setAddItemModalShow(true);
    };

    const handleCloseMenuModal = () => {
        setAddItemModalShow(false);
        setEditingMenu(null);
        setFormMenu(initialFormMenu);
        setImagePreview(null);
    };

    const handleSaveMenuConfirm = async () => {
        const isEditing = editingMenu !== null;

        await showConfirmSwal({
            title: isEditing ? "Update Menu?" : "Save Menu?",
            text: isEditing
                ? "Are you sure you want to update this menu?"
                : "Are you sure you want to create this menu?",
            confirmButtonText: isEditing ? "Yes, Update" : "Yes, Save",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                await handleSaveMenu();
            },
        });
    };

    const handleSaveMenu = async () => {
        try {
            const payload = new FormData();
            payload.append("category", String(formMenu.category));
            payload.append("name", formMenu.name);
            payload.append("description", formMenu.description);
            payload.append("price", formMenu.price);
            payload.append("is_active", String(formMenu.is_active));

            // Ipadala lang ang image kung bagong file ang pinili
            if (formMenu.image instanceof File) {
                payload.append("image", formMenu.image);
            }

            if (editingMenu) {
                await updateRecord("menu", editingMenu.id, payload);
                showMessage("Menu updated successfully.", "success");
            } else {
                await createRecord("menu", payload);
                showMessage("Menu created successfully.", "success");
            }

            handleCloseMenuModal();

            await fetchMenu();
        } catch (error) {
            console.error("Error saving menu:", error);
            showMessage(
                error instanceof Error ? error.message : "Failed to save menu.",
                "error"
            );
        }
    };

    const handleDeleteMenu = async (item: Menu) => {
        await showConfirmSwal({
            title: "Delete Menu?",
            text: `Are you sure you want to delete ${item.name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                try {
                    await deleteRecord("menu", item.id);

                    showMessage("Menu deleted successfully.", "success");

                    await fetchMenu();
                } catch (error) {
                    console.error("Delete menu error:", error);

                    showMessage(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete menu.",
                        "error"
                    );
                }
            },
        });
    };

    // =========================
    // EFFECTS
    // =========================
    useEffect(() => {
        getbranch();
        fetchCategory();
        fetchMenu();

        function handleClickOutside(event: MouseEvent) {
            if (
                categoryMenuRef.current &&
                !categoryMenuRef.current.contains(event.target as Node)
            ) {
                setOpenCategoryMenu(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // =========================
    // RENDER
    // =========================
    return (
        <>
            <div className={styles.menuPage}>
                {/* HEADER */}
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                    <div>
                        <h2 className={styles.pageTitle}>Items</h2>
                        <p className={styles.pageDescription}>
                            Changes show on the Sales screen the next time it
                            loads. Past receipts keep the names and prices they
                            were sold at.
                        </p>
                    </div>


                    <div className={styles.tabs}>
                        {["Menu", "Add-ons"].map((tab) => (
                            <button
                                key={tab}
                                className={
                                    activeTab === tab ? styles.activeTab : ""
                                }
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row g-4">
                    {/* CATEGORY SIDEBAR */}
                    <div className="col-lg-3 mt-0">
                        <div className={styles.categoryPanel}>
                            <div className={styles.categoryHeader}>
                                <strong>Categories</strong>

                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={handleAddCategory}
                                >
                                    Add category
                                </button>
                            </div>

                            <div className="p-2">
                                {categoryList.map((item) => {
                                    const count = menuList.filter(
                                        (menuItem) =>
                                            menuItem.category === item.id
                                    ).length;

                                    return (
                                        <div
                                            key={item.id}
                                            className={`${styles.categoryItem} ${
                                                selectedCategory === item.name
                                                    ? styles.selectedCategory
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedCategory(item.name)
                                            }
                                        >
                                            <div>
                                                <div
                                                    className={
                                                        styles.categoryName
                                                    }
                                                >
                                                    {item.name}
                                                </div>

                                                <small
                                                    className={
                                                        styles.itemCount
                                                    }
                                                >
                                                    {count} items
                                                </small>
                                            </div>

                                            <div
                                                className="dropdown"
                                                ref={
                                                    openCategoryMenu === item.id
                                                        ? categoryMenuRef
                                                        : null
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <button
                                                    className={
                                                        styles.categoryIcon
                                                    }
                                                    title="More options"
                                                    onClick={() =>
                                                        setOpenCategoryMenu(
                                                            openCategoryMenu ===
                                                                item.id
                                                                ? null
                                                                : item.id
                                                        )
                                                    }
                                                >
                                                    <BsThreeDotsVertical />
                                                </button>

                                                {openCategoryMenu ===
                                                    item.id && (
                                                    <div className="dropdown-menu show">
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                setOpenCategoryMenu(
                                                                    null
                                                                );
                                                                handleEditCategory(
                                                                    item
                                                                );
                                                            }}
                                                            style={{
                                                                fontSize:
                                                                    "13px",
                                                                color: "#858b95",
                                                            }}
                                                        >
                                                            <LuPencil className="me-2" />
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="dropdown-item text-danger"
                                                            onClick={() => {
                                                                setOpenCategoryMenu(
                                                                    null
                                                                );
                                                                handleDelete(
                                                                    item
                                                                );
                                                            }}
                                                            style={{
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                        >
                                                            <FaRegTrashAlt className="me-2" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {categoryList.length === 0 && (
                                    <div className="text-center text-muted py-4">
                                        No categories found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* MENU CONTENT */}
                    <div className="col-lg-9 mt-0">
                        {/* TOOLBAR */}
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <div className={styles.searchBox}>
                                <i className="bi bi-search" />

                                <input
                                    type="text"
                                    placeholder="Search all items"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    className={styles.addButton}
                                    onClick={handleAddItem}
                                >
                                    <FaPlus />
                                    Add item
                                </button>
                            </div>
                        </div>

                        {/* CATEGORY TITLE */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className={styles.sectionTitle}>
                                {activeTab === "Menu"
                                    ? selectedCategory
                                    : activeTab}
                            </h5>

                            <small className="text-muted">
                                {filteredItems.length} items
                            </small>
                        </div>

                        {activeTab === "Menu" ? (
                            <div className="row g-3">
                                {filteredItems.map((item) => (
                                    <div
                                        className="col-12 col-md-6 col-xl-4"
                                        key={item.id}
                                    >
                                        <div className={styles.productCard}>
                                            {/* IMAGE */}
                                            <div
                                                className={styles.productImage}
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    <span>🍽️</span>
                                                )}

                                                {!item.is_active && (
                                                    <div
                                                        className={
                                                            styles.hiddenOverlay
                                                        }
                                                    >
                                                        Inactive
                                                    </div>
                                                )}
                                            </div>

                                            {/* DETAILS */}
                                            <div
                                                className={
                                                    styles.productDetails
                                                }
                                            >
                                                <h6>{item.name}</h6>

                                                <small className="text-muted">
                                                    {item.description}
                                                </small>

                                                <div
                                                    className={styles.priceRow}
                                                >
                                                    <strong>
                                                        {formatPrice(
                                                            Number(item.price)
                                                        )}
                                                    </strong>
                                                </div>
                                            </div>

                                            {/* FOOTER */}
                                            <div
                                                className={styles.productFooter}
                                            >
                                                <div />

                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDeleteMenu(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() =>
                                                            handleEditMenu(item)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {filteredItems.length === 0 && (
                                    <div className="col-12">
                                        <div className={styles.emptyState}>
                                            <i className="bi bi-cup-hot" />
                                            <h5>No items found</h5>
                                            <p>
                                                There are no items in this
                                                category.
                                            </p>
                                            <button
                                                className={styles.addButton}
                                                onClick={handleAddItem}
                                            >
                                                Add item
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <h5>{activeTab} Management</h5>
                                <p>
                                    {activeTab} management will be implemented
                                    here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CATEGORY MODAL */}
            <CustomModal
                show={showModal}
                title={editingCategory ? "Edit Category" : "Create Category"}
                handleClose={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setForm(initialForm);
                }}
                content={
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Category Name:</label>
                                <input
                                    type="text"
                                    className="form-control txtStandard"
                                    name="name"
                                    placeholder="Ex. Ramen"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Branch:</label>
                                <select
                                    name="branch"
                                    className="form-control txtStandard"
                                    onChange={handleInputChange}
                                    value={form.branch}
                                    required
                                >
                                    <option value={0} hidden>
                                        Select Branch
                                    </option>
                                    {branch.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Status:</label>
                                <select
                                    name="is_active"
                                    className="form-control txtStandard"
                                    value={String(form.is_active)}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </>
                }
                onSave={handleSaveConfirm}
                saveText={editingCategory ? "Update Category" : "Add Category"}
            />

            {/* MENU MODAL */}
            <CustomModal
                show={addItemModalShow}
                title={editingMenu ? "Edit Menu" : "Create Menu"}
                handleClose={handleCloseMenuModal}
                content={
                    <>
                        {/* Image Upload with Preview */}
                        <div className="text-center mb-3">
                            <label className="d-block mb-2">Menu Image:</label>

                            <div className="mb-2">
                                <img
                                    src={
                                        imagePreview ||
                                        (typeof formMenu.image === "string" &&
                                        formMenu.image
                                            ? formMenu.image
                                            : "/2606083_5563.jpg")
                                    }
                                    alt="Menu Preview"
                                    style={{
                                        width: "180px",
                                        height: "140px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </div>

                            {/* Bawal lagyan ng value ang file input */}
                            <input
                                type="file"
                                name="image"
                                className="form-control txtStandard"
                                accept="image/*"
                                onChange={handleMenuInputChange}
                            />
                        </div>

                        {/* Category */}
                        <div className="row">
                            <div className="col-md-6">
                                <label>Category:</label>
                                <select
                                    name="category"
                                    className="form-control txtStandard"
                                    value={formMenu.category}
                                    onChange={handleMenuInputChange}
                                    required
                                >
                                    <option value={0} hidden>
                                        Select Category
                                    </option>
                                    {categoryList.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Menu Name and Price */}
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Menu Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control txtStandard"
                                    placeholder="Enter menu name"
                                    value={formMenu.name}
                                    onChange={handleMenuInputChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control txtStandard"
                                    placeholder="Enter price"
                                    value={formMenu.price}
                                    onChange={handleMenuInputChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    className="form-control txtStandard"
                                    placeholder="Enter menu description"
                                    value={formMenu.description}
                                    onChange={handleMenuInputChange}
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Status:</label>
                                <select
                                    name="is_active"
                                    className="form-control txtStandard"
                                    value={String(formMenu.is_active)}
                                    onChange={handleMenuInputChange}
                                    required
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </>
                }
                onSave={handleSaveMenuConfirm}
                saveText={editingMenu ? "Update Menu" : "Add Menu"}
            />

            <CustomToast
                show={showToast}
                message={toastText}
                type={toasStatus}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}