export interface Booking {
    id:number,
    branch_id:number,
    name:string,
    contact_no:number,
    date_booked:string,
    time_booked:string,
    no_of_guests:number
}

export interface CreateBooking {
    branch_id:number,
    name:string,
    contact_no:string,
    date_booked:string,
    time_booked:string,
    no_of_guests:number
}