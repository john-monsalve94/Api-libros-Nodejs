import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('api_libros_db', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
});
