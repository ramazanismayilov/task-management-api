import { AttachmentEntity } from "../../../modules/attachments/entity/attachment.entity";
import { WorkspaceEntity } from "../../../modules/workspaces/entities/workspace.entity";
export declare class OrganizationEntity {
    id: number;
    name: string;
    logo: AttachmentEntity | null;
    workspaces: WorkspaceEntity[];
    isActive: boolean;
    domain: string;
    createdAt: Date;
    updatedAt: Date;
}
