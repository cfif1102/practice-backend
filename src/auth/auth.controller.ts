import { Body, Controller, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Serialize } from '@common/decorators/serialize.decorator';
import { CreateEmployeeDto } from '@employee/dto/create-employee.dto';
import { EmployeeDto } from '@employee/dto/employee.dto';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiOperation({ summary: 'Вход в аккаунт' })
    @ApiBadRequestResponse({
        description: 'Incorrect login or password | Incorrect input data',
    })
    @ApiCreatedResponse({ type: EmployeeDto })
    @Serialize(EmployeeDto)
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
        const { employee, token } = await this.authService.signIn(signInDto);

        response.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
        });

        return employee;
    }

    @Post('sign-up')
    @ApiOperation({ summary: 'Регистрация' })
    @ApiBadRequestResponse({
        description: 'Email is taken | Incorrect input data',
    })
    @ApiCreatedResponse({ type: EmployeeDto })
    @Serialize(EmployeeDto)
    async signUp(@Body() createEmployeeDto: CreateEmployeeDto, @Res({ passthrough: true }) response: Response) {
        const { employee, token } = await this.authService.signUp(createEmployeeDto);

        response.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
        });

        return employee;
    }

    @Put('sign-out')
    @ApiOperation({ summary: 'Выход из аккаунта' })
    @ApiOkResponse({ description: 'User signed out' })
    @ApiUnauthorizedResponse({ description: 'User not authorized' })
    @UseGuards(AuthGuard('jwt'))
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        response.clearCookie('jwt-refresh');

        response.sendStatus(200);
    }
}
