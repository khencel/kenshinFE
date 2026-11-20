"use client";

import { useEffect, useRef, useState } from "react";
import { BranchForm } from "../../../../../types/kenshin/branch";


export const EMPTY_BRANCH: BranchForm = {
    name: "",
    address: "",
    map_link: "",
    is_active: true,
    image: null,
};

// Gamitin ito sa pag-send sa Django (multipart/form-data)
export function toFormData(form: BranchForm): FormData {
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("address", form.address.trim());
    fd.append("map_link", form.map_link.trim());
    fd.append("is_active", String(form.is_active));
    if (form.image) fd.append("image", form.image);
    return fd;
}

const MAX_SIZE_MB = 5;

interface Props {
    form: BranchForm;
    onChange: (patch: Partial<BranchForm>) => void;
}

export default function BranchFields({ form, onChange }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState("");

    // preview ng bagong file; nililinis ang object URL pagkatapos
    useEffect(() => {
        if (!form.image) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(form.image);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [form.image]);

    const shownImage = previewUrl ?? form.image_url ?? null;
    

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Image file lang ang pwede.");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`Hanggang ${MAX_SIZE_MB}MB lang ang pwede.`);
            e.target.value = "";
            return;
        }

        setError("");
        onChange({ image: file });
    };

    const clearNewFile = () => {
        onChange({ image: null });
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="row g-3">
            {/* IMAGE */}
            <div className="col-12">
                <label className="form-label">Branch Image:</label>

                <div
                    className="border rounded d-flex align-items-center justify-content-center bg-light mb-2"
                    style={{ height: 220, overflow: "hidden" }}
                >
                    {shownImage ? (
                        <img
                            src={shownImage}
                            alt="Branch"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <span className="text-muted">No image</span>
                    )}
                </div>

                <div className="d-flex gap-2 align-items-center">
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="form-control txtStandard"
                        onChange={handleFile}
                    />
                    {form.image && (
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm text-nowrap"
                            onClick={clearNewFile}
                        >
                            Cancel new image
                        </button>
                    )}
                </div>
                {error && <small className="text-danger">{error}</small>}
            </div>

            <div className="col-md-6">
                <label className="form-label">
                    Branch Name: <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className="form-control txtStandard"
                    placeholder="Ex. SMDC Light Mall"
                    value={form.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Status:</label>
                <select
                    className="form-select txtStandard"
                    value={form.is_active ? "true" : "false"}
                    onChange={(e) => onChange({ is_active: e.target.value === "true" })}
                >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            <div className="col-12">
                <label className="form-label">
                    Address: <span className="text-danger">*</span>
                </label>
                <textarea
                    className="form-control txtStandard"
                    rows={3}
                    value={form.address}
                    onChange={(e) => onChange({ address: e.target.value })}
                />
            </div>

            <div className="col-12">
                <label className="form-label">Google Map Link:</label>
                <input
                    type="url"
                    className="form-control txtStandard"
                    placeholder="https://maps.app.goo.gl/..."
                    value={form.map_link}
                    onChange={(e) => onChange({ map_link: e.target.value })}
                />
            </div>
        </div>
    );
}