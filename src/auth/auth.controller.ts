import { Body, Controller, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { CreateEmployeeDto } from '@employee/dto/create-employee.dto';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiBadRequestResponse({
        description: 'Incorrect login or password | Incorrect input data',
    })
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
        const { employee, token } = await this.authService.signIn(signInDto);

        response.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
        });

        return employee;
    }

    @Post('sign-up')
    @ApiBadRequestResponse({
        description: 'Email is taken | Incorrect input data',
    })
    async signUp(@Body() createEmployeeDto: CreateEmployeeDto, @Res({ passthrough: true }) response: Response) {
        const { employee, token } = await this.authService.signUp(createEmployeeDto);

        response.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
        });

        return employee;
    }

    @Put('sign-out')
    @ApiOkResponse({ description: 'User signed out' })
    @ApiUnauthorizedResponse({ description: 'User not authorized' })
    @UseGuards(AuthGuard('jwt'))
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        response.clearCookie('jwt-refresh');

        response.sendStatus(200);
    }
}
