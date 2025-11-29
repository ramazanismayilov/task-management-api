import { AttachmentEntity } from "../../../modules/attachments/entity/attachment.entity";
import { UserEntity } from "../../../modules/users/entities/user.entity";
export declare class ProfileEntity {
    id: number;
    user: UserEntity;
    fullName: string;
    bio: string;
    phoneNumber: string;
    location: string;
    avatar: AttachmentEntity;
    createdAt: Date;
    updatedAt: Date;
}
