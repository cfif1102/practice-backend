import { PickType } from '@nestjs/swagger';

import { CreateEmployeeDto } from '@employee/dto/create-employee.dto';

export class SignInDto extends PickType(CreateEmployeeDto, ['login', 'password']) {}
