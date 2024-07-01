import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCategoryDto } from 'src/products/dtos/category.dto';
import { Category } from 'src/products/entities/category.entity';
import { CategoryService } from 'src/products/services/category/category.service';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id/mongo-id.pipe';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoryServ: CategoryService
    ){}

    @Get('all')
    async getAll():Promise<Category[]>{
        return await this.categoryServ.findAll();
    }

    @Get('details')
    async getById(@Query('id', MongoIdPipe) id: string):Promise<Category>{
        return await this.categoryServ.findById(id);
    }

    @Post('create')
    async createBrand(@Body() data: CreateCategoryDto):Promise<Category>{
        return await this.categoryServ.create(data);
    }
}
