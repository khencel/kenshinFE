"use client";

import { useEffect, useState,useRef } from "react";
import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus,
    FaCommentDollar,
    FaCamera, 
    FaUserCircle 
} from "react-icons/fa";
import Link from "next/link";

import CustomModal from "../../../../../components/Modal";
import CustomToast from "../../../../../components/Toas";
import Pagination from "../../../../../components/Pagination";

import { User } from "../../../../../types/user";
import { createRecord, getData, updateRecord, patchRecord, deleteRecord } from "@/lib/api/apiEndpoint";
import { showConfirmSwal } from "../../../../../components/CustomSwal";
import { Member, CreateMemberData } from "../../../../../types/members";
import Loading from "../../../../../components/Loading";
import { compressImage } from "@/services/imageFormat";


export default function UsersPage() {

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [data, setData] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")

    const [editingMember, setEditingMember] = useState<Member | null>(null)
    const [search, setSearch] = useState("");

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleRemoveAvatar = () => {
        if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        setAvatarFile(null);
        setAvatarPreview(null);

        // para puwede ulit piliin ang parehong file
        if (avatarInputRef.current) {
            avatarInputRef.current.value = "";
        }
    };

    // create member

    const showAddModal = () => {
        setEditingMember(null)
        setForm(initialForm)
        setShowModal(true)
        setAvatarFile(null);
        setAvatarPreview(null);
        handleRemoveAvatar();
    }

    const initialForm = {
        personal_info: {
            first_name: "",
            last_name: "",
            date_of_birth: "",
            gender: "",
            contact_number: "",
            email: "",
            address: ""
        },

        emergency_contact: {
            contact_person: "",
            relationship: "",
            contact_number: "",
            address: ""
        },

        additional_info: {
            medical_note: "",
            special_note: ""
        },
        is_active: true
    };
    
    const [form, setForm] = useState(initialForm)

    const validateForm = () => {
        const requiredFields = [
            ["first_name", form.personal_info.first_name, "First Name"],
            ["last_name", form.personal_info.last_name, "Last Name"],
            ["date_of_birth", form.personal_info.date_of_birth, "Date of birth"],
            ["gender", form.personal_info.gender, "Gender"],
            ["contact_number", form.personal_info.contact_number, "Contact number"],
            ["email", form.personal_info.email, "Email address"],
            ["contact_person", form.emergency_contact.contact_person, "Contact Person"],
            ["relationship", form.emergency_contact.relationship, "Relationship"],
            ["person_contact_number", form.emergency_contact.contact_number, "Contact Person Number"]
        ];

        // Required fields
        for (const [, value, label] of requiredFields) {
            if (!value.trim()) {
                setToastText(`${label} is required.`);
                setToastStatus("error");
                setShowToast(true);
                return false;
            }
        }

        // Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.personal_info.email)) {
            setToastText("Please enter a valid email address.");
            setToastStatus("error");
            setShowToast(true);
            return false;
        }

        // Contact number - exactly 11 digits
        const contactNumber = form.personal_info.contact_number.trim();

        if (!/^\d{11}$/.test(contactNumber)) {
            setToastText("Contact number must be exactly 11 digits.");
            setToastStatus("error");
            setShowToast(true);
            return false;
        }

        // Date of birth - must not be current year or later
        const birthDate = new Date(form.personal_info.date_of_birth);
        const currentYear = new Date().getFullYear();

        if (birthDate.getFullYear() >= currentYear) {
            setToastText("Date of birth must be before the current year.");
            setToastStatus("error");
            setShowToast(true);
            return false;
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
                        ...(prev[parent as keyof typeof prev] as Record<string, any>),
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
        console.log(form);
        
        const isEditing = editingMember !== null;

        await showConfirmSwal({
            title: isEditing ? "Update Member?" : "Save Member?",

            text: isEditing
                ? "Are you sure you want to update this Member?"
                : "Are you sure you want to create this Member?",

            confirmButtonText: isEditing
                ? "Yes, Update"
                : "Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                setShowModal(false);
                await handleSave();
            },
        });
    };


    const handleSave = async () => {
        setLoading(true)
        try {
            setSaving(true);

            let memberId: number;

            // Step 1: i-save ang mga fields bilang JSON (gaya ng dati)
            if (editingMember) {
                await updateRecord("members", editingMember.id, form);
                memberId = editingMember.id;
            } else {
                const created = await createRecord<Member, CreateMemberData>("members", {
                    ...form
                });
                memberId = created.id;
            }

            // Step 2: i-upload ang picture kung may napili
            if (avatarFile) {
                const fd = new FormData();
                fd.append("profile_picture", avatarFile);
                await patchRecord("members", memberId, fd);
            }

            setToastText(
                editingMember
                    ? "Member updated successfully."
                    : "Member created successfully."
            );
            setToastStatus("success");
            
            setShowToast(true);

            await fetchUsers(page);

        } catch (error) {
            console.error("Error saving member:", error);

            setToastText(
                error instanceof Error ? error.message : "Failed to save member."
            );
            setToastStatus("error");
            setShowToast(true);
        } finally {
            setSaving(false);
            setLoading(false)
        }
    };
    // =================================

    // edit Member 
    const handleEditMember = (member:Member) => {
        setEditingMember(member)
        setAvatarFile(null);
        setAvatarPreview(member.profile_picture || null);
        
        setForm({
            personal_info: {
                first_name: member.personal_info.first_name,
                last_name: member.personal_info.last_name,
                date_of_birth: member.personal_info.date_of_birth,
                gender: member.personal_info.gender,
                contact_number: member.personal_info.contact_number,
                email: member.personal_info.email,
                address: member.personal_info.address
            },
            emergency_contact: {
                contact_person: member.emergency_contact.contact_person,
                relationship: member.emergency_contact.relationship,
                contact_number: member.emergency_contact.contact_number,
                address: member.emergency_contact.address
            },
            additional_info: {
                medical_note: member.additional_info.medical_note,
                special_note: member.additional_info.special_note
            },
            is_active: member.is_active
        })

        setShowModal(true);
    }
    // ====================================


    // Delete Member 
    const handleDelete = async (member: Member) => {

        await showConfirmSwal({
            title: "Delete Member?",
            text: `Are you sure you want to delete ${member.personal_info.first_name} ${member.personal_info.last_name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord("members", member.id);

                    setToastText("Member deleted successfully.");
                    setToastStatus("success");
                    setShowToast(true);

                    await fetchUsers(page);

                } catch (error) {

                    console.error("Delete error:", error);

                    setToastText(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete member."
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

            const data = await getData<Member>(
                "members",
                pageNumber,
                pageSize,
                search
            );

            setData(data.results);
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


    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        let MAX_IMAGE_BYTES = 200 * 1024;
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setToastText("Please select an image file.");
            setToastStatus("error");
            setShowToast(true);
            return;
        }

        try {
            const finalFile = file.size > MAX_IMAGE_BYTES
                ? await compressImage(file)
                : file;

            if (avatarPreview) URL.revokeObjectURL(avatarPreview);

            setAvatarFile(finalFile);
            setAvatarPreview(URL.createObjectURL(finalFile));
        } catch (err) {
            setToastText(err instanceof Error ? err.message : "Failed to process image.");
            setToastStatus("error");
            setShowToast(true);
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
                        Members
                    </h1>

                    <p className="text-muted mb-0">
                        Manage your members, roles, and access permissions.
                    </p>
                </div>

                <button
                    className="btnSuccess"
                    onClick={showAddModal}
                >
                    <FaPlus />
                    Create Member
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
                                    <th style={{ width: 60 }}>Avatar</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    {/* <th>Admin</th> */}
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
                                            <td>
                                                <img
                                                    src={item.profile_picture || "/default-avatar.jpg"}
                                                    
                                                    
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "1px solid #dee2e6",
                                                    }}
                                                />
                                            </td>

                                            <td className="text-capitalize">
                                                {item.personal_info.first_name}
                                            </td>

                                            <td className="text-capitalize">
                                                {item.personal_info.last_name}
                                            </td>

                                            <td>
                                                {item.personal_info.email}
                                            </td>

                                            {/* <td className="text-capitalize">
                                                {item.is_admin? "Yes":"No"}
                                            </td> */}

                                            <td>
                                                <span className={`badge ${item.is_active?"bg-success":"bg-danger"}`}>
                                                    {item.is_active?"Active":"Inactive"}
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditMember(item)}
                                                    title="Edit Member"
                                                >
                                                    <FaPencilAlt />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger me-2"
                                                    onClick={() => handleDelete(item)}
                                                    title="Delete Member"
                                                >
                                                    <FaRegTrashAlt />
                                                </button>

                                                <Link href={`members/${item.id}`}>
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    title="Member Profile"
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
                title={editingMember ? "Edit User" : "Create Member"}
                handleClose={() => setShowModal(false)}
                size="xl"
                content={
                    <>
                        <div className="row">
                            <div className="col">
                                <strong>Personal Information</strong>
                            </div>
                        </div>
                        <hr />
                        <div className="row mb-3">
                            <div className="col-12 d-flex align-items-center gap-4">

                                {/* Avatar circle, clickable */}
                                <div
                                    onClick={() => avatarInputRef.current?.click()}
                                    title="Click to upload photo"
                                    style={{
                                        position: "relative",
                                        width: 110,
                                        height: 110,
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        border: avatarPreview ? "3px solid #0d6efd" : "2px dashed #adb5bd",
                                        background: "#f8f9fa",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        flexShrink: 0,
                                    }}
                                >
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar preview"
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <FaUserCircle size={80} color="#ced4da" />
                                    )}

                                    {/* Camera badge */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: "rgba(0,0,0,0.5)",
                                            color: "#fff",
                                            textAlign: "center",
                                            padding: "3px 0",
                                            fontSize: 12,
                                        }}
                                    >
                                        <FaCamera />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div>
                                    <label className="d-block mb-2 fw-semibold">Profile Picture</label>

                                    <input
                                        ref={avatarInputRef}
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        className="d-none"
                                        onChange={handleAvatarChange}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => avatarInputRef.current?.click()}
                                    >
                                        <FaCamera className="me-1" />
                                        {avatarPreview ? "Change Photo" : "Upload Photo"}
                                    </button>

                                    {avatarPreview && (
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={handleRemoveAvatar}
                                        >
                                            <FaRegTrashAlt className="me-1" />
                                            Remove
                                        </button>
                                    )}

                                    <div className="text-muted small mt-2">
                                        JPG, PNG or WEBP. Max 2MB.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label>First Name: <span className="text-danger"  >*</span> </label>
                                <input type="text"
                                    name="personal_info.first_name"
                                    className="form-control txtStandard text-capitalize"
                                    value={form.personal_info.first_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Last Name: <span className="text-danger"  >*</span></label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="personal_info.last_name"
                                    value={form.personal_info.last_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Date of Birth: <span className="text-danger"  >*</span></label>
                                <input type="date"
                                    className="form-control txtStandard"
                                    name="personal_info.date_of_birth"
                                    value={form.personal_info.date_of_birth}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Gender: <span className="text-danger"  >*</span></label>
                                <select
                                    className="form-control txtStandard"
                                    name="personal_info.gender"
                                    value={form.personal_info.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" hidden>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-3">
                                <label>Contact Number: <span className="text-danger"  >*</span></label>
                                <input type="text"
                                    className="form-control txtStandard"
                                    name="personal_info.contact_number"
                                    value={form.personal_info.contact_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Email Address:<span className="text-danger"  >*</span></label>
                                <input type="text"
                                    className="form-control txtStandard"
                                    name="personal_info.email"
                                    value={form.personal_info.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Address:</label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="personal_info.address"
                                    value={form.personal_info.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <strong>Emergency Contact</strong>
                                
                            </div>
                        </div>
                        <hr />
                        <div className="row ">
                            <div className="col-md-3">
                                <label>Contact Person: <span className="text-danger"  >*</span></label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="emergency_contact.contact_person"
                                    value={form.emergency_contact.contact_person}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Relationship: <span className="text-danger"  >*</span></label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="emergency_contact.relationship"
                                    value={form.emergency_contact.relationship}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Contact Number: <span className="text-danger"  >*</span></label>
                                <input type="text"
                                    className="form-control txtStandard"
                                    name="emergency_contact.contact_number"
                                    value={form.emergency_contact.contact_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Address:</label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="emergency_contact.address"
                                    value={form.emergency_contact.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <strong>Additional Information</strong>
                            </div>
                        </div>
                        <hr />
                        <div className="row ">
                            <div className="col-md-6">
                                <label>Medical Notes:</label>
                                <textarea 
                                    name="additional_info.special_note"
                                    className="form-control"
                                    rows={5}
                                    style={{
                                        fontSize:"14px"
                                    }}
                                    value={form.additional_info.special_note}
                                    onChange={handleInputChange}
                                >
                                </textarea>
                            </div>

                            <div className="col-md-6">
                                <label>Special Notes:</label>
                                <textarea 
                                    name="additional_info.medical_note"
                                    className="form-control"
                                    rows={5}
                                    style={{
                                        fontSize:"14px"
                                    }}
                                    value={form.additional_info.medical_note}
                                    onChange={handleInputChange}
                                >
                                </textarea>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label>Status:</label>
                                <select
                                    className="form-control txtStandard"
                                    name="is_active"
                                    value={form.is_active ? "true" : "false"}
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
                saveText={editingMember ? "Update Member" : "Add Member"}
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