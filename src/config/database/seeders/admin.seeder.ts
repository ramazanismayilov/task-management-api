import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../common/enums/role.enum';
import { RoleEntity } from '../../../modules/roles/entities/role.entity';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export class AdminSeeder {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async run(dataSource: DataSource) {
    const roleRepo = dataSource.getRepository(RoleEntity);
    const userRepo = dataSource.getRepository(UserEntity);

    let adminRole = await roleRepo.findOne({ where: { name: Role.SUPER_ADMIN } });
    if (!adminRole) {
      adminRole = roleRepo.create({ name: Role.SUPER_ADMIN });
      await roleRepo.save(adminRole);
      this.logger.log(`Role "${Role.SUPER_ADMIN}" created successfully`, AdminSeeder.name);
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD as string;

    const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      this.logger.log(`Super admin already exists (email: ${adminEmail})`, AdminSeeder.name);
    } else {
      const password = await bcrypt.hash(adminPassword, 10);
      const adminUser = userRepo.create({
        email: adminEmail,
        password,
        role: adminRole,
        isActive: true,
        profile: { fullName: 'Ramazan İsmayılov' },
      });

      await userRepo.save(adminUser);
      this.logger.log(`Super admin created successfully (email: ${adminEmail})`, AdminSeeder.name);
    }

    this.logger.log('Super admin seeding completed', AdminSeeder.name);
  }
}
