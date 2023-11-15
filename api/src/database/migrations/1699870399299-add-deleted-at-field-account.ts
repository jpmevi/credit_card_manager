import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeletedAtFieldAccount1699870399299 implements MigrationInterface {
    name = 'addDeletedAtFieldAccount1699870399299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`deleted_at\``);
    }

}
