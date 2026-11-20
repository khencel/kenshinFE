
"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./MenuManagement.module.css";

interface MenuItem {
    id: number;
    name: string;
    category: string;
    emoji: string;
    sizes: {
        name: string;
        price: number;
        stock: boolean;
    }[];
    addons: string[];
    hidden: boolean;
}

const categories = [
    "Ramen",
    "Sushi",
    "Sashimi",
    "Donburi",
    "Side Dishes",
];

const sampleItems: MenuItem[] = [
    // =========================
    // RAMEN
    // =========================
    {
        id: 1,
        name: "Tonkotsu Ramen",
        category: "Ramen",
        emoji: "🍜",
        sizes: [
            { name: "Regular", price: 380, stock: true },
            { name: "Large", price: 450, stock: true },
        ],
        addons: ["Extra Egg", "Chashu", "Nori"],
        hidden: false,
    },
    {
        id: 2,
        name: "Miso Ramen",
        category: "Ramen",
        emoji: "🍜",
        sizes: [
            { name: "Regular", price: 360, stock: true },
            { name: "Large", price: 430, stock: true },
        ],
        addons: ["Extra Egg", "Corn", "Nori"],
        hidden: false,
    },
    {
        id: 3,
        name: "Spicy Tantanmen",
        category: "Ramen",
        emoji: "🌶️",
        sizes: [
            { name: "Regular", price: 390, stock: true },
            { name: "Large", price: 460, stock: true },
        ],
        addons: ["Extra Egg", "Chashu", "Extra Spicy"],
        hidden: false,
    },

    // =========================
    // SUSHI
    // =========================
    {
        id: 4,
        name: "Salmon Sushi",
        category: "Sushi",
        emoji: "🍣",
        sizes: [
            { name: "2 pcs", price: 180, stock: true },
            { name: "4 pcs", price: 340, stock: true },
        ],
        addons: ["Wasabi", "Extra Ginger"],
        hidden: false,
    },
    {
        id: 5,
        name: "Tuna Sushi",
        category: "Sushi",
        emoji: "🍣",
        sizes: [
            { name: "2 pcs", price: 200, stock: true },
            { name: "4 pcs", price: 380, stock: true },
        ],
        addons: ["Wasabi", "Extra Ginger"],
        hidden: false,
    },
    {
        id: 6,
        name: "California Maki",
        category: "Sushi",
        emoji: "🍱",
        sizes: [
            { name: "6 pcs", price: 250, stock: true },
            { name: "12 pcs", price: 460, stock: true },
        ],
        addons: ["Wasabi", "Soy Sauce"],
        hidden: false,
    },

    // =========================
    // SASHIMI
    // =========================
    {
        id: 7,
        name: "Salmon Sashimi",
        category: "Sashimi",
        emoji: "🐟",
        sizes: [
            { name: "6 pcs", price: 320, stock: true },
            { name: "12 pcs", price: 600, stock: true },
        ],
        addons: ["Wasabi", "Soy Sauce"],
        hidden: false,
    },
    {
        id: 8,
        name: "Tuna Sashimi",
        category: "Sashimi",
        emoji: "🐟",
        sizes: [
            { name: "6 pcs", price: 350, stock: true },
            { name: "12 pcs", price: 650, stock: true },
        ],
        addons: ["Wasabi", "Soy Sauce"],
        hidden: false,
    },

    // =========================
    // DONBURI
    // =========================
    {
        id: 9,
        name: "Chicken Teriyaki Don",
        category: "Donburi",
        emoji: "🍛",
        sizes: [
            { name: "Regular", price: 280, stock: true },
            { name: "Large", price: 350, stock: true },
        ],
        addons: ["Extra Rice", "Miso Soup"],
        hidden: false,
    },
    {
        id: 10,
        name: "Gyudon",
        category: "Donburi",
        emoji: "🍚",
        sizes: [
            { name: "Regular", price: 320, stock: true },
            { name: "Large", price: 390, stock: true },
        ],
        addons: ["Extra Egg", "Extra Rice"],
        hidden: false,
    },
    {
        id: 11,
        name: "Katsu Curry Rice",
        category: "Donburi",
        emoji: "🍛",
        sizes: [
            { name: "Regular", price: 350, stock: true },
            { name: "Large", price: 420, stock: true },
        ],
        addons: ["Extra Rice", "Extra Katsu"],
        hidden: false,
    },

    // =========================
    // SIDE DISHES
    // =========================
    {
        id: 12,
        name: "Gyoza",
        category: "Side Dishes",
        emoji: "🥟",
        sizes: [
            { name: "5 pcs", price: 150, stock: true },
            { name: "10 pcs", price: 280, stock: true },
        ],
        addons: [],
        hidden: false,
    },
    {
        id: 13,
        name: "Edamame",
        category: "Side Dishes",
        emoji: "🫛",
        sizes: [
            { name: "Regular", price: 120, stock: true },
        ],
        addons: [],
        hidden: false,
    },
];

export default function MenuManagementPage() {
    const [items, setItems] = useState(sampleItems);
    const [categoryList, setCategoryList] = useState(categories);
    const [selectedCategory, setSelectedCategory] = useState("Ramen");
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Menu");

    const fileRef = useRef<HTMLInputElement>(null);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory =
                item.category === selectedCategory;

            const matchesSearch =
                item.name.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [items, selectedCategory, search]);

    const formatPrice = (price: number) =>
        `₱${price.toFixed(2)}`;

    const handleAddCategory = () => {
        const name = window.prompt("Enter category name:");

        if (
            name?.trim() &&
            !categoryList.includes(name.trim())
        ) {
            setCategoryList((prev) => [...prev, name.trim()]);
        }
    };

    const handleAddItem = () => {
        const name = window.prompt("Enter item name:");

        if (!name?.trim()) return;

        const newItem: MenuItem = {
            id: Date.now(),
            name: name.trim(),
            category: selectedCategory,
            emoji: "🍽️",
            sizes: [
                { name: "Regular", price: 100, stock: true },
            ],
            addons: [],
            hidden: false,
        };

        setItems((prev) => [...prev, newItem]);
    };

    const handleEditItem = (item: MenuItem) => {
        const name = window.prompt("Edit item name:", item.name);

        if (!name?.trim()) return;

        setItems((prev) =>
            prev.map((current) =>
                current.id === item.id
                    ? { ...current, name: name.trim() }
                    : current
            )
        );
    };

    const handleHideItem = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, hidden: !item.hidden }
                    : item
            )
        );
    };

    const handleExportCSV = () => {
        const headers = ["Name", "Category", "Size", "Price", "Uses Stock"];

        const rows = items.flatMap((item) =>
            item.sizes.map((size) =>
                [
                    item.name,
                    item.category,
                    size.name,
                    size.price,
                    size.stock ? "Yes" : "No",
                ].join(",")
            )
        );

        const csv = [headers.join(","), ...rows].join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "menu-items.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleImportCSV = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const lines = String(reader.result).split(/\r?\n/);

            const grouped = new Map<string, MenuItem>();

            lines.slice(1).filter(Boolean).forEach((line) => {
                const [name, category, size, price, stock] =
                    line.split(",");

                if (!name || !category || !size || !price) return;

                const key = `${name}-${category}`;

                if (!grouped.has(key)) {
                    grouped.set(key, {
                        id: Date.now() + grouped.size,
                        name,
                        category,
                        emoji: "🍽️",
                        sizes: [],
                        addons: [],
                        hidden: false,
                    });
                }

                grouped.get(key)!.sizes.push({
                    name: size,
                    price: Number(price),
                    stock: stock === "Yes",
                });
            });

            const importedItems = Array.from(grouped.values());

            setItems((prev) => [...prev, ...importedItems]);

            setCategoryList((prev) =>
                Array.from(new Set([
                    ...prev,
                    ...importedItems.map((item) => item.category),
                ]))
            );

            event.target.value = "";
        };

        reader.readAsText(file);
    };

    return (
        <div className={styles.menuPage}>

            {/* HEADER */}
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                    <h2 className={styles.pageTitle}>Items</h2>
                    <p className={styles.pageDescription}>
                        Changes show on the Sales screen the next time it loads.
                        Past receipts keep the names and prices they were sold at.
                    </p>
                </div>

                <div className={styles.tabs}>
                    {["Menu", "Add-ons"].map((tab) => (
                        <button
                            key={tab}
                            className={
                                activeTab === tab
                                    ? styles.activeTab
                                    : ""
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
                            {categoryList.map((category) => {
                                const count = items.filter(
                                    (item) => item.category === category
                                ).length;

                                return (
                                    <div
                                        key={category}
                                        className={`${styles.categoryItem} ${
                                            selectedCategory === category
                                                ? styles.selectedCategory
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                    >
                                        <div>
                                            <div className={styles.categoryName}>
                                                {category}
                                            </div>
                                            <small className={styles.itemCount}>
                                                {count} items
                                            </small>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                className={styles.categoryIcon}
                                                title="Move up"
                                            >
                                                <i className="bi bi-chevron-up" />
                                            </button>

                                            <button
                                                className={styles.categoryIcon}
                                                title="Move down"
                                            >
                                                <i className="bi bi-chevron-down" />
                                            </button>

                                            <button
                                                className={styles.categoryIcon}
                                                title="Edit category"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    const name = window.prompt(
                                                        "Edit category:",
                                                        category
                                                    );

                                                    if (!name?.trim()) return;

                                                    const newName = name.trim();

                                                    if (
                                                        categoryList.includes(newName) &&
                                                        newName !== category
                                                    ) return;

                                                    setCategoryList((prev) =>
                                                        prev.map((c) =>
                                                            c === category
                                                                ? newName
                                                                : c
                                                        )
                                                    );

                                                    setItems((prev) =>
                                                        prev.map((item) =>
                                                            item.category === category
                                                                ? { ...item, category: newName }
                                                                : item
                                                        )
                                                    );

                                                    if (selectedCategory === category) {
                                                        setSelectedCategory(newName);
                                                    }
                                                }}
                                            >
                                                <i className="bi bi-pencil" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
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
                            {/* <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={handleExportCSV}
                            >
                                <i className="bi bi-download me-1" />
                                Export CSV
                            </button>

                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => fileRef.current?.click()}
                            >
                                <i className="bi bi-upload me-1" />
                                Import CSV
                            </button> */}

                            <input
                                ref={fileRef}
                                type="file"
                                accept=".csv"
                                hidden
                                onChange={handleImportCSV}
                            />

                            <button
                                className={styles.addButton}
                                onClick={handleAddItem}
                            >
                                <i className="bi bi-plus-lg me-1" />
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
                                        <div className={styles.productImage}>
                                            <span>{item.emoji}</span>

                                            {item.hidden && (
                                                <div className={styles.hiddenOverlay}>
                                                    Hidden
                                                </div>
                                            )}
                                        </div>

                                        {/* DETAILS */}
                                        <div className={styles.productDetails}>
                                            <h6>{item.name}</h6>

                                            <div className="d-flex flex-column gap-2">
                                                {item.sizes.map((size) => (
                                                    <div
                                                        key={size.name}
                                                        className={styles.priceRow}
                                                    >
                                                        <span>{size.name}</span>

                                                        <small>
                                                            {size.stock
                                                                ? "Uses stock"
                                                                : "No stock"}
                                                        </small>

                                                        <strong>
                                                            {formatPrice(size.price)}
                                                        </strong>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.productAddons}>
                                                {item.addons.length
                                                    ? `+ ${item.addons.join(", ")}`
                                                    : "No add-ons"}
                                            </div>
                                        </div>

                                        {/* FOOTER */}
                                        <div className={styles.productFooter}>
                                            <div className="d-flex gap-3">
                                                <button title="Previous">
                                                    <i className="bi bi-chevron-left" />
                                                </button>

                                                <button title="Next">
                                                    <i className="bi bi-chevron-right" />
                                                </button>
                                            </div>

                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleHideItem(item.id)}
                                                >
                                                    {item.hidden ? "Show" : "Hide"}
                                                </button>

                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleEditItem(item)}
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
                                            There are no items in this category.
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
                                {activeTab} management will be implemented here.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
