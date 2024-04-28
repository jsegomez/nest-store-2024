import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CreateProdcutDTO } from 'src/products/dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>
    ){}

    async findAll():Promise<Product[]>{        
        return await this.productRepo.find();
    }

    async findOne(productId: number):Promise<Product>{
        const product = await this.productRepo.findOneBy({id: productId});
        if(product){
            return product;
        }

        throw new NotFoundException(`Producto con id: ${productId} no fue encontrado`);
    }

    async create(product: CreateProdcutDTO):Promise<Product>{                
        const verifyName = await this.productRepo.findOneBy({name: product.name});

        if(verifyName){
            throw new BadRequestException(`Producto con nombre: '${product.name}' ya existe en la base de datos`);
        }

        try {
            return await this.productRepo.save(product);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // deleteById(productId: number):boolean{

    // }    
}
