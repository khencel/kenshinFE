export interface Payment {
    id:number,
    ref_no: string;
    date_of_payment: string;
    amount: number;
    payment_method: string
}

export interface PaymentProps{
    payments: Payment[]
}

export interface CreatePaymentData {
    ref_no: string;
    date_of_payment: string;
    amount: string;
    payment_method: string
}