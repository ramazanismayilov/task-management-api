import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "../../../modules/users/entities/user.entity";

@Entity('project_members')
export class ProjectMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProjectEntity, project => project.members, { onDelete: 'CASCADE' })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, user => user, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ type: 'enum', enum: ['OWNER', 'EDITOR', 'VIEWER'], default: 'VIEWER' })
  role: string;
}
