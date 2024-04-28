import { Injectable, NotFoundException } from '@nestjs/common';

import { dataUser } from './user.data';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDTO } from 'src/users/dtos/user.dto';
import { Order } from 'src/users/entities/order.entity';
import { ProductService } from 'src/products/services/product/product.service';


@Injectable()
export class UserService {
    private users:User[] = dataUser;

    constructor(
        private productServ:ProductService
    ){}

    findAll():User[]{
        return this.users;
    }

    findOne(id: number):User{
        const user = this.users.find(user => user.id == id);
        if(!user) throw new NotFoundException(`Usuario con id: ${id} no fue encontrado.`);
        return user
    }

    create(user: CreateUserDTO):User{
        const id = this.users.length + 1;
        const newUser:User = { id, ...user}

        this.users.push(newUser);
        return newUser;
    }

    deleteUserById(id: number):boolean{
        const user = this.users.find(user => user.id == id);
        if(!user) throw new NotFoundException(`Usuario con id: ${id} no fue encontrado.`);

        this.users = this.users.filter(user => user.id != id);
        return true;
    }

    // getOrdersByUser(id: number): Order{
    //     const user = this.users.find(user => user.id == id);
    //     if(!user) throw new NotFoundException(`Usuario con id: ${id} no fue encontrado.`);
    //     const products = this.productServ.findAll();

    //     return {
    //         date: new Date(),
    //         user,
    //         products
    //     }
    // }
}
