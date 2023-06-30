import { Body, Controller, Delete, Get, Param, Post , Put} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { CreateProductDTO } from './dto/create-product-dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateProductDTO } from './dto/update-product-dto';

@Controller('product')
@ApiTags('Product Management')
export class ProductController {
    constructor(private productService : ProductService){}

    @Get()
    async getAllProducts() : Promise<Product[]>{
        return this.productService.findAll()
    }

    @Post()
    @ApiBody({type : [CreateProductDTO]})
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
