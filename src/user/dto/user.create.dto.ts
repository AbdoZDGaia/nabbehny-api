import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    roles: string[];
}
