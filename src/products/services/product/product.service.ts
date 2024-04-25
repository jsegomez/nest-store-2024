import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CreateProdcutDTO } from 'src/products/dtos/product.dto';
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
        return await this.productModel.findById(productId).exec()
    }

    async create(product: CreateProdcutDTO): Promise<Product>{
        return await this.productModel.create(product);
    }

    // deleteById(productId: number):boolean{
    //     const product = this.products.find(prod => prod.id == productId);
    //     if(!product) throw new NotFoundException(`Producto con id: ${productId} no fue encontrado.`);
    //     this.products = this.products.filter(product => productId != product.id);
    //     return true;
    // }    
}
