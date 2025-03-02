import { ApiProperty } from '@nestjs/swagger';

import { Repairs } from '@@types/auth.types';
import { EmployeeDto } from '@employee/dto/employee.dto';
import { EquipmentDto } from '@equipment/dto/equipment.dto';
import { Expose, Type } from 'class-transformer';

export class RepairDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    startDate: Date;

    @ApiProperty()
    @Expose()
    endDate: Date;

    @ApiProperty()
    @Expose()
    type: Repairs;

    @ApiProperty()
    @Expose()
    detectedFault: string;

    @ApiProperty({ type: () => EmployeeDto })
    @Expose()
    @Type(() => EmployeeDto)
    employee: EmployeeDto;

    @ApiProperty({ type: () => EquipmentDto })
    @Expose()
    @Type(() => EquipmentDto)
    equipment: EquipmentDto;
}
