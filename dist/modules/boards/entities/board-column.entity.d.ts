import { BoardEntity } from "./board.entity";
import { TaskEntity } from "../../../modules/tasks/entities/task.entity";
export declare class BoardColumnEntity {
    id: number;
    name: string;
    description: string;
    position: number;
    board: BoardEntity;
    tasks: TaskEntity[];
    createdAt: Date;
    updatedAt: Date;
}
