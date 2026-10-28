

export default function DashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome back, Administrator!
          </p>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-download me-2"></i>
          Generate Report
        </button>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">
        {/* Users */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Total Users
                  </p>

                  <h2 className="mb-0 fw-bold">
                    1,250
                  </h2>

                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i>{" "}
                    12.5%
                  </small>
                </div>

                <div className="bg-primary bg-opacity-10 text-primary rounded p-3">
                  <i className="bi bi-people fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Vehicles
                  </p>

                  <h2 className="mb-0 fw-bold">
                    856
                  </h2>

                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i>{" "}
                    8.2%
                  </small>
                </div>

                <div className="bg-success bg-opacity-10 text-success rounded p-3">
                  <i className="bi bi-car-front fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parking */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Available Parking
                  </p>

                  <h2 className="mb-0 fw-bold">
                    124
                  </h2>

                  <small className="text-danger">
                    <i className="bi bi-arrow-down"></i>{" "}
                    4.3%
                  </small>
                </div>

                <div className="bg-warning bg-opacity-10 text-warning rounded p-3">
                  <i className="bi bi-p-square fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Today's Revenue
                  </p>

                  <h2 className="mb-0 fw-bold">
                    ₱45,280
                  </h2>

                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i>{" "}
                    15.8%
                  </small>
                </div>

                <div className="bg-info bg-opacity-10 text-info rounded p-3">
                  <i className="bi bi-cash-stack fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        {/* Revenue Chart Placeholder */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0">
                Revenue Overview
              </h5>
            </div>

            <div className="card-body">
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded"
                style={{ height: "300px" }}
              >
                <div className="text-center text-muted">
                  <i className="bi bi-bar-chart fs-1"></i>

                  <p className="mt-2 mb-0">
                    Revenue Chart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Status */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0">
                Parking Status
              </h5>
            </div>

            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Occupied</span>
                  <strong>76%</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: "76%" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Available</span>
                  <strong>24%</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "24%" }}
                  />
                </div>
              </div>

              <div className="text-center">
                <h2 className="fw-bold">
                  500
                </h2>

                <p className="text-muted mb-0">
                  Total Parking Slots
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            Recent Transactions
          </h5>

          <button className="btn btn-sm btn-outline-primary">
            View All
          </button>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>License Plate</th>
                  <th>Entry Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#TRX-001</td>
                  <td>Toyota Vios</td>
                  <td>ABC 1234</td>
                  <td>08:32 AM</td>
                  <td>₱50.00</td>
                  <td>
                    <span className="badge bg-success">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#TRX-002</td>
                  <td>Honda Civic</td>
                  <td>XYZ 5678</td>
                  <td>08:45 AM</td>
                  <td>₱80.00</td>
                  <td>
                    <span className="badge bg-success">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#TRX-003</td>
                  <td>Mitsubishi Xpander</td>
                  <td>NBC 9012</td>
                  <td>09:12 AM</td>
                  <td>₱100.00</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#TRX-004</td>
                  <td>Ford Ranger</td>
                  <td>DEF 3456</td>
                  <td>09:30 AM</td>
                  <td>₱120.00</td>
                  <td>
                    <span className="badge bg-success">
                      Paid
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}