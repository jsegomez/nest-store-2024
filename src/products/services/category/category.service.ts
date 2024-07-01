import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/products/dtos/category.dto';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ){}

    async findAll():Promise<Category[]>{
        return await this.categoryModel.find().exec();
    }

    async findById(id: string):Promise<Category>{
        const category = await this.categoryModel.findById(id).exec();
        if(!category) throw new NotFoundException(`Categoria con id: ${id} no fue existe en la base de datos.`);
        return category;
    }

    async create(category: CreateCategoryDto):Promise<Category>{
        const checkUniqueName = await this.categoryModel.findOne({name: category.name});
        if(checkUniqueName) throw new BadRequestException(`Marca con nombre ${category.name} ya existe en la base de datos`);

        const newCategory = new this.categoryModel(category);
        return await newCategory.save();
    }
}
