import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/users.repository";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../roles/entities/role.entity";
import { UserController } from "./controllers/users.controller";
import { UserService } from "./services/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserRepository, UserService], 
})
export class UsersModule { }
