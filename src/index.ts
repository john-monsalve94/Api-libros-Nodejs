import { ApolloServer} from 'apollo-server';
import { sequelize } from './database/connection';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';


//  Iniciamos el servidor
const server = new ApolloServer({ typeDefs, resolvers });

// Conectamos a PostgreSQL sincroniza y crea las tablas, true para que se acualice los campos y luego levantamos Apollo
sequelize.sync({ alter: true }).then(() => {
  console.log(' Base de datos sincronizada');
  server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en: ${url}`);
  });
}).catch((error) => console.error('❌ Error al conectar con la base de datos:', error));
