const MAX_IMAGE_BYTES = 200 * 1024; // 200KB

export const compressImage = (file: File, maxBytes = MAX_IMAGE_BYTES): Promise<File> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = async () => {
            URL.revokeObjectURL(url);

            let scale = Math.min(1, 1024 / Math.max(img.width, img.height));
            let quality = 0.9;

            for (let i = 0; i < 12; i++) {
                const canvas = document.createElement("canvas");
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);

                const ctx = canvas.getContext("2d")!;
                ctx.fillStyle = "#fff"; // para hindi maging itim ang transparent PNG
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const blob: Blob | null = await new Promise((res) =>
                    canvas.toBlob(res, "image/jpeg", quality)
                );

                if (!blob) return reject(new Error("Image compression failed."));

                if (blob.size <= maxBytes) {
                    const name = file.name.replace(/\.\w+$/, "") + ".jpg";
                    return resolve(new File([blob], name, { type: "image/jpeg" }));
                }

                // bawasan muna ang quality, tapos ang dimensions
                if (quality > 0.5) quality -= 0.1;
                else scale *= 0.8;
            }

            reject(new Error("Unable to reduce image below 200KB."));
        };

        img.onerror = () => reject(new Error("Invalid image file."));
        img.src = url;
    });