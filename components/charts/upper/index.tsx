export default function UpperIndexTable(){
    return (
        <>
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>john.doe@example.com</td>
                      <td>Admin</td>
                      <td>
                        <span className="badge bg-success">
                          Active
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </>
    )
}