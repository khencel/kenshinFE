import LogoutButton from "../Logout";

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
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
                    <LogoutButton />
                </div>

            </div>

        </nav>
    );
}