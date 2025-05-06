export const typeDefs = `#graphql
    type Game {
    id: ID!,
    title: String!,
    platform: [String]!
  }
    type Review{
        id: ID!,
        rating: Int!
        content: String!
    
    }
        type Author{
        id: ID!,
        verified: Boolean!
        name: String!
    
    }
        type Query {
        reviews: [Review]
        review(id:{ID}): Review
        games: [Game]
        authors: [Author]
        }

`

//int, float,string, boolean,ID