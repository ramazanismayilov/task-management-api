import { UserEntity } from "../../../modules/users/entities/user.entity";
import { BoardColumnEntity } from "../../../modules/boards/entities/board-column.entity";
import { BoardEntity } from "../../../modules/boards/entities/board.entity";
import { TaskPriority } from "../../../common/enums/task-priority.enum";
import { TaskStatus } from "../../../common/enums/task-status.enum";
import { CommentEntity } from "../../../modules/comments/entities/comment.entity";
export declare class TaskEntity {
    id: number;
    title: string;
    description: string;
    board: BoardEntity;
    column: BoardColumnEntity;
    assignedTo: UserEntity | null;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: Date | null;
    parentTask: TaskEntity | null;
    subTasks: TaskEntity[];
    comments: CommentEntity[];
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}
