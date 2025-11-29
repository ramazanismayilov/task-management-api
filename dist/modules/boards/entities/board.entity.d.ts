import { ProjectEntity } from "../../../modules/projects/entities/project.entity";
import { BoardColumnEntity } from "./board-column.entity";
export declare class BoardEntity {
    id: number;
    name: string;
    description: string;
    project: ProjectEntity;
    columns: BoardColumnEntity[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
