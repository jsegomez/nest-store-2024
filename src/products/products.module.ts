import { Module } from '@nestjs/common';

import { BrandController } from './controllers/brand/brand.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductService } from './services/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';
import { BrandService } from './services/brand/brand.service';
import { CategoryService } from './services/category/category.service';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
    controllers: [
        BrandController,
        CategoriesController,
        ProductsController,
    ],
    providers: [
        BrandService,
        CategoryService,
        ProductService
    ],
    exports: [
        ProductService
    ],
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            },
            {
                name: Brand.name,
                schema: BrandSchema
            },
            {
                name: Category.name,
                schema: CategorySchema
            }
        ])
    ]
})
export class ProductsModule {}
