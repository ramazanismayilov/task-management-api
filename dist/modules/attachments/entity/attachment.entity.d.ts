import { Media } from '../../../common/enums/media.enum';
import { BaseEntity } from 'typeorm';
export declare class AttachmentEntity extends BaseEntity {
    id: string;
    url: string;
    type: Media;
    createdAt: Date;
    updatedAt: Date;
}
