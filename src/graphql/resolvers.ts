import { error } from 'console';
import { Autor } from '../models/autor.model';
import { Libro } from '../models/libro.model';

export const resolvers = {
  Query: {
    autores: async () => {
      const response = await Autor.findAll()
      console.log(response)
      const responseAuthors = response.map(
        dataValues => {
          console.log(dataValues)
          return ({
            id: dataValues.dataValues.id,
            nombre: dataValues.dataValues.nombre
          })
        })
      return responseAuthors
    },
    libros: async () => Libro.findAll({ include: [Autor] }),
  },

  Mutation: {
    agregarAutor: async (_: any, { autor }: any) => {
      return await Autor.create({ nombre: autor });
    },

    agregarLibro: async (_: any, { titulo, anio, autor }: any) => {
      //  Buscar si el autor ya existe
      let autorEncontrado = await Autor.findOne({ where: { nombre: autor } }) as any;

      //  Si no existe, lo creamos
      if (!autorEncontrado) {
        autorEncontrado = await Autor.create({ nombre: autor });
        console.log(`Autor "${autor}" creado automáticamente`);
      }

      //  Crear el libro asociado al autor encontrado o recién creado
      const nuevoLibro = await Libro.create({
        titulo,
        anio,
        autorId: autorEncontrado.id,
      });

      //  Retornar el nuevo libro
      return nuevoLibro;
    },
    actualizarAutor: async (_: any, { id, nombre }: any) => {
      const autor = await Autor.findByPk(id);
      if (!autor) throw new Error("Autor no encontrado");
      autor.nombre = nombre;
      await autor.save();
      return autor;
    },
    eliminarAutor: async (_: any, { id }: { id: number }) => {
      const autor = await Autor.findByPk(id);
      if (!autor) throw new Error("Autor no encontrado");
      await autor.destroy();
      return `Autor con ID ${id} eliminado correctamente`;
    },
    actualizarLibro: async (_: any, { id, titulo, autor, anio }: any) => {
      const libro = await Libro.findByPk(id);
      if (!libro) throw new Error("Libro no encontrado");

      //  Si le mandas el autor, buscará o creará
      if (autor) {
        const [autorExistente] = await Autor.findOrCreate({
          where: { nombre: autor },
        });

        libro.autorId = autorExistente.id;
        libro.autor = autorExistente.nombre;
      }

      if (titulo) libro.titulo = titulo;
      if (anio !== undefined) libro.anio = anio;

      await libro.save();
      return libro;
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
    }
  }

};
