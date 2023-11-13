import {MigrationInterface, QueryRunner} from "typeorm";

export class adeddTimestampToReviews1699837114782 implements MigrationInterface {
    name = 'adeddTimestampToReviews1699837114782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`created_at\``);
    }

}
