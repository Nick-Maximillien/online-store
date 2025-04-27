import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  create(orderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      ...orderDto,
      status: 'pending',
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll(): Order[] {
    return this.orders;
  }
}
