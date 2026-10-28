import style from "./UserDetails.module.css"

export default function UserInformation(){
    return (
        <>
            <div>
                <h6 className={style.headerLabel}>User Information</h6>
            </div>
            <hr />

            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Email Address:</label>
                        </div>
                        <div>
                            khenneth.alaiza@gmail.com 
                        </div>
                    </div>
                </div>
                <div className="col-6 text-end">
                    <span style={{fontWeight:"600"}} className="text-success">Active</span>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">First Name:</label>
                        </div>
                        <div>
                            Khenneth
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Last Name:</label>
                        </div>
                        <div>
                            Alaiza
                        </div>
                    </div> 
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Date of Birth:</label>
                        </div>
                        <div>
                            March 10, 1992
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Gender:</label>
                        </div>
                        <div>
                            Male
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}