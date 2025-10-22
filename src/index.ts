import { ApolloServer, gql } from 'apollo-server';
import { sequelize } from './database/connection';
import { Libro } from './models/libro.model';
//  Tipos de datos
const typeDefs = gql`
  type Libro {
    id: ID!
    titulo: String
    autor: String
    anio: Int
  }

  type Query {
    libros: [Libro]
  }

  #  Nueva sección: Mutations (acciones para modificar datos)
  type Mutation {
    agregarLibro(titulo: String, autor: String, anio: Int): Libro
  }
`;

// Resolvers (Acciones)
const resolvers = {
  Query: {
    libros: async () => await Libro.findAll()
  },
  Mutation: {
    // agregar un libro
    agregarLibro: async (_: any, args: { titulo: string; autor: string; anio: number }) => {
      const nuevoLibro = await Libro.create(args);
      return nuevoLibro;
    }
  }
};

//  Iniciamos el servidor
const server = new ApolloServer({ typeDefs, resolvers });

// Conectamos a PostgreSQL sincroniza y crea las tablas, true para que se acualice los campos y luego levantamos Apollo
sequelize.sync({ alter: true }).then(() => {
  console.log(' Base de datos sincronizada');
  server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en: ${url}`);
  });
}).catch((error) => console.error('❌ Error al conectar con la base de datos:', error));
