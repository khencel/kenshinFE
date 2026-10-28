import {Mail, MapPin, Music2, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram  } from "react-icons/fa";
import Logo from "./Logo";
import { BRAND, FOOTER_LOCATIONS } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink border-top-k">
      <div className="container k-container py-5">
        <div className="row g-4 align-items-start">
          <div className="col-md-6 col-lg-3">
            <img src="/logo.png" style={{width:"90%"}} alt="" />
          </div>

          <div className="col-md-6 col-lg-3">
            <h4 className="font-serif fw-semibold mb-3" style={{ fontSize: 13 }}>
              Contact Us
            </h4>
            <ul className="list-unstyled fs-11 mb-0 d-grid gap-3">
              <li className="d-flex align-items-center gap-2">
                <Phone size={12} /> {BRAND.phone}
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={12} /> {BRAND.email}
              </li>
            </ul>
            <div className="social d-flex gap-3 mt-3">
              <a href="#" aria-label="Facebook"><FaFacebookF size={14} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={14} /></a>
              <a href="#" aria-label="TikTok"><Music2 size={14} /></a>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <h4 className="font-serif fw-semibold mb-3" style={{ fontSize: 13 }}>
              Our Locations
            </h4>
            <ul className="list-unstyled fs-11 mb-0 d-grid gap-3">
              {FOOTER_LOCATIONS.map((l) => (
                <li key={l.name} className="d-flex align-items-start gap-2">
                  <MapPin size={12} className="mt-1 flex-shrink-0" />
                  <span>
                    {l.name} <span className="text-mute ms-3">– {l.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder – swap for a Google Maps <iframe> embed */}
          <div className="col-md-6 col-lg-3">
            <div className="map-ph">
              <MapPin size={18} fill="#b3202a" color="#b3202a" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-top-k">
        <div className="container k-container py-3 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-mute fs-10">
          <p className="mb-0">
            © {new Date().getFullYear()} Kenshin Japanese Izakaya Restaurant. All rights reserved.
          </p>
          <p className="mb-0">Good Food &nbsp;/&nbsp; Good Company</p>
        </div>
      </div>
    </footer>
  );
}
