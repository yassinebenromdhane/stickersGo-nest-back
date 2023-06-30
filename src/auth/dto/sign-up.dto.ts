import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Name of user',
    minimum: 50,
    default: 'yassine',
    type: String,
  })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'this not a valid email' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
