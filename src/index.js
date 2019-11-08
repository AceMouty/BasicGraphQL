const { GraphQLServer } = require('graphql-yoga')



let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
]

let idCount = links.length;

const resolvers = {
     Query: {
        info: () => `I have no info for you here`,
        feed: () => links,
        link: (parent, args) => {
            
        let retLink;
        links.forEach(link => {
            if(link.id === args.id){
                retLink = link
            }
        })
        return retLink
        }
    },

    Mutation:{
      post: (partent, args) => {
        const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url
        }
        links.push(link)
        return link
      },

      updateLink: (root, args) => {
        let retLink;
        links.forEach(link => {
          if(link.id === args.id){

            if (args.url && args.description){
              link.url = args.url
              link.description = args.description
              retLink = link
            } else if (args.url){
              link.url = args.url
              retLink = link
            } else if (args.description){
              link.description = args.description
              retLink = link
            }

          }
        })
        return retLink
      },

      deleteLink: (parent, {id}) => {
        let retLink;

        links.forEach((link, i) => {
          if (link.id === id) {
            retLink = link
            delete links[i]
          }
        })
        return retLink
      }
    }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log('The server is running on port 4000'))