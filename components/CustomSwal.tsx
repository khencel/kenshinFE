import Swal from "sweetalert2";

interface ConfirmSwalProps {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void | Promise<void>;
}

export const showConfirmSwal = async ({
    title = "Are you sure?",
    text = "Do you want to continue?",
    confirmButtonText = "Yes",
    cancelButtonText = "Cancel",
    onConfirm,
}: ConfirmSwalProps) => {
    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,

        // Custom styling
        customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            htmlContainer: "custom-swal-text",
            confirmButton: "custom-swal-confirm",
            cancelButton: "custom-swal-cancel",
        },

        buttonsStyling: false,
    });

    if (result.isConfirmed) {
        await onConfirm?.();
    }
};