import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { MongoIdPipe } from 'src/shared/pipes/mongo-id/mongo-id.pipe';
import { CreateOrderDto } from 'src/users/dtos/order.dto';
import { Order } from 'src/users/entities/order.entity';
import { OrderService } from 'src/users/services/order/order.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private orderServ: OrderService
    ){}

    @Get('all')
    async getOrders():Promise<Order[]>{
        return await this.orderServ.findAll();
    }

    @Get('details')
    async getOrder(@Query('id', MongoIdPipe) id: string):Promise<Order>{
        return await this.orderServ.findById(id);
    }

    @Post('create')
    async create(@Body() order: CreateOrderDto):Promise<Order>{
        return this.orderServ.create(order);
    }

    @Post('update')
    async update(@Query('id', MongoIdPipe) id: string, @Body() order: CreateOrderDto):Promise<Order>{
        return this.orderServ.update(id, order);
    }
}
