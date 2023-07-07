import { Body, Controller, Delete, Get, Param, Post , Put , Query, UseGuards} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { CreateProductDTO } from './dto/create-product-dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDTO } from './dto/update-product-dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
@ApiTags('Product Management')
export class ProductController {
    constructor(private productService : ProductService){}

    @Get()
    @ApiQuery({name : 'keyword' , required : false})
    // @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async getAllProducts( @Query() query : ExpressQuery ) : Promise<Product[]>{
        return this.productService.findAll(query)
    }

    @Post()
    @ApiBody({type : [CreateProductDTO]})
    @UseGuards(AuthGuard())
    async addproduct (@Body() product : CreateProductDTO) : Promise<Product>{
        return this.productService.addproduct(product)
    }

    @Get(':id')
    async getProductById(@Param('id') _id : string) : Promise<Product>{
        return this.productService.findById(_id)
    }


    @Put(':id')
    async updateProductById(@Param('id') _id : string , @Body() product : UpdateProductDTO) : Promise<Product>{
        console.log(_id)
        return this.productService.updateProduct(_id,product)
    }

    @Delete(':id')
    async deleteProductById(@Param('id') _id : string ) : Promise<Product>{
        console.log(_id)
        return this.productService.deleteProduct(_id)
    }
}
