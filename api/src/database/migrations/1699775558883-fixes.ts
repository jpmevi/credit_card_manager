import {MigrationInterface, QueryRunner} from "typeorm";

export class fixes1699775558883 implements MigrationInterface {
    name = 'fixes1699775558883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`balance\` \`balance\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`limit\` \`limit\` decimal(10,2) NOT NULL DEFAULT '3000.00'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`rejections\` \`rejections\` int UNSIGNED NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`rejections\` \`rejections\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`limit\` \`limit\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`balance\` \`balance\` decimal(10,2) NOT NULL`);
    }

}
