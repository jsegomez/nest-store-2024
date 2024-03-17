import {
    Body,
    Controller,
    Delete,
    Get,
    Headers, HttpCode, HttpStatus, ParseIntPipe, Post, Put, Query
} from '@nestjs/common';
import { CreateProdcutDTO } from 'src/dtos/product.dto';

import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product/product.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productServ: ProductService
    ){}

    @Get('all')
    getAll(): Product[] {
        return this.productServ.findAll();
    }

    @Get('details')
    getById(@Query('id', ParseIntPipe) id: number): Product {
        return this.productServ.findOne(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    createProduct(@Body() data: CreateProdcutDTO): Product {
        return this.productServ.create(data);
    }

    @Put('update')
    updateProduct(@Headers('id') id: string, @Body() data: Product) {
        return {
            data,
            id
        };
    }

    @Delete()
    deleleProduct(@Query('id', ParseIntPipe) id: number):boolean {
        return this.productServ.deleteById(id);
    }
}
