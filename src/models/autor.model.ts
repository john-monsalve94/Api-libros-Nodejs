import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../database/connection';

export class Autor extends Model<
  InferAttributes<Autor>,
  InferCreationAttributes<Autor>
> {
  declare id: CreationOptional<number>; // ✅ No lo paso al crear, pero lo tengo después
  declare nombre: string;
}

Autor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Autor',
    tableName: 'Autors',
  }
);
