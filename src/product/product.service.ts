import { Injectable, NotFoundException , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { Product } from './schema/product.schema';
import { Query } from 'express-serve-static-core'


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel : mongoose.Model<Product>
    ){}

    async findAll( query : Query) : Promise<Product[]>{

        const keyword = query.keyword ? {
            title : {
                $regex : query.keyword,
                $options : 'i'
            }
        } : {}
        console.log(keyword)
        const products = await this.productModel.find({ ...keyword })
        return products
    }

    async addproduct(product : Product) : Promise<Product>{
        const res = await this.productModel.create(product)
        return res
    }

    async findById( id : string) : Promise<Product>{
        const res = await this.productModel.findById(id)
        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new BadRequestException('Enter a valid id')
        }
        if (!res) {
            throw new NotFoundException(`product with id : ${id} Not Found `)
        }
        return res
    }

    async updateProduct(id : string , product : Product) : Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id , product , {new : true , runValidators : true})
    }


    async deleteProduct(id : string ) : Promise<Product> {
        return await this.productModel.findByIdAndDelete(id)
    }
}
