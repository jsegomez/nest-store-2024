import { Module } from '@nestjs/common';

import { BrandController } from './controllers/brand/brand.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product
        ])
    ],
    controllers: [
        BrandController,
        CategoriesController,
        ProductsController,        
    ],
    providers: [
        ProductService
    ],
    exports: [
        ProductService
    ]
})
export class ProductsModule {}
