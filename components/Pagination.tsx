"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav>
            <ul className="pagination mb-0">

                {/* Previous */}
                <li
                    className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <li
                        key={page}
                        className={`page-item ${
                            currentPage === page ? "active" : ""
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next */}
                <li
                    className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>

            </ul>
        </nav>
    );
}