import style from "./UserDetails.module.css"

export default function ActiveVoucher(){
    return (
        <>
            <div>
                <h6 className={style.headerLabel}>Active Voucher</h6>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <div className="d-flex">
                        <div style={{width:"40%"}}>
                            <label className="me-2">Code:</label>
                        </div>
                        <div>
                            VSR12FGD
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex">
                        <div style={{width:"40%"}}>
                            <label className="me-2">Subscription Date:</label>
                        </div>
                        <div>
                            September 04, 2026
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="d-flex">
                        <div style={{width:"40%"}}>
                            <label className="me-2">Expiration Date:</label>
                        </div>
                        <div>
                            September 04, 2027
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}