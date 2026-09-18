import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigracionInicial1788206086197 implements MigrationInterface {
  name = 'MigracionInicial1788206086197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // uuid_generate_v4() vive en la extensión uuid-ossp, que NO viene activa
    // en una base limpia de Neon. gen_random_uuid() viene con pgcrypto y está
    // incluido desde PostgreSQL 13, así que es la opción segura.
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(100) NOT NULL,
        "email" character varying(150) NOT NULL,
        "password" character varying(255) NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
