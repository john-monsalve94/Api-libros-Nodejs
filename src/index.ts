import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  
  type Libro {
    id: ID!
    titulo: String
    autor: String
    anio: Int
  }
  type Query{
  libros:[Libro]
  }
  `;
const libros = [
    { id: '1', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
    { id: '2', titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943 },
    { id: '3', titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605 }
];
const resolvers = {
    Query: {
        libros: () => libros
    }
};
//  Iniciamos el servidor
const server = new ApolloServer({ typeDefs, resolvers });

//  Lo ponemos a escuchar
server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en: ${url}`);
});