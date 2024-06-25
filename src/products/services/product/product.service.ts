import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CreateProdcutDTO, UpdateProductDTO } from 'src/products/dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { FilterProductsDTO } from 'src/products/dtos/filter-products.dto';
import { PaginationProduct } from 'src/products/entities/PaginationProduct.interface';
import { filter } from 'rxjs';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async findAll(params: FilterProductsDTO): Promise<PaginationProduct> {
        const filters: FilterQuery<Product> = {}
        const { limit, page, minPrice, maxPrice, name } = params;        
        if(minPrice) filters.price = {$gte: minPrice, $lte: maxPrice}
        if(name) filters.name = { $regex: name, $options: "i"}
        
        const [quantityProducts, products] = await Promise.all([
            this.productModel.countDocuments(filters).exec(),
            this.productModel.find(filters).skip(page * limit).limit(limit).exec()
        ]);

        const calculateTotalPages = (Math.ceil((quantityProducts / limit)) - 1)
        const totalPages = calculateTotalPages > 0 ? (Math.ceil((quantityProducts / limit)) - 1) : 0;
        const quantityPerPage = products.length;

        if (params.page > totalPages) throw new NotFoundException(`Máximo de paginas: ${totalPages}`);

        return {
            page: {
                currentPage: params.page,
                lastPage: params.page == totalPages,
                totalPages: totalPages,
                totalElements: quantityProducts,
                size: quantityPerPage
            },
            products
        }
    }

    async findOne(productId: string): Promise<Product> {
        return await this.productModel.findById(productId).exec();
    }

    async create(product: CreateProdcutDTO): Promise<Product> {
        const checkUniqueName: Product | null = await this.productModel.findOne({ name: product.name });
        if (checkUniqueName) throw new BadRequestException(`Producto con nombre ${product.name} ya existe en la base de datos`);

        const newProduct: Product = new this.productModel(product);
        return await newProduct.save();
    }

    async update(id: string, changes: UpdateProductDTO): Promise<Product> {
        const productUpdated: Product = await this.productModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!productUpdated) throw new NotFoundException(`Producto con id: ${id} no fue encontrado`);
        return productUpdated;
    }

    async deleteById(id: string): Promise<boolean> {
        const removedProduct = await this.productModel.findByIdAndDelete(id).exec();
        if (!removedProduct) throw new NotFoundException(`Producto con id: ${id} no fue encontrado`);
        return true
    }
}
