import { Module } from '@nestjs/common';
import { BrandController } from './controllers/brand/brand.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductService } from './services/product/product.service';

@Module({
    controllers: [
        BrandController,
        CategoriesController,
        ProductsController
    ],
    providers: [
        ProductService
    ]
})
export class ProductsModule {}
