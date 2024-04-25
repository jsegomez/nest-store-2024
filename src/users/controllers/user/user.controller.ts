import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/user.dto';
import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private userServ: UserService
    ){}

    @Get('all')
    getAll():User[]{
        return this.userServ.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() data: CreateUserDTO):User{        
        return this.userServ.create(data);
    }

    @Get('details')
    getUserById(@Query('id', ParseIntPipe) id: number):User{
        return this.userServ.findOne(id);
    }

    // @Get('orders')
    // getOrders(@Query('id', ParseIntPipe) id: number):Order{
    //     return this.userServ.getOrdersByUser(id);
    // }
}
