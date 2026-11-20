"use client";

import { useEffect, useState } from "react";
import CustomModal from "../../../../../components/Modal";
import BranchFields, {EMPTY_BRANCH } from "./BranchFields";
import { BranchForm } from "../../../../../types/kenshin/branch";

interface AddBranchProps {
    show: boolean;
    onClose: () => void;
    onSave: (values: BranchForm) => Promise<void> | void;
}

export default function EditBranch({ show, onClose, onSave }: AddBranchProps) {
    const [form, setForm] = useState<BranchForm>(EMPTY_BRANCH);

    useEffect(() => {
        if (show) setForm(EMPTY_BRANCH);
    }, [show]);

    const handleChange = (patch: Partial<BranchForm>) =>
        setForm((prev) => ({ ...prev, ...patch }));

    const handleSaveConfirm = async () => {
        if (!form.name.trim() || !form.address.trim()) return;
        await onSave(form);
        onClose();
    };

    return (
        <CustomModal
            show={show}
            title="Add Branch"
            handleClose={onClose}
            size="lg"
            content={<BranchFields form={form} onChange={handleChange} />}
            onSave={handleSaveConfirm}
            saveText="Add Branch"
        />
    );
}