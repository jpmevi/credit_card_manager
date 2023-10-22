import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1623859774537 implements MigrationInterface {
  name = 'init1623859774537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `examples` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `status` varchar(10) NOT NULL, `code` varchar(10) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_fa1376321185575cf2226b1491` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_fa1376321185575cf2226b1491` ON `examples`',
    );
    await queryRunner.query('DROP TABLE `examples`');
  }
}
