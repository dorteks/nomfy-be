import { PrismaClient } from '@prisma/client';
import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
