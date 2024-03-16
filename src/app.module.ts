import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { BrandController } from './controllers/brand/brand.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [
    CategoriesController,
    ProductsController,
    BrandController,
    OrdersController,
    CustomerController,
    UserController
  ],
  providers: [AppService],
})
export class AppModule {}
