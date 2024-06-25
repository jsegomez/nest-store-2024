import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDTO } from 'src/products/dtos/brand.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<Brand>
    ){}

    async findAll():Promise<Brand[]>{
        return await this.brandModel.find().exec();
    }

    async findById(id: string):Promise<Brand>{
        const brand = await this.brandModel.findById(id).exec();
        if(!brand) throw new NotFoundException(`Producto con id: ${id} no fue encontrado`);
        return brand;
    }

    async create(brand: CreateBrandDTO):Promise<Brand>{
        const checkUniqueName = await this.brandModel.findOne({name: brand.name});
        if(checkUniqueName) throw new BadRequestException(`Marca con nombre ${brand.name} ya existe en la base de datos`);

        const newBrand = new this.brandModel(brand);
        return await newBrand.save();
    }
}
