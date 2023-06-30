import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {

    constructor(
        private authService : AuthService
    ){}


    @Post('/signup')
    signUp ( @Body() signUpDto : SignUpDto ) : Promise<{ token : string}>{
        return this.authService.signUp(signUpDto)

    }
    
    @Post('/login')
    login ( @Body() loginDto : LoginDto ) : Promise<{ token : string}>{
        return this.authService.login(loginDto)

    }







}
