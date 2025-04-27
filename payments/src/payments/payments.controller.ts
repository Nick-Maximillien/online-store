import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { Config } from '../config';

@Controller('mock-payments/mpesa')
export class MpesaController {
  @Post('initiate')
  async initiate(@Body() body: any) {
    const { orderId, amount } = body;

    // Simulate delay

    setTimeout(async () => {
      try {
        await axios.post(Config.mpesa.callbackUrl, {
          orderId,
          amount,
          status: 'success',
          message: 'Payment processed successfully'
        });
        console.log('Callback posted to backend successfully');
      } catch (err) {
        console.error('Callback post failed:', err.message);
      }
    }, 3000);

    return {
      status: 'initiated',
      provider: Config.mpesa.providerName,
      callbackUrl: Config.mpesa.callbackUrl,
      message: 'Simulating M-Pesa payment, will callback in 3s...',
    };
  }
}

