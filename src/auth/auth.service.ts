import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '@@types/auth.types';
import { TokensConfig } from '@@types/config.types';
import { CreateEmployeeDto } from '@employee/dto/create-employee.dto';
import { EmployeeService } from '@employee/employee.service';
import * as bcrypt from 'bcrypt';

import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(signInDto: SignInDto) {
        const { login, password } = signInDto;
        const employee = await this.employeeService.findByLogin(login);

        if (!employee || !bcrypt.compareSync(password, employee.password)) {
            throw new BadRequestException('Incorrect login or password...');
        }

        const token = this.generateToken({ userId: employee.id }, 'access');

        return { employee, token };
    }

    async signUp(createEmployeeDto: CreateEmployeeDto) {
        const { login, password: passwordRaw } = createEmployeeDto;
        const employee = await this.employeeService.findByLogin(login);

        if (employee) {
            throw new BadRequestException('Email is already taken...');
        }

        const password = await bcrypt.hash(passwordRaw, 8);

        createEmployeeDto.password = password;

        const employeeCreated = await this.employeeService.create(createEmployeeDto);
        const token = this.generateToken({ userId: employeeCreated.id }, 'access');

        return { employee: employeeCreated, token };
    }

    generateToken(payload: JwtPayload, token: 'access' | 'refresh') {
        const jwt = this.configService.get<TokensConfig>('jwt')!;
        const tokenConfig = jwt[token];

        return this.jwtService.sign(payload, {
            secret: tokenConfig.secret,
            expiresIn: tokenConfig.expire,
        });
    }
}
