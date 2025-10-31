import {gql} from "apollo-server";

export const typeDefs = gql`
  type Autor{
    id:ID!
    nombre: String
    libros: [Libro]
  }
  type Libro {
    id: ID!
    titulo: String
    autor: Autor
    anio: Int
  }

  type Query {
    libros: [Libro]
    autores: [Autor]
  }

  #  Nueva sección: Mutations (acciones para modificar datos)
  type Mutation {
    agregarLibro(titulo: String, autor: String, anio: Int): Libro
    agregarAutor(autor: String!,): Autor
  }
`;