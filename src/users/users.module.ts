import { Module } from '@nestjs/common';

import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    imports:[
       ProductsModule 
    ]
})
export class UsersModule {}
