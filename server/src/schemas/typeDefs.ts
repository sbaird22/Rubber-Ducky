const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bugs: [Bug]!
    }
    
    type Bug {
        _id: ID!
        title: String!
        bugDescription: String!
        createdAt: String!
        createdBy: String!
        attempts: [Attempt]!
    }
    
    type Attempt {
        _id: ID!
        attemptDescription: String!
        createdAt: String!
    }
    
    input BugInput {
        title: String!
        bugDescription: String!
        createdBy: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }
        
    type Auth {
        token: ID!
        user: User
    }
        
    type Query {
        users: [User]!
        user(username: String!): User
        bugs: [Bug]!
        bug(bugId: ID!): Bug
        me: User
    }
        
    type Mutation {
        addUser(input: UserInput!): Auth
        login(email: String!, password: String!): Auth
        addBug(input: BugInput!): Bug
        addAttempt(bugId: ID!, attemptDescription: String!): Bug
        removeBug(bugId: ID!): Bug
        removeAttempt(bugId: ID!, attemptId: ID!): Bug
    }
`;

export default typeDefs;
