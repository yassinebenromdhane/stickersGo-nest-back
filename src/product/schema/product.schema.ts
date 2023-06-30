import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps : true})
export class Product {
    @Prop()
    title : string

    @Prop()
    description : string

    @Prop()
    price : number

    @Prop()
    size : string

}

export const ProductSchema = SchemaFactory.createForClass(Product) 