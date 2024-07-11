import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dto';
import { Order } from 'src/users/entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>
    ){}

    async findAll():Promise<Order[]>{
        const orders = await this.orderModel.find().populate('customer').exec();
        if(orders.length == 0) throw new NotFoundException('No existe ordenes para mostrar.');
        return orders;
    }

    async findById(id: string):Promise<Order>{
        const order = await this.orderModel.findById(id).populate('customer').exec();
        if(!order) throw new NotFoundException(`Order con id: ${id} no existe en la base de datos.`);
        return order;
    }

    async create(order: CreateOrderDto):Promise<Order>{
        const now = new Date();        
        const orderDate = new Date(now.setHours(now.getUTCHours()));
        const dataOrder:CreateOrderDto = { orderDate, ...order}

        const newOrder: Order = new this.orderModel(dataOrder);
        const savedOrder =  await newOrder.save();
        return await savedOrder.populate('customer');
    }

    async update(id: string, changes: UpdateOrderDto):Promise<Order>{
        const updateOrder = await this.orderModel.findByIdAndUpdate(id, {$set: changes}, {new: true}).exec();
        if(!updateOrder) throw new NotFoundException(`Order con id: ${id} no existe en la base de datos.`);
        return updateOrder;
    }
}
