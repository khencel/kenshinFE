interface Voucher {
    id:number,
    code: string,
    description: string,
    discount: string
    expiry:string,
    status:string
}

interface VoucherProps {
    vouchers: Voucher[]
}


export default function VoucherListPage({vouchers}:VoucherProps){
    return (
        <>
            <div className="table-responsive">
                <div className="text-end"> 
                    <button className="btnSuccess">
                        Create Voucher
                    </button>
                </div>
                <table className="table table-hover align-middle mb-0" style={{fontSize:"14px"}}>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Voucher Code</th>
                            <th>Description</th>
                            <th>Discount</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {vouchers.map((voucher, index) => (

                            <tr key={voucher.id}>

                                <td>{index + 1}</td>

                                <td>
                                    <strong>
                                        {voucher.code}
                                    </strong>
                                </td>

                                <td>{voucher.description}</td>

                                <td>{voucher.discount}</td>

                                <td>{voucher.expiry}</td>

                                <td>
                                    <span
                                        className={`badge ${
                                            voucher.status === "Active"
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                    >
                                        {voucher.status}
                                    </span>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    )
}