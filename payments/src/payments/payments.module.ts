import { Module } from '@nestjs/common';
import { MpesaController } from './payments.controller';

@Module({
  controllers: [MpesaController],
})
export class PaymentsModule {}