import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from 'src/users/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>
    ){}

    async findAll():Promise<Customer[]>{
        const customers: Customer[] = await this.customerModel.find().exec();
        if(customers.length == 0) throw new NotFoundException('Sin registros en la base de datos');
        return customers;
    }

    async findById(id: string):Promise<Customer>{
        const customer: Customer = await this.customerModel.findById(id).exec();
        if(!customer) throw new NotFoundException(`Usuario con id: ${id} no fue encontrado.`);
        return customer;
    }

    async findByEmail(email: string, throwError: boolean = true):Promise<Customer>{
        const customer: Customer = await this.customerModel.findOne({email}).exec();
        if(!customer && throwError) throw new NotFoundException(`Usuario con email: ${email} no fue encontrado.`);
        return customer;
    }

    async create(customer: CreateCustomerDto):Promise<Customer>{
        const searchCustomerByEmail: Customer = await this.findByEmail(customer.email, false);
        if(searchCustomerByEmail) throw new BadRequestException(`Cliente con email: ${customer.email} ya existe en la base de datos`);
        const newCustomer: Customer = new this.customerModel(customer);
        return await newCustomer.save();
    }

    async update(id: string, changes: UpdateCustomerDto):Promise<Customer>{
        const updateCustomer: Customer = await this.customerModel.findByIdAndUpdate(id, {$set: changes}, {new: true}).exec();
        if(!updateCustomer) throw new NotFoundException(`Cliente con id: ${id} no existe en la base de datos.`);        
        return updateCustomer;
    }
}
