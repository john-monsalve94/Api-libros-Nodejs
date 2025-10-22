import { ApolloServer, gql } from 'apollo-server';

// 📖 1️⃣ Tipos de datos
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

  # 🧩 Nueva sección: Mutations (acciones para modificar datos)
  type Mutation {
    agregarLibro(titulo: String, autor: String, anio: Int): Libro
  }
`;

// 📚 2️⃣ Libros simulados (nuestra mini base de datos)
let libros = [
  { id: '1', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
  { id: '2', titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943 },
  { id: '3', titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605 }
];

// 🍳 3️⃣ Resolvers (qué hacer con cada petición)
const resolvers = {
  Query: {
    libros: () => libros
  },
  Mutation: {
    // Esta es la receta para agregar un libro
    agregarLibro: (_: any, args: { titulo: string; autor: string; anio: number }) => {
      const nuevoLibro = {
        id: String(libros.length + 1),
        titulo: args.titulo,
        autor: args.autor,
        anio: args.anio
      };
      libros.push(nuevoLibro);
      return nuevoLibro;
    }
  }
};

// 🚀 4️⃣ Iniciamos el servidor
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor listo en: ${url}`);
});
