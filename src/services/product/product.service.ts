import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { dataProducts } from './data-products';
import { CreateProdcutDTO } from 'src/dtos/product.dto';

@Injectable()
export class ProductService {
    private products:Product[] = dataProducts;

    findAll():Product[]{
        return this.products;
    }

    findOne(productId: number):Product{
        const product = this.products.find(product => product.id == productId)
        if(!product) throw new NotFoundException(`Producto con id: ${productId} no fue encontrado.`);
        return product;
    }

    create(product: CreateProdcutDTO):Product{
        const id = this.products.length + 1;

        const newProduct: Product = {            
            ...product,
            id: id,
            name: `Producto ${id}`,
            description: `Descripción de producto ${id}`,
            url: `Url producto ${id}`
        }
        this.products.push(newProduct);
        return newProduct;
    }

    deleteById(productId: number):boolean{
        const product = this.products.find(prod => prod.id == productId);
        if(!product) throw new NotFoundException(`Producto con id: ${productId} no fue encontrado.`);
        this.products = this.products.filter(product => productId != product.id);
        return true;
    }
}
