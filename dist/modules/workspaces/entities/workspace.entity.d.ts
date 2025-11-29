import { WorkspaceTypeEntity } from "./workspace-type.entity";
import { OrganizationEntity } from "../../../modules/organizations/entities/organization.entity";
import { ProjectEntity } from "../../../modules/projects/entities/project.entity";
export declare class WorkspaceEntity {
    id: number;
    name: string;
    type: WorkspaceTypeEntity;
    projects: ProjectEntity[];
    description: string;
    organization: OrganizationEntity;
    createdAt: Date;
    updatedAt: Date;
}
