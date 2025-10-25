import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { Autor } from './autor.model';
// estamos creando el molde o estructura de los libros
export const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
  },
});

Autor.hasMany(Libro,{foreignKey:'autorId'});
Libro.belongsTo(Autor,{foreignKey:'autorId'});