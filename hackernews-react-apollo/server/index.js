const { GraphQLServer } = require('graphql-yoga');

let links = [
    {
        id: 'link-0',
        url: 'www.hakunamatata.com',
        description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.potatoTomato.com',
        description: 'Fullstack tutorial for GraphQL'
    }
]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `Hakuna matata`,
        feed: () => links,
        link: (root, args) => {
            console.log(`linkId = ${args.id}`);
            const foundLinkIndex = links.findIndex(link => link.id === args.id);
            console.log(`foundLinkIndex = ${foundLinkIndex}`);
            return links[foundLinkIndex];
        }
    },
    Mutation: {
        create: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            const foundLinkIndex = links.findIndex(link => link.id === args.id)
            links[foundLinkIndex] = {
                id: args.id,
                description: args.description,
                url: args.url
            }
            return links[foundLinkIndex]
        },
        deleteLink: (root, args) => {
            const foundLinkIndex = links.findIndex(link => link.id === args.id)
            links.splice(foundLinkIndex, 1)
            return links[foundLinkIndex]
        },
    },
    Link: {
        id: (root) => root.id, // root -> result of the previous resolver execution level
        description: (root) => root.description,
        url: (root) => root.url
    }
}

const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))