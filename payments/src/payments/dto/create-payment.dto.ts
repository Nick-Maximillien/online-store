export class CreatePaymentDto {
    amount: number;
    currency: string;
    method: 'mpesa' | 'stripe' | 'paypal';
    orderId: string;
  }
  