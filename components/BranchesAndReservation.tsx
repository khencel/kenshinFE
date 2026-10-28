"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Calendar, ChevronDown, Clock } from "lucide-react";
import { BRANCHES } from "@/lib/data";

type Status = "idle" | "sending" | "sent";

export default function BranchesAndReservation() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    // TODO: replace with a real API route / email service
    console.log("Reservation request:", data);
    await new Promise((r) => setTimeout(r, 600));
    setStatus("sent");
    form.reset();
  }

  return (
    <section id="branches" className="position-relative overflow-hidden bg-ink">
      <div
        className="photo reserve-bg d-none d-lg-block"
        style={{ backgroundImage: "url(/Moody.png)" }}
        aria-hidden
      />
      <div className="fill reserve-fade" aria-hidden />

      <div className="container k-container position-relative py-5">
        <div className="row g-5 g-lg-0">
          {/* Branches */}
          <div className="col-lg-6 branches-col pe-lg-5">
            <p className="eyebrow">Our Branches</p>
            <h2 className="font-serif fw-medium mt-2 mb-0" style={{ fontSize: 26 }}>
              Visit Our Branches
            </h2>

            <div className="row row-cols-1 row-cols-sm-3 g-3 mt-2">
              {BRANCHES.map((b) => (
                <div className="col" key={b.name}>
                  <div className="branch-card">
                    <div
                      className="photo"
                      style={{ backgroundImage: `url(${b.img})` }}
                      role="img"
                      aria-label={`${b.name} branch`}
                    />
                    <div className="p-3">
                      <h3 className="font-serif fw-semibold mb-1" style={{ fontSize: 13 }}>
                        {b.name}
                      </h3>
                      <p className="text-mute mb-3" style={{ fontSize: 9, lineHeight: 1.4 }}>
                        {b.address}
                      </p>
                      <a href={b.map} target="_blank" rel="noreferrer">
                        View Map
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation */}
          <div id="reserve" className="col-lg-6 ps-lg-5">
            <p className="eyebrow">Reservation</p>
            <h2 className="font-serif fw-medium mt-2 mb-0" style={{ fontSize: 22 }}>
              Book a Table
            </h2>
            <p className="mt-2 fs-12" style={{ opacity: 0.85 }}>
              Secure your spot and enjoy the full Kenshin experience.
            </p>

            <form onSubmit={onSubmit} className="row g-3" style={{ maxWidth: 440 }}>
              <div className="col-6">
                <input name="name" required placeholder="Name" className="form-control k-field" />
              </div>
              <div className="col-6">
                <input name="phone" required type="tel" placeholder="Phone Number" className="form-control k-field" />
              </div>

              <div className="col-6 position-relative">
                <input name="date" required type="date" aria-label="Date" className="form-control k-field" />
                <Calendar size={14} className="field-icon" />
              </div>
              <div className="col-6 position-relative">
                <input name="time" required type="time" aria-label="Time" className="form-control k-field" />
                <Clock size={14} className="field-icon" />
              </div>

              <div className="col-6 position-relative">
                <select name="guests" required defaultValue="" className="form-select k-field">
                  <option value="" disabled>
                    Number of Guests
                  </option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="field-icon" style={{ right: 28 }} />
              </div>

              <div className="col-12">
                <button type="submit" disabled={status === "sending"} className="btn-kenshin">
                  {status === "sending" ? "Sending…" : "Reserve Now"} <ArrowRight size={14} />
                </button>
              </div>

              {status === "sent" && (
                <div className="col-12">
                  <p className="text-gold fs-12 mb-0" role="status">
                    Thank you! We&apos;ve received your request and will confirm shortly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
