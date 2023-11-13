import {MigrationInterface, QueryRunner} from "typeorm";

export class init1699860995345 implements MigrationInterface {
    name = 'init1699860995345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`currency\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`type\` enum ('dollar', 'quetzal') NOT NULL DEFAULT 'quetzal', \`exchange_type\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`type\` enum ('gold', 'normal') NOT NULL DEFAULT 'normal', \`default_limit\` decimal(10,2) NOT NULL, \`id_currency\` int NOT NULL, UNIQUE INDEX \`REL_dd75fd5eaaa337eeb159dfa71f\` (\`id_currency\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` text NOT NULL, \`rate\` int UNSIGNED NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`username\` varchar(255) NOT NULL, \`cui\` varchar(45) NOT NULL, \`email\` varchar(45) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`dob\` date NOT NULL, \`pin\` text NOT NULL, \`role\` enum ('administrator', 'customer') NOT NULL DEFAULT 'customer', \`notify_me\` tinyint NOT NULL DEFAULT 1, \`reminder\` tinyint NOT NULL DEFAULT 1, \`create_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`doe\` date NOT NULL, \`log\` text NOT NULL, \`status\` enum ('enabled', 'disabled', 'created', 'deleted', 'rejected') NOT NULL, \`date\` date NOT NULL, \`account_number\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(10,2) NOT NULL, \`old_balance\` decimal(10,2) NOT NULL, \`current_balance\` decimal(10,2) NOT NULL, \`type\` enum ('increase', 'decrease') NOT NULL, \`create_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`account_number\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`number\` varchar(50) NOT NULL, \`doe\` date NOT NULL, \`cvv\` varchar(255) NOT NULL, \`status\` enum ('enabled', 'disabled', 'deleted') NOT NULL DEFAULT 'enabled', \`balance\` decimal(10,2) NOT NULL DEFAULT '0.00', \`limit\` decimal(10,2) NOT NULL DEFAULT '3000.00', \`rejections\` int UNSIGNED NOT NULL DEFAULT '0', \`username\` varchar(255) NOT NULL, \`id_account_type\` int NOT NULL, PRIMARY KEY (\`number\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account_type\` ADD CONSTRAINT \`FK_dd75fd5eaaa337eeb159dfa71f0\` FOREIGN KEY (\`id_currency\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_e07711717f71083f97fef1d68d5\` FOREIGN KEY (\`username\`) REFERENCES \`user\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_log\` ADD CONSTRAINT \`FK_65e9f00ef955a9dff85e91664fd\` FOREIGN KEY (\`account_number\`) REFERENCES \`account\`(\`number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_4e11905f0d85fd852512e464d2e\` FOREIGN KEY (\`account_number\`) REFERENCES \`account\`(\`number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_41dfcb70af895ddf9a53094515b\` FOREIGN KEY (\`username\`) REFERENCES \`user\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_7461b5f6501d561926cb0e9f684\` FOREIGN KEY (\`id_account_type\`) REFERENCES \`account_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_7461b5f6501d561926cb0e9f684\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_41dfcb70af895ddf9a53094515b\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_4e11905f0d85fd852512e464d2e\``);
        await queryRunner.query(`ALTER TABLE \`account_log\` DROP FOREIGN KEY \`FK_65e9f00ef955a9dff85e91664fd\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_e07711717f71083f97fef1d68d5\``);
        await queryRunner.query(`ALTER TABLE \`account_type\` DROP FOREIGN KEY \`FK_dd75fd5eaaa337eeb159dfa71f0\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP TABLE \`account_log\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP INDEX \`REL_dd75fd5eaaa337eeb159dfa71f\` ON \`account_type\``);
        await queryRunner.query(`DROP TABLE \`account_type\``);
        await queryRunner.query(`DROP TABLE \`currency\``);
    }

}
