import { ProjectEntity } from "./project.entity";
import { UserEntity } from "../../../modules/users/entities/user.entity";
export declare class ProjectMemberEntity {
    id: number;
    project: ProjectEntity;
    user: UserEntity;
    role: string;
}
