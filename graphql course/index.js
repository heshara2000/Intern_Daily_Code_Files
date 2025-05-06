import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const server = new ApolloServer({
    typeDefs,
    resolvers

})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000}
})

console.log('Server ready at port', 4000)