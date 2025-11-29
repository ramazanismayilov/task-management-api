import { Role } from "../../../common/enums/role.enum";
import { UserEntity } from "../../../modules/users/entities/user.entity";
export declare class RoleEntity {
    id: number;
    name: Role;
    users: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
