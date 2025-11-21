import { Controller, Get, Param } from "@nestjs/common";
import * as User from "../"
import { Auth } from "src/common/decorators/auth.decorator";

@Auth()
@Controller('users')
export class UserController {
    constructor(private userService: User.UserService) { }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id)
    }
}