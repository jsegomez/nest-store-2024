import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CreateProdcutDTO, UpdateProductDTO } from 'src/products/dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ){}    

    async findAll(): Promise<Product[]>{
        return await this.productModel.find().exec();
    }

    async findOne(productId: string):Promise<Product>{
        return await this.productModel.findById(productId).exec();
    }

    async create(product: CreateProdcutDTO): Promise<Product>{
        const newProduct:Product = new this.productModel(product);
        return await newProduct.save();
    }

    async update(id: string, changes: UpdateProductDTO): Promise<Product>{
        const productUpdated:Product = await this.productModel.findByIdAndUpdate(id, {$set: changes}, {new: true}).exec();
        if(!productUpdated) throw new NotFoundException(`Producto con id: ${id} no fue encontrado`);
        return productUpdated;
    }

    async deleteById(id: string):Promise<boolean>{
        const removedProduct = await this.productModel.findByIdAndDelete(id).exec();
        if(!removedProduct) throw new NotFoundException(`Producto con id: ${id} no fue encontrado`);
        return true
    }    
}
