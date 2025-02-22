import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaultDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
