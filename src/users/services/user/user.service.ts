import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from 'src/users/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel:Model<User>
    ){}

    async findAll():Promise<User[]>{
        const users = await this.userModel.find().exec();
        if(users.length == 0) throw new NotFoundException(`No se encontraron registros en la base de datos`);
        return users;
    }

    async findById(id: string):Promise<User>{        
        const user = await this.userModel.findById(id).exec();
        if(!user) throw new NotFoundException(`Usuario con id: ${id} no se encontro en la base de datos`);
        return user;
    }

    async findByEmail(email: string):Promise<User>{        
        const user = await this.userModel.findOne({email}).exec();        
        return user;
    }

    async createUser(user: CreateUserDTO):Promise<User>{
        const searchByEmail = await this.findByEmail(user.email);
        if(searchByEmail) throw new BadRequestException(`Usuario con email: ${user.email} ya se encuentra en la base de datos.`)
        const newUser: User = new this.userModel(user);
        return await newUser.save();
    }

    async update(id: string, changes: UpdateUserDTO):Promise<User>{
        const user = await this.userModel.findByIdAndUpdate(id, {$set: changes}, {new: true}).exec();
        if(!user) throw new NotFoundException(`Usuario con id: ${id} no fue encontrado en la base de datos.`);
        return user;
    }
}
