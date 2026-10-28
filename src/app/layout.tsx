import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
// import { BootstrapClient } from "../bootstrap-client";
// import Navigation from "../../../components/Navigation";
import Providers from "./provider"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
