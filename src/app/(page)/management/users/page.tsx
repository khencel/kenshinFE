"use client";

import { useEffect, useState } from "react";
import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus,
    FaCommentDollar 
} from "react-icons/fa";
import Link from "next/link";

import CustomModal from "../../../../../components/Modal";
import CustomToast from "../../../../../components/Toas";
import Pagination from "../../../../../components/Pagination";

import { User } from "../../../../../types/user";
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/api/users";
import { showConfirmSwal } from "../../../../../components/CustomSwal";


export default function UsersPage() {

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")

    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [search, setSearch] = useState("");

    // create user 

    const showAddModal = () => {
        setForm({
            first_name: "",
            last_name: "",
            gender: "",
            date_of_birth: "",
            email: "",
            is_active:false,
            is_admin:false
        });
        setEditingUser(null)
        setShowModal(true)
    }
    const [form, setForm] = useState({
        first_name: "",
        last_name:"",
        gender:"",
        date_of_birth:"",
        email:"",
        is_active:false,
        is_admin:false
    })

    const validateForm = () => {
        if (!form.email.trim()) {
            setToastText("Email is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }

        if (!form.first_name.trim()) {
            setToastText("First name is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }

        if (!form.last_name.trim()) {
            setToastText("Last name is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }

        if (!form.gender) {
            setToastText("Gender is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }

        if (!form.date_of_birth) {
            setToastText("Date of birth is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }

        return true;
    };

    const [saving, setSaving] = useState(false)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "is_active"
                ? value === "true"
                : value,
        }));
    };

    const handleSaveConfirm = async () => {

        if (!validateForm()) {
            return;
        }

        const isEditing = editingUser !== null;

        await showConfirmSwal({
            title: isEditing ? "Update User?" : "Save User?",

            text: isEditing
                ? "Are you sure you want to update this user?"
                : "Are you sure you want to create this user?",

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

        if (
            !form.email.trim() ||
            !form.first_name.trim() ||
            !form.last_name.trim() ||
            !form.gender ||
            !form.date_of_birth
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            setSaving(true);

            if(editingUser){
                await updateUser(editingUser.id, form);

                setToastText("User updated successfully.");
                setToastStatus("success");

            }else{
                await createUser(form);
                setToastText("User created successfully.");
                setToastStatus("success");
            }

            

            setShowModal(false);
            setShowToast(true);

            setForm({
                first_name: "",
                last_name: "",
                gender: "",
                date_of_birth: "",
                email: "",
                is_active: false,
                is_admin:false
            });

            await fetchUsers(page);

        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setSaving(false);
        }
    };
    // =================================

    // edit User 
    const handleEditUser = (user:User) => {
        setEditingUser(user)
       
        
        setForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender ?? "",
            date_of_birth: user.date_of_birth ?? "",
            is_active: user.is_active,
            is_admin: user.is_admin
        })

        setShowModal(true);
    }
    // ====================================


    // Delete User 
    const handleDelete = async (user: User) => {

        await showConfirmSwal({
            title: "Delete User?",
            text: `Are you sure you want to delete ${user.first_name} ${user.last_name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteUser(user.id);

                    setToastText("User deleted successfully.");
                    setToastStatus("success");
                    setShowToast(true);

                    await fetchUsers(page);

                } catch (error) {

                    console.error("Delete error:", error);

                    setToastText(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete user."
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

    const fetchUsers = async (pageNumber: number) => {

        try {

            setLoading(true);

            const data = await getUsers(
                pageNumber,
                pageSize,
                search
            );

            setUsers(data.results);
            setTotalUsers(data.count);

        } catch (error) {

            console.error(
                "Error fetching users:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        const timeout = setTimeout(() => {
            fetchUsers(page);
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
                        Users
                    </h1>

                    <p className="text-muted mb-0">
                        Manage your users and their permissions.
                    </p>
                </div>

                <button
                    className="btnSuccess"
                    onClick={showAddModal}
                >
                    <FaPlus />
                    Create User
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
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Admin</th>
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

                                ) : users.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            No users found.
                                        </td>
                                    </tr>

                                ) : (

                                    users.map((user, index) => (

                                        <tr key={user.id}>

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td className="text-capitalize">
                                                {user.first_name}
                                            </td>

                                            <td className="text-capitalize">
                                                {user.last_name}
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td className="text-capitalize">
                                                {user.is_admin? "Yes":"No"}
                                                
                                            </td>

                                            <td>
                                                <span className={`badge ${user.is_active?"bg-success":"bg-danger"}`}>
                                                    {user.is_active?"Active":"Inactive"}
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditUser(user)}
                                                    title="Edit User"
                                                >
                                                    <FaPencilAlt />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger me-2"
                                                    onClick={() => handleDelete(user)}
                                                    title="Delete User"
                                                >
                                                    <FaRegTrashAlt />
                                                </button>

                                                <Link href={`users/${user.id}`}>
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    
                                                    title="Payment User"
                                                    
                                                >
                                                    <FaCommentDollar />
                                                </button>
                                                </Link>
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
                title={editingUser ? "Edit User" : "Create User"}
                handleClose={() => setShowModal(false)}
                content={
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Email Address:</label>
                                <input type="email" 
                                    className="form-control txtStandard"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>First Name:</label>
                                <input type="text" 
                                    className="form-control txtStandard"
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Last Name:</label>
                                <input type="text" 
                                    className="form-control txtStandard"
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Is_admin:</label>
                                <select name="is_admin"
                                    className="form-control txtStandard"
                                    value={String(form.is_admin)}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" hidden>Select One</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>

                                </select>
                            </div>

                            <div className="col-md-6">
                                <label>Date of Birth:</label>
                                <input type="date" 
                                    className="form-control txtStandard"
                                    name="date_of_birth"
                                    value={form.date_of_birth}
                                    onChange={handleInputChange}
                                    required
                                />
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
                                    <option value="" hidden>Select Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </>
                    
                }
                onSave={handleSaveConfirm}
                saveText={editingUser ? "Update User" : "Add User"}
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