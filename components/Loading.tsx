interface LoadingProps {
    loading: boolean
}


export default function Loading ({loading}:LoadingProps){
    return (
        <>
            {loading && (
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.7)",
                        zIndex: 10,
                    }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
}