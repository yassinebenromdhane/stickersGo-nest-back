import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    description: 'Name of the product',
    minimum: 50,
    default: 50,
    type : String
  })
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly size: string;
}
