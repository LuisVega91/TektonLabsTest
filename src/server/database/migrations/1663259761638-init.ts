import {MigrationInterface, QueryRunner} from "typeorm";

export class init1663259761638 implements MigrationInterface {
    name = 'init1663259761638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'client')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP WITH TIME ZONE, "genre_id" integer NOT NULL, CONSTRAINT "UQ_deeb2be76882b6fe30d65eb7266" UNIQUE ("name"), CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_preferences" ("user_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_8718e4d6c824b86cde79da85841" PRIMARY KEY ("user_id", "genre_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf08e0df86a017203c6075fd11" ON "users_preferences" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_adef7e83aad1346b566e563c09" ON "users_preferences" ("genre_id") `);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_622ffe28923ae45eb97ce536694" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_preferences" ADD CONSTRAINT "FK_cf08e0df86a017203c6075fd113" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_preferences" ADD CONSTRAINT "FK_adef7e83aad1346b566e563c09c" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_preferences" DROP CONSTRAINT "FK_adef7e83aad1346b566e563c09c"`);
        await queryRunner.query(`ALTER TABLE "users_preferences" DROP CONSTRAINT "FK_cf08e0df86a017203c6075fd113"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_622ffe28923ae45eb97ce536694"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adef7e83aad1346b566e563c09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf08e0df86a017203c6075fd11"`);
        await queryRunner.query(`DROP TABLE "users_preferences"`);
        await queryRunner.query(`DROP TABLE "genres"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
