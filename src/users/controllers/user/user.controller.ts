import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id/mongo-id.pipe';
import { CreateUserDTO, UpdateUserDTO } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private userServ: UserService
    ){}

    @Get('all')
    async getAll():Promise<User[]>{
        return await this.userServ.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() data: CreateUserDTO):Promise<User>{        
        return await this.userServ.createUser(data);
    }

    @Put()    
    async update(@Query('id', MongoIdPipe) id: string, @Body() data: UpdateUserDTO):Promise<User>{        
        return await this.userServ.update(id, data);
    }

    @Get('details')
    async getUserById(@Query('id', MongoIdPipe) id: string):Promise<User>{
        return this.userServ.findById(id);
    }
}
