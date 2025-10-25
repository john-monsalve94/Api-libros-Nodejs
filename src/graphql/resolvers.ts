import { Autor } from '../models/autor.model';
import { Libro } from '../models/libro.model';

export const resolvers = {
  Query: {
    autores: async () => Autor.findAll(),
    libros: async () => Libro.findAll({ include: [Autor] }),
  },

  Mutation: {
    agregarAutor: async (_: any, { nombre }: any) => {
      return await Autor.create({ nombre });
    },

    agregarLibro: async (_: any, { titulo, anio, autorNombre }: any) => {
      const autor: any = await Autor.findOne({ where: { nombre: autorNombre } });
      if (!autor) throw new Error('Autor no encontrado');

      return await Libro.create({
        titulo,
        anio,
        autorId: autor.getDataValue('id'),
      });
    },
  },

  Autor: {
    libros: async (parent: any) => {
      return await Libro.findAll({ where: { autorId: parent.id } });
    },
  },

  Libro: {
    autor: async (parent: any) => {
      return await Autor.findByPk(parent.autorId);
    },
  },
};
