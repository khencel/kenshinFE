"use client";

import { FormEvent, useState } from "react";

export default function ReservationForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "there");
    setMessage(`Thank you, ${name}! This demo form is ready to connect to your reservation API.`);
    form.reset();
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-6"><input className="form-control" name="name" placeholder="Name" required aria-label="Name" /></div>
        <div className="col-6"><input className="form-control" name="phone" type="tel" placeholder="Phone Number" required aria-label="Phone number" /></div>
        <div className="col-6"><input className="form-control" name="date" type="date" required aria-label="Reservation date" /></div>
        <div className="col-6"><input className="form-control" name="time" type="time" required aria-label="Reservation time" /></div>
        <div className="col-6"><select className="form-select" name="guests" defaultValue="" required aria-label="Number of guests"><option value="" disabled>Number of Guests</option>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}</select></div>
        <div className="col-12"><button className="btn-red" type="submit">Reserve Now <span>→</span></button></div>
      </div>
      {message && <p className="form-message" role="status">{message}</p>}
    </form>
  );
}
