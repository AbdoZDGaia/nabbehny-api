import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    constructor() {
        this.roles = [];
    }

    @ApiProperty()
    _id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    roles: string[];
}
