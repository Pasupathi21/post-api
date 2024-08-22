import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class SignupDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    last_name: string

    @IsString()
    @IsOptional()
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsBoolean()
    is_active: boolean
}

export class SigninDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string

}
