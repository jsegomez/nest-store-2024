import {
    Body,
    Controller,
    Delete,
    Get,
    Headers, HttpCode, HttpStatus, ParseIntPipe, Post, Put, Query
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateProdcutDTO } from 'src/products/dtos/product.dto';
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
    getAll(): Promise<Product[]> {
        return this.productServ.findAll();
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

    // @Put('update')
    // @ApiOperation({ summary: "Update product" })
    // updateProduct(@Headers('id') id: string, @Body() data: Product) {
    //     return {
    //         data,
    //         id
    //     };
    // }

    // @Delete()
    // @ApiOperation({ summary: "Delete product by id" })
    // deleleProduct(@Query('id', ParseIntPipe) id: number):boolean {
    //     return this.productServ.deleteById(id);
    // }
}
