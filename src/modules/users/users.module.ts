import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/users.repository";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../roles/entities/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
    providers: [UserRepository],
    exports: [UserRepository], 
})
export class UsersModule { }
