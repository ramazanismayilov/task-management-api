import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('audit_logs')
export class AuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  status: number;

  @Column('jsonb', { nullable: true })
  meta: any;

  @CreateDateColumn()
  createdAt: Date;
}
