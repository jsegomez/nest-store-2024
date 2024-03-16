import { Body, Controller, Delete, Get, Headers, Post, Put, Query } from '@nestjs/common';

import { Product } from 'src/interfaces/product.interface';

@Controller('products')
export class ProductsController {
    @Get('all')
    getAll(): string{
        return 'Devuelve todos los productos';
    }

    @Get('details')
    getById(@Query('id') id: string): string{
        return 'Devuelve producto por Id:' + id;
    }


    @Post('create')
    createProduct(@Body() data:Product): Product{
        return data;
    }

    @Put('update')
    updateProduct(@Headers('id') id: string, @Body() data:Product){
        return {
            data,
            id
        };
    }

    @Delete()
    deleleProduct(){
        return 'delete';
    }
}
