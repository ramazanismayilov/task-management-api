import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../roles/entities/role.entity";
import * as User from "./"
import { UserController } from "./controllers/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User.UserEntity, User.UserActivationEntity, RoleEntity])],
    controllers: [UserController],
    providers: [User.UserRepository, User.UserService],
    exports: [User.UserRepository, User.UserService], 
})
export class UsersModule { }
