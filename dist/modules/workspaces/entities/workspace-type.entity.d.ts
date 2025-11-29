import { WorkspaceEntity } from "./workspace.entity";
export declare class WorkspaceTypeEntity {
    id: number;
    name: string;
    workspaces: WorkspaceEntity[];
    createdAt: Date;
    updatedAt: Date;
}
