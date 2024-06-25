import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBrandDTO } from 'src/products/dtos/brand.dto';
import { Brand } from 'src/products/entities/brand.entity';
import { BrandService } from 'src/products/services/brand/brand.service';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id/mongo-id.pipe';

@Controller('brand')
export class BrandController {
    constructor(
        private brandServ: BrandService
    ){}

    @Get('all')
    async getAll():Promise<Brand[]>{
        return await this.brandServ.findAll();
    }

    @Get('details')
    async getById(@Query('id', MongoIdPipe) id: string):Promise<Brand>{
        return await this.brandServ.findById(id)
    }

    @Post('create')
    async createBrand(@Body() data: CreateBrandDTO):Promise<Brand>{
        return await this.brandServ.create(data);
    }
}
