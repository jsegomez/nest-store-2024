import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Query } from '@nestjs/common';

import { EmailPipe } from 'src/shared/pipes/email/email.pipe';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id/mongo-id.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customer.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { CustomerService } from 'src/users/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(
        private customerServ: CustomerService
    ){}

    @Get('all')
    async findAll():Promise<Customer[]>{
        return await this.customerServ.findAll();
    }

    @Get('find-id')
    async findById(@Query('id', MongoIdPipe) id: string):Promise<Customer>{
        return await this.customerServ.findById(id);
    }

    @Get('find-email')
    async findByEmail(@Query('email', EmailPipe) email: string):Promise<Customer>{
        return await this.customerServ.findByEmail(email);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createCustomer(@Body() data: CreateCustomerDto):Promise<Customer>{
        return this.customerServ.create(data);
    }

    @Put('update')
    async updateCustomer(@Query('id', MongoIdPipe) id: string, @Body() data: UpdateCustomerDto):Promise<Customer>{
        return this.customerServ.update(id, data);
    }
}
