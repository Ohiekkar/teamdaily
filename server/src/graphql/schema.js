import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Person {
  id: Int
  name: String
  projects: [Project]
  entries(year: Int! week: Int!): [Entry]
}

type Project {
  id: Int
  name: String
  people: [Person]
}

type Entry {
  id: Int
  year: Int
  week: Int
  name: String
  message: String
  created: String
  color: String
  flagged: Boolean
}

type Query {
  people: [Person]
  person(name: String): Person

  projects: [Project]
  project(name: String): Project

  entries(year: Int! week: Int!): [Entry]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;