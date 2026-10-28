export default function Navbar({ onMenuClick }) {

    return (
        <nav className="admin-navbar">

            <div className="navbar-left">

                <button
                    type="button"
                    className="menu-button"
                    onClick={onMenuClick}
                >
                    ☰
                </button>

                <span>
                    Admin Panel
                </span>

            </div>

            <div className="navbar-right">

                <div className="notification">

                    🔔

                    <span className="notification-badge">
                        4
                    </span>

                </div>

                <div>
                    Admin
                </div>

            </div>

        </nav>
    );
}