import { TaskEntity } from "../../../modules/tasks/entities/task.entity";
import { UserEntity } from "../../../modules/users/entities/user.entity";
export declare class CommentEntity {
    id: number;
    content: string;
    description: string;
    task: TaskEntity;
    user: UserEntity;
    parentComment: CommentEntity | null;
    replies: CommentEntity[];
    createdAt: Date;
    updatedAt: Date;
}
