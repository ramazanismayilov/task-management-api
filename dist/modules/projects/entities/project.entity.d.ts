import { WorkspaceEntity } from "../../../modules/workspaces/entities/workspace.entity";
import { BoardEntity } from "../../../modules/boards/entities/board.entity";
import { ProjectMemberEntity } from "./project_member.entity";
export declare class ProjectEntity {
    id: number;
    name: string;
    description: string;
    workspace: WorkspaceEntity;
    boards: BoardEntity[];
    members: ProjectMemberEntity[];
    createdAt: Date;
    updatedAt: Date;
}
