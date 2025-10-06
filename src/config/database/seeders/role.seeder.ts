import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Role } from '../../../common/enums/role.enum';
import { RoleEntity } from '../../../modules/roles/entities/role.entity';
import { DataSource } from 'typeorm';

export class RoleSeeder {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async run(dataSource: DataSource) {
    const roleRepo = dataSource.getRepository(RoleEntity)

    const roles = [
      Role.SUPER_ADMIN,
      Role.ORGANIZATION_ADMIN,
      Role.TEAM_LEAD,
      Role.USER,
    ];

    for (const name of roles) {
      const existsRole = await roleRepo.findOne({ where: { name } })

      if (existsRole) {
        this.logger.log(`Role "${name}" already exists (id: ${existsRole.id})`, RoleSeeder.name)
      } else {
        const role = roleRepo.create({ name });
        await roleRepo.save(role);
        this.logger.log(`Role "${name}" created successfully`, RoleSeeder.name)
      }
    }

    this.logger.log('Role seeding completed', RoleSeeder.name)
  }
}
