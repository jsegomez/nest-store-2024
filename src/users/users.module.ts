import { Module } from '@nestjs/common';

import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { CustomerService } from './services/customer/customer.service';
import { CustomerController } from './controllers/customer/customer.controller';

@Module({
    controllers: [
        UserController,
        CustomerController
    ],
    providers: [
        UserService,
        CustomerService
    ],
    imports:[
       ProductsModule ,
       MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        },
        {
            name: Customer.name,
            schema: CustomerSchema
        },
       ])
    ]
})
export class UsersModule {}