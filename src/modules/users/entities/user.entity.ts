import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

    @Column({ default: false })
    isActive: boolean

    @Column({ type: 'int', nullable: true })
    otpCode?: number | null;

    @Column({ type: 'timestamp', nullable: true })
    otpExpiredAt?: Date | null;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    refreshTokenDate: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}