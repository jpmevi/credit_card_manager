import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTypeTextPin1699851352161 implements MigrationInterface {
    name = 'changeTypeTextPin1699851352161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`pin\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`pin\``);
    }

}
