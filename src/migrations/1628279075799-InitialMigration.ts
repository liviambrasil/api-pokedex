import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1628279075799 implements MigrationInterface {
    name = 'InitialMigration1628279075799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon_user" ("id" SERIAL NOT NULL, "pokemonId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_55a1fb15e9b1eb7bc6c26313588" PRIMARY KEY ("userId", "pokemonId")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e3fcfcd81ca9bc330728fa91301"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_55a1fb15e9b1eb7bc6c26313588" PRIMARY KEY ("pokemonId", "userId")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e3fcfcd81ca9bc330728fa91301"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6" PRIMARY KEY ("userId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6" PRIMARY KEY ("id", "userId")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e3fcfcd81ca9bc330728fa91301" PRIMARY KEY ("userId", "id", "pokemonId")`);
        await queryRunner.query(`CREATE INDEX "IDX_df2ff96947b4d6b45852a09ff7" ON "pokemon_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_54eeafa45c1e52f1d6c49c2b8e" ON "pokemon_user" ("pokemonId") `);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "FK_df2ff96947b4d6b45852a09ff77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "FK_54eeafa45c1e52f1d6c49c2b8ee" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "FK_54eeafa45c1e52f1d6c49c2b8ee"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "FK_df2ff96947b4d6b45852a09ff77"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`DROP INDEX "IDX_54eeafa45c1e52f1d6c49c2b8e"`);
        await queryRunner.query(`DROP INDEX "IDX_df2ff96947b4d6b45852a09ff7"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e3fcfcd81ca9bc330728fa91301"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6" PRIMARY KEY ("userId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6" PRIMARY KEY ("userId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_399334aec2a1ca8bd403f57d4f6"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e3fcfcd81ca9bc330728fa91301" PRIMARY KEY ("pokemonId", "userId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_55a1fb15e9b1eb7bc6c26313588"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e3fcfcd81ca9bc330728fa91301" PRIMARY KEY ("pokemonId", "userId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_55a1fb15e9b1eb7bc6c26313588"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon_user" ADD CONSTRAINT "PK_e50dc6725d377615fcc556ecfe7" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "pokemon_user"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
