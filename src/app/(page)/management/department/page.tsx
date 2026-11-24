"use client";

import { useEffect, useState } from "react";
import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus
} from "react-icons/fa";
import CustomModal from "../../../../../components/Modal";
import CustomToast from "../../../../../components/Toas";
import Pagination from "../../../../../components/Pagination";

import { createRecord, getData, updateRecord, deleteRecord } from "@/lib/api/apiEndpoint";
import { showConfirmSwal } from "../../../../../components/CustomSwal";
import Loading from "../../../../../components/Loading";
import { Department, DepartmentForm } from "../../../../../types/kenshin/department";


export default function Combination() {
    const titleName = "Department"
    const endpoint = "department"
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);

    // Toaster 
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")


    const [editingRecord, setEditingRecord] = useState<Department | null>(null)
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false)
    
    
    const initialForm = {
        first_num: "",
        second_num: "",
        description: "",
    };
    
    const [form, setForm] = useState(initialForm)


    const showAddModal = () => {
        setEditingRecord(null)
        setForm(initialForm)
        setShowModal(true)
    }

    const validateForm = () => {
        const requiredFields = [
            ["first_num", form.first_num, "First Number"],
            ["second_num", form.second_num, "Second Number"],
            ["description", form.description, "Description"]
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
            title: isEditing ? `Update ${titleName}?` : `Save ${titleName}?`,

            text: isEditing
                ? `Are you sure you want to update this ${titleName}?`
                : `Are you sure you want to create this ${titleName}?`,

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
                await updateRecord(endpoint, editingRecord.id, form);

                setToastText(`${titleName} updated successfully.`);
                setToastStatus("success");

            }else{
                // await createRecord<Department, DepartmentForm>(endpoint, {
                //     first_num: form.first_num,
                //     second_num: form.second_num,
                //     description: form.description,
                // });
                setToastText(`${titleName} created successfully.`);
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
    const handleEditRecord = (data:Department) => {
        setEditingRecord(data)
       
        
        // setForm({
        //     first_num: data.first_num,
        //     second_num: data.second_num,
        //     description: data.description
        // })

        setShowModal(true);
    }
    // ====================================


    // Delete data 
    const handleDelete = async (data: Department) => {

        await showConfirmSwal({
            title: `Delete ${titleName}?`,
            // text: `Are you sure you want to delete ${data.name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord(endpoint, data.id);

                    setToastText(`${titleName} deleted successfully.`);
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

            const data = await getData<Department>(
                endpoint,
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
                        Department Management
                    </h1>

                    <p className="text-muted mb-0">
                       Manage and organize company departments, including their descriptions and active status.
                    </p>
                </div>

                <button
                    className="btn btnSuccess"
                    onClick={showAddModal}
                >
                    <FaPlus />
                    Create {titleName}
                </button>

            </div>


            <div className="card border-0 shadow-sm">

                <div className="card-body">
                    {/* <div className="row justify-content-end">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control txtStandard"
                                placeholder="Search name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div> */}
                    
                    <div className="table-responsive">

                        <table className="table table-hover mb-0">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Department Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    
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
                                                {/* {item.first_num} */}
                                              
                                            </td>

                                            <td className="text-capitalize">
                                                {/* {item.second_num} */}
                                            </td>

                                            <td>
                                                {item.description?.length > 100
                                                    ? `${item.description.slice(0, 100)}...`
                                                    : item.description}
                                            </td>
                                            <td>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditRecord(item)}
                                                    title="Edit Combination"
                                                >
                                                    <FaPencilAlt />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger me-2"
                                                    onClick={() => handleDelete(item)}
                                                    title="Delete Combination"
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
                title={editingRecord ? "Edit Membership" : "Create Combination"}
                handleClose={() => setShowModal(false)}
                size="lg"
                content={
                    <>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">First Number: <span className="text-danger">*</span> </label>
                                <select 
                                    name="first_num"
                                    className="form-control txtStandard"
                                    value={form.first_num}
                                    onChange={handleInputChange}
                                >
                                    <option value="" hidden>First number</option>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Second Number: <span className="text-danger">*</span> </label>
                                <select 
                                    name="second_num"
                                    className="form-control txtStandard"
                                    value={form.second_num}
                                    onChange={handleInputChange}
                                >
                                    <option value="" hidden>Second number</option>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            
                        </div>
                                    
                        <div className="row">
                            <div className="col mt-3">
                                <label className="form-label">Description: </label>
                                <textarea value={form.description} onChange={handleInputChange} placeholder="Ex. Lorem ipsum dolor, sit amet consectetur adipisicing elit. " className="form-control" name="description" rows={5} id=""></textarea>
                            </div>
                        </div>
                    </> 
                }
                onSave={handleSaveConfirm}
                saveText={editingRecord ? "Update Add-ons" : "Add Combination"}
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