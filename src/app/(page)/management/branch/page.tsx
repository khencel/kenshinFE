"use client";

import { useEffect, useState } from "react";
import styles from "../menu/MenuManagement.module.css";
import EditBranch from "./EditBranch";
import BranchFields, {toFormData } from "./BranchFields";
import { BranchForm } from "../../../../../types/kenshin/branch";
import { createRecord, deleteRecord, getData, updateRecord } from "@/lib/api/apiEndpoint";
import CustomToast from "../../../../../components/Toas";
import Loading from "../../../../../components/Loading";
import { showConfirmSwal } from "../../../../../components/CustomSwal";

type Branch = BranchForm & { id: number };

const blank = { image: null, image_url: null };

export default function MenuManagementPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const [form, setForm] = useState<BranchForm | null>(null);
    const [saving, setSaving] = useState(false);

    const selectedIndex = branches.findIndex((b) => b.id === selectedId);
    const selectedBranch = selectedIndex >= 0 ? branches[selectedIndex] : null;


    // Toater 
    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await getData<Branch>("branches");
            console.log("BRANCH DATA:", res.results);
            setBranches(res.results);

            if (res.results.length > 0) {
                setSelectedId(res.results[0].id);
            } else {
                setSelectedId(null);
            }

        } catch (error) {
            console.error("Failed to fetch branches:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    // i-load ang form tuwing nagpapalit ng branch
    useEffect(() => {
        if (selectedId === null) {
            setForm(null);
            return;
        }

        const selected = branches.find(
            (branch) => branch.id === selectedId
        );

        if (selected) {
            setForm({
                name: selected.name,
                address: selected.address,
                map_link: selected.map_link,
                is_active: selected.is_active,
                image: null,
                image_url:
                    selected.image_url ||
                    (typeof selected.image === "string" ? selected.image : null),
            });
        }
    }, [selectedId, branches]);

    const isDirty =
        !!selectedBranch &&
        !!form &&
        (form.name !== selectedBranch.name ||
            form.address !== selectedBranch.address ||
            form.map_link !== selectedBranch.map_link ||
            form.is_active !== selectedBranch.is_active ||
            form.image !== null);

    const handleChange = (patch: Partial<BranchForm>) =>
        setForm((prev) => (prev ? { ...prev, ...patch } : prev));

    // CREATE (modal)

    const handleCreate = async (values: BranchForm) => {
        await showConfirmSwal({
            title: "Create Branch?",
            text: "Are you sure you want to create this Branch?",
            confirmButtonText: "Yes, Save",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                create(values)
            },
        });
    }
    const create = async (values: BranchForm) => {
        try {
            setSaving(true);

            const payload = toFormData(values);

            const res = await createRecord<Branch, FormData>(
                "branches",
                payload
            );

            // Use the actual response from Django
            setBranches((prev) => [...prev, res]);
            setSelectedId(res.id);
            setShowAddModal(false);

        } catch (error) {
            console.error("Failed to create branch:", error);
        } finally {
            setToastText("Branch created successfully.");
            setToastStatus("success");
            setShowToast(true)
            setSaving(false);
        }
    };



    const handleUpdate = async () => {
        if (!form) return;

        await showConfirmSwal({
            title: "Update Add-ons?",
            text: "Are you sure you want to update this Add-ons?",
            confirmButtonText: "Yes, Update",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                updateBranch()
            },
        });

        console.log("After Swal closed");
    };

    // UPDATE (inline form)
    const updateBranch = async () => {
        if (!form || selectedId === null) return;
        if (!form.name.trim() || !form.address.trim()) return;

        setSaving(true);

        try {
            const payload = toFormData(form);

            const res = await updateRecord<FormData, Branch>(
                "branches",
                selectedId,
                payload
            );

            setBranches((prev) =>
                prev.map((branch) =>
                    branch.id === selectedId ? res : branch
                )
            );

        
            setForm({
                name: res.name,
                address: res.address,
                map_link: res.map_link,
                is_active: res.is_active,
                image: null,
                image_url:
                    res.image_url ||
                    (typeof res.image === "string" ? res.image : null),
            });

            setToastText("Branch updated successfully.");
            setToastStatus("success");
            setShowToast(true);
        } catch (error) {
            console.error("Failed to update branch:", error);
        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async () => {
        await showConfirmSwal({
            title: "Delete Branch?",
            text: "Are you sure you want to delete this Branch?",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                deleteData()
            },
        });
    }

    const deleteData = async() => {
        if (!selectedBranch) return;
      
        await deleteRecord(
            "branches",
            selectedBranch.id,
        )
        const remaining = branches.filter((b) => b.id !== selectedBranch.id);
        setBranches(remaining);
        setSelectedId(remaining[0]?.id ?? null);
        setToastText("Branch deleted successfully.");
        setToastStatus("success");
        setShowToast(true);
    };

    const goPrev = () =>
        selectedIndex > 0 && setSelectedId(branches[selectedIndex - 1].id);

    const goNext = () =>
        selectedIndex < branches.length - 1 &&
        setSelectedId(branches[selectedIndex + 1].id);

    const moveBranch = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= branches.length) return;
        setBranches((prev) => {
            const next = [...prev];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    return (
        <div className={styles.menuPage}>
            {/* HEADER */}
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                    <h2 className={styles.pageTitle}>Branch</h2>
                    <p className={styles.pageDescription}>
                        Manage your store branches, locations, and availability across your business.
                    </p>
                </div>
            </div>

            <div className="row g-4">
                {/* BRANCH SIDEBAR */}
                <div className="col-lg-3 mt-0">
                    <div className={styles.categoryPanel}>
                        <div className={styles.categoryHeader}>
                            <strong>Branch</strong>

                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setShowAddModal(true)}
                            >
                                Add branch
                            </button>
                        </div>

                        <div className="p-2">
                            {branches.map((branch, index) => (
                                <div
                                    key={branch.id}
                                    className={`${styles.categoryItem} ${
                                        selectedId === branch.id ? styles.selectedCategory : ""
                                    }`}
                                    onClick={() => setSelectedId(branch.id)}
                                >
                                    <div>
                                        <div className={styles.categoryName}>{branch.name}</div>
                                        <small className={styles.itemCount}>
                                            {branch.is_active ? "ACTIVE" : "INACTIVE"}
                                        </small>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button
                                            className={styles.categoryIcon}
                                            title="Move up"
                                            disabled={index === 0}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveBranch(index, -1);
                                            }}
                                        >
                                            <i className="bi bi-chevron-up" />
                                        </button>

                                        <button
                                            className={styles.categoryIcon}
                                            title="Move down"
                                            disabled={index === branches.length - 1}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveBranch(index, 1);
                                            }}
                                        >
                                            <i className="bi bi-chevron-down" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BRANCH CONTENT (EDIT FORM) */}
                <div className="col-lg-9 p-0 mt-0">
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.productCard}>
                                {form ? (
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdate();
                                    }}>
                                        <div className="p-3">
                                            <BranchFields form={form} onChange={handleChange} />
                                        </div>

                                        {/* FOOTER */}
                                        <div className={styles.productFooter}>
                                            <div className="d-flex gap-3">
                                                <button
                                                    type="button"
                                                    title="Previous"
                                                    onClick={goPrev}
                                                    disabled={selectedIndex <= 0}
                                                >
                                                    <i className="bi bi-chevron-left" />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Next"
                                                    onClick={goNext}
                                                    disabled={selectedIndex >= branches.length - 1}
                                                >
                                                    <i className="bi bi-chevron-right" />
                                                </button>
                                            </div>

                                            <div className="d-flex gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm text-danger"
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="btn btn-dark btn-sm"
                                                    disabled={!isDirty || saving}
                                                >
                                                    {saving ? "Saving..." : "Update Branch"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <p className="text-muted p-3 mb-0">No branch selected.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD BRANCH MODAL */}
            <EditBranch
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleCreate}
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
        </div>
    );
}