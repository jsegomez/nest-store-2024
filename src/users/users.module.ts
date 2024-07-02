import { Module } from '@nestjs/common';

import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    imports:[
       ProductsModule ,
       MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        }
       ])
    ]
})
export class UsersModule {}