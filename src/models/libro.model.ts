import { DataTypes,Model,Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { Autor } from './autor.model';
// estamos creando el molde o estructura de los libros
interface LibroAttributes {
  id: number;
  titulo: string;
  autor: string | null;
  anio: number | null;
  autorId?: number; // la clave foránea
}

// 👇 2️⃣ Indicamos cuáles atributos son opcionales al crear un libro (por ejemplo, id)
interface LibroCreationAttributes extends Optional<LibroAttributes, "id"> {}

// 👇 3️⃣ Creamos la clase tipada
export class Libro extends Model<LibroAttributes, LibroCreationAttributes>
  implements LibroAttributes {
  public id!: number;
  public titulo!: string;
  public autor!: string | null;
  public anio!: number | null;
  public autorId?: number;
}

// 👇 4️⃣ Inicializamos el modelo (equivalente a sequelize.define)
Libro.init(
  {
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
      allowNull: true,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Autors", // 👈 nombre de la tabla de autores
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Libro",
    tableName: "Libros", // 👈 cambia según tu tabla real
    timestamps: false,
  }
);

// 👇 5️⃣ Relaciones tipadas
Autor.hasMany(Libro, { foreignKey: "autorId" });
Libro.belongsTo(Autor, { foreignKey: "autorId" });