"use client";

import { useEffect, useState } from "react";
import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus, 
    FaPumpSoap,
    FaPills,
    FaBlender,
    FaUtensils,
    FaLayerGroup
} from "react-icons/fa";
import CustomModal from "../../../../../components/Modal";
import CustomToast from "../../../../../components/Toas";
import Pagination from "../../../../../components/Pagination";

import { createRecord, getData, updateRecord, deleteRecord } from "@/lib/api/apiEndpoint";
import { showConfirmSwal } from "../../../../../components/CustomSwal";
import Loading from "../../../../../components/Loading";
import { AddOns, CreateAddons } from "../../../../../types/addons";
import { Category } from "@/constants/data";
import { FaShirt } from "react-icons/fa6";

export default function UsersPage() {

    let title = "Voucher"

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [data, setData] = useState<AddOns[]>([]);
    const [loading, setLoading] = useState(true);

    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")

    const [editingRecord, setEditingRecord] = useState<AddOns | null>(null)
    const [search, setSearch] = useState("");
    const categories = Category();
    const iconMap = {
        FaPumpSoap,
        FaPills,
        FaShirt,
        FaBlender,
        FaUtensils,
        FaLayerGroup
    };
    // create data

    const showAddModal = () => {
        setEditingRecord(null)
        setForm(initialForm)
        setShowModal(true)
    }

    const initialForm = {
        name: "",
        price: "",
        category: "",
        is_active: true
    };
    
    const [form, setForm] = useState(initialForm)

    const validateForm = () => {
        const requiredFields = [
            ["name", form.name, "Add-ons Name"],
            ["price", form.price, "Price"],
            ["category", form.category, "Category"]
        ];

        for (const [, value, label] of requiredFields) {
            if (typeof value === "string" ? !value.trim() : !value) {
                setToastText(`${label} is required.`);
                setToastStatus("error");
                setShowToast(true);
                return false;
            }
        }

        

        return true;
    };

    const [saving, setSaving] = useState(false)

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name.includes(".")) {
                const [parent, child] = name.split(".");

                return {
                    ...prev,
                    [parent]: {
                        ...((prev[parent as keyof typeof prev] as unknown as Record<string, any>) ?? {}),
                        [child]: value,
                    },
                };
            }

            return {
                ...prev,
                [name]: name === "is_active"
                    ? value === "true"
                    : value,
            };
        });
    };

    const handleSaveConfirm = async () => {
        if (!validateForm()) {
            return;
        }
        
        const isEditing = editingRecord !== null;

        await showConfirmSwal({
            title: isEditing ? "Update Add-ons?" : "Save Add-ons?",

            text: isEditing
                ? "Are you sure you want to update this Add-ons?"
                : "Are you sure you want to create this Add-ons?",

            confirmButtonText: isEditing
                ? "Yes, Update"
                : "Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                await handleSave();
            },
        });
    };

    const handleSave = async () => {

        try {
            setSaving(true);

            if(editingRecord){
                await updateRecord("addons", editingRecord.id, form);

                setToastText("Add-ons updated successfully.");
                setToastStatus("success");

            }else{
                await createRecord<AddOns, CreateAddons>("addons", {
                    name: form.name,
                    price: Number(form.price),
                    category: Number(form.category),
                    is_active: form.is_active,
                });
                setToastText("Add-ons created successfully.");
                setToastStatus("success");
            }

            

            setShowModal(false);
            setShowToast(true);

            await fetchRecord(page);

        } catch (error) {
            console.error("Error creating membership:", error);
        } finally {
            setSaving(false);
        }
    };
    // =================================

    // edit Member 
    const handleEditRecord = (data:AddOns) => {
        setEditingRecord(data)
       
        
        setForm({
            name: data.name,
            price: data.price.toString(),
            category: data.category.toString(),
            is_active: data.is_active
        })

        setShowModal(true);
    }
    // ====================================


    // Delete data 
    const handleDelete = async (data: AddOns) => {

        await showConfirmSwal({
            title: "Delete Add-ons?",
            text: `Are you sure you want to delete ${data.name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord("addons", data.id);

                    setToastText("Add-ons deleted successfully.");
                    setToastStatus("success");
                    setShowToast(true);

                    await fetchRecord(page);

                } catch (error) {

                    console.error("Delete error:", error);

                    setToastText(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete data."
                    );

                    setToastStatus("error");
                    setShowToast(true);
                }
            },
        });
    };
    // ====================================

    // Pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPage(1);
    };

    const fetchRecord = async (pageNumber: number) => {

        try {

            setLoading(true);

            const data = await getData<AddOns>(
                "addons",
                pageNumber,
                pageSize,
                search
            );

            setData(data.results);
            setTotalUsers(data.count);

        } catch (error) {

            console.error(
                "Error fetching records:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        const timeout = setTimeout(() => {
            fetchRecord(page);
        }, 400);

        return () => clearTimeout(timeout);

    }, [page, pageSize, search]);

    const totalPages = Math.ceil(
        totalUsers / pageSize
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h1 className="h3 mb-1">
                        {title} Management
                    </h1>

                    <p className="text-muted mb-0">
                        Create, manage, and track voucher codes, expiration dates, and usage.
                    </p>
                </div>

                <button
                    className="btnSuccess"
                    onClick={showAddModal}
                >
                    <FaPlus />
                    Create {title}
                </button>

            </div>


            <div className="card border-0 shadow-sm">

                <div className="card-body">
                    <div className="row justify-content-end">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control txtStandard"
                                placeholder="Search name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="table-responsive">

                        <table className="table table-hover mb-0">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Issued to</th>
                                    <th>Code</th>
                                    <th>Less</th>
                                    <th>Status</th>
                                    <th>Expiration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody style={{fontSize:"14px"}}>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            Loading users...
                                        </td>
                                    </tr>

                                ) : data.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            No users found.
                                        </td>
                                    </tr>

                                ) : (

                                    data.map((item, index) => (

                                        <tr key={item.id}>

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td className="text-capitalize">
                                                {item.name}
                                            </td>

                                            <td className="text-capitalize">
                                                {item.price}
                                            </td>

                                            <td>
                                                {(() => {
                                                    const category = categories.find(
                                                        (cat) => cat.id === Number(item.category)
                                                    );

                                                    if (!category) return "Unknown";

                                                    const Icon = iconMap[category.icon as keyof typeof iconMap];

                                                    return (
                                                        <span className="d-inline-flex align-items-center gap-2">
                                                            {Icon && <Icon size={18} />}
                                                            {category.name}
                                                        </span>
                                                    );
                                                })()}
                                            </td>


                                            <td>
                                                <span className={`badge ${item.is_active?"bg-success":"bg-danger"}`}>
                                                    {item.is_active?"Active":"Inactive"}
                                                </span>
                                            </td>
                                            <td>
                                                test
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditRecord(item)}
                                                    title="Edit Add-ons"
                                                >
                                                    <FaPencilAlt />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger me-2"
                                                    onClick={() => handleDelete(item)}
                                                    title="Delete Add-ons"
                                                >
                                                    <FaRegTrashAlt />
                                                </button>

                                               
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}

                    <div className="d-flex justify-content-between align-items-center mt-4">

                        <div className="d-flex align-items-center gap-2 text-muted small">

                            <span>Show</span>

                            <select
                                className="form-select form-select-sm"
                                style={{ width: "80px" }}
                                value={pageSize}
                                onChange={(e) =>
                                    handlePageSizeChange(Number(e.target.value))
                                }
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>

                            <span>entries</span>

                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                    </div>
                </div>
            </div>


            <CustomModal
                show={showModal}
                title={editingRecord ? "Edit Membership" : "Create Add-ons"}
                handleClose={() => setShowModal(false)}
                size="lg"
                content={
                    <>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">Add-ons Name: <span className="text-danger">*</span> </label>
                                <input
                                    type="text" 
                                    className="form-control txtStandard"
                                    name="name"
                                    placeholder="Ex. Towel, Protein Shake etc."
                                    value={form.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Price: <span className="text-danger">*</span> </label>
                                <input
                                    type="number" 
                                    className="form-control txtStandard"
                                    name="price"
                                    placeholder="Ex. 100, 200, 500"
                                    value={form.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Category: <span className="text-danger">*</span> </label>
                                <select 
                                    name="category" 
                                    className="form-control txtStandard"
                                    value={form.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="" hidden>Select Category</option>
                                    {
                                        categories.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                       
                        <div className="row">
                            <div className="col-md-4 mt-3">
                                <label className="form-label">Status: </label>
                                <select
                                    className="form-select"
                                    name="is_active"
                                    value={form.is_active.toString()}
                                    onChange={handleInputChange}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </> 
                }
                onSave={handleSaveConfirm}
                saveText={editingRecord ? "Update Add-ons" : "Add Add-ons"}
            />


            <CustomToast
                show={showToast}
                message={toastText}
                type={toasStatus}
                onClose={() => setShowToast(false)}
            />
            <Loading
                loading={loading}
            />
        </>
    );
}