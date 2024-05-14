import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FilterProductsDTO } from 'src/products/dtos/filter-products.dto';

import { CreateProdcutDTO, UpdateProductDTO } from 'src/products/dtos/product.dto';
import { PaginationProduct } from 'src/products/entities/PaginationProduct.interface';
import { Product } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/services/product/product.service';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id/mongo-id.pipe';

@Controller('products')
export class ProductsController {
    constructor(
        private productServ: ProductService,
    ){}

    @Get('all')
    @ApiOperation({ summary: "List of products" })
    getAll(@Query() params: FilterProductsDTO): Promise<PaginationProduct> {
        return this.productServ.findAll(params);
    }

    @Get('details')
    @ApiOperation({ summary: "Get product by ID" })
    getById(@Query('id', MongoIdPipe) id: string): Promise<Product> {
        return this.productServ.findOne(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Create new product" })
    createProduct(@Body() data: CreateProdcutDTO) {
        return this.productServ.create(data);
    }

    @Put('update')
    @ApiOperation({ summary: "Update product" })
    updateProduct(
        @Query('id', MongoIdPipe) id: string,
        @Body() data: UpdateProductDTO
    ):Promise<Product>{
        return this.productServ.update(id, data);
    }

    @Delete()
    @ApiOperation({ summary: "Delete product by id" })
    deleleProduct(@Query('id', MongoIdPipe) id: string):Promise<boolean> {
        return this.productServ.deleteById(id);
    }
}
