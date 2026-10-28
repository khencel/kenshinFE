import { useState, useEffect } from "react";
import CustomModal from "../../../../../../components/Modal";
import { Payment, PaymentProps, CreatePaymentData } from "../../../../../../types/payment";
import { showConfirmSwal } from "../../../../../../components/CustomSwal";
import CustomToast from "../../../../../../components/Toas";
import { createRecord, getData, updateRecord, deleteRecord } from "@/lib/api/apiEndpoint";
import { useParams } from "next/navigation";
import {
    FaPencilAlt,
    FaRegTrashAlt
} from "react-icons/fa";
import Loading from "../../../../../../components/Loading";
import Pagination from "../../../../../../components/Pagination";

export default function PaymentListPage(){

    const params = useParams();
    const userId = Number(params.id);
    const [showModal, setShowModal] = useState(false)
    const [editingPayment, setEditingPayment]= useState<Payment | null>(null)
    const [toastText, setToastText] = useState("")
    const [toastStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")
    const [showToast, setShowToast] = useState(false)
    const [payments, setPayments] = useState<Payment[]>([])
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({
        user:userId,
        ref_no:"",
        date_of_payment:"",
        amount:"",
        payment_method:""
    })

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

    const validateForm = () => {
        if(!form.ref_no.trim()){
            setToastText("Reference field is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }
        if(!form.date_of_payment.trim()){
            setToastText("Date of payment field is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }
        if(!form.amount.trim()){
            setToastText("Amount field is required.")
            setToastStatus("error")
            setShowToast(true)
            return false;
        }

        return true;
    }

    

    const handleSaveConfirm = async () => {

        if(!validateForm()){
            return;
        }

        const isEditing = editingPayment !== null;

        await showConfirmSwal({
            title: isEditing ? "Update Payment?" : "Save Payment?",
            text: isEditing
                ? "Are you sure you want to update this payment?"
                : "Are you sure you want to create this payment?",

            confirmButtonText: isEditing
                ? "Yes, Update"
                : "Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                await handleSave();
            },
        })
    }

    const handleSave = async () => {
        setLoading(true)
        try{
            if(editingPayment){
                await updateRecord<CreatePaymentData, Payment>("payments",editingPayment.id,form)
                setToastText("Payment updated successfully.");
                setToastStatus("success");
            }else{
                await createRecord<Payment, CreatePaymentData>("payments",form)
                setToastText("Payment created successfully.");
                setToastStatus("success");
                
            }
            setShowModal(false);
            setShowToast(true);
            clearForm()

        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setLoading(false)
        }
    }

    // Fetch Payment 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPage(1);
    };

    const fetchPayment = async (pageNumber: number) => {
        try {
        
            setLoading(true);

            const data = await getData <Payment>(
                "payments",
                pageNumber,
                pageSize,
                String(search)
            );

            setPayments(data.results);
            setTotalUsers(data.count);

        } catch (error) {

            console.error(
                "Error fetching users:",
                error
            );

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    
        const timeout = setTimeout(() => {
            fetchPayment(page);
        }, 400);

        return () => clearTimeout(timeout);

    }, [page, pageSize, search]);

    const totalPages = Math.ceil(
        totalUsers / pageSize
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    // ===================================

    const handleShowModal = async () => {
        setShowModal(true)
    }

    const handleEditPayment = async (payment:Payment) => {
        setEditingPayment(payment)
        setForm({
            user:userId,
            ref_no:payment.ref_no,
            date_of_payment:payment.date_of_payment,
            amount:String(payment.amount),
            payment_method:payment.payment_method ?? ""
        })
        setShowModal(true)
    }

    const handleDeletePayment = async (payment:Payment) => {
        await showConfirmSwal({
            title: "Delete Payment?",
            text: `Are you sure you want to delete ${payment.ref_no}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord("payments",payment.id);

                    setToastText("Payment deleted successfully.");
                    setToastStatus("success");
                    setShowToast(true);

                    if (payments.length === 1 && page > 1) {
                        setPage(page - 1);
                        await fetchPayment(page - 1);
                    } else {
                        await fetchPayment(page);
                    }

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
    }

    const clearForm = async () => {
        setForm({
            user:userId,
            ref_no:"",
            date_of_payment:"",
            amount:"",
            payment_method:""
        });

        await fetchPayment(page);
    }
    return (
        <>
            <div className="table-responsive">
                <div className="text-end"> 
                    <button 
                        className="btnSuccess"
                        onClick={handleShowModal}
                    >
                        Create Payment
                    </button>
                </div>
                <table className="table table-hover align-middle mb-0" style={{fontSize:"14px"}}>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Reference</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-4"
                                    >
                                        Loading payments...
                                    </td>
                                </tr>

                            ): payments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-4"
                                    >
                                        No payment found.
                                    </td>
                                </tr>
                            ):(
                                payments.map((payment, index) => (

                                    <tr key={payment.id}>

                                        <td>{index + 1}</td>

                                        <td>{payment.ref_no}</td>

                                        <td>{payment.date_of_payment}</td>

                                        <td>
                                            ₱{payment.amount.toLocaleString()}
                                        </td>

                                        <td>{payment.payment_method}</td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleEditPayment(payment)}
                                                title="Edit User"
                                            >
                                                <FaPencilAlt />
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger me-2"
                                                onClick={() => handleDeletePayment(payment)}
                                                title="Delete User"
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </td>

                                    </tr>

                                ))
                            )
                        }

                       

                    </tbody>

                </table>
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

            {/* modal for add payment */}
            <CustomModal
                show={showModal}
                title={editingPayment ? "Edit Payment" : "Create Payment"}
                handleClose={() => setShowModal(false)}
                content={
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Reference Number:<span className="text-danger">*</span></label>
                                <input type="text" 
                                    className="form-control txtStandard"
                                    name="ref_no"
                                    value={form.ref_no}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Payment Method:<span className="text-danger">*</span></label>
                                <select name="payment_method"
                                    className="form-control txtStandard"
                                    value={form.payment_method}
                                    onChange={handleInputChange}
                                >
                                    <option value="" hidden>Select Payment Method</option>
                                    <option value="gcash">Gcash</option>
                                    <option value="maya">Maya</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Date of Payment:<span className="text-danger">*</span></label>
                                <input type="date" 
                                    className="form-control txtStandard"
                                    name="date_of_payment"
                                    value={form.date_of_payment}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Amount:<span className="text-danger">*</span></label>
                                <input type="number" 
                                    className="form-control txtStandard"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </>
                    
                }
                onSave={handleSaveConfirm}
                saveText={editingPayment ? "Update Payment" : "Add Payment"}
            />
            {/* ======================================= */}

            <CustomToast
                show={showToast}
                message={toastText}
                type={toastStatus}
                onClose={() => setShowToast(false)}
            />

            <Loading
                loading={loading}
            />
        </>
    )
}