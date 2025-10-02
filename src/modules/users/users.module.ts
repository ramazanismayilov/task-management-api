import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/users.repository";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserRepository],
    exports: [UserRepository], 
})
export class UsersModule { }
