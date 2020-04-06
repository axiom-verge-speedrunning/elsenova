import gqlClient from '../graphql-client';
import gql from 'graphql-tag';
import { MessageEmbed } from 'discord.js';

const ALL_ROUTES = gql`
  query {
    routes {
      id
      title

      author {
        username
      }

      category {
        name
      }
    }
  }
`;

const makeEmbed = route =>
  new MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(route.author.username)
    .setTitle(`${route.category.name} - ${route.title}`)
    .setURL(`https://sudra-routes.com/routes/view/${route.id}/`)
    .addFields(
      { name: 'Category', value: route.category.name, inline: true },
      { name: 'Author', value: route.author.username, inline: true },
    )
    .setTimestamp();

const handler = async ({ command, msg }) => {
  if (command !== '!routes') {
    return;
  }

  const {
    data: { routes },
  } = await gqlClient.query({ query: ALL_ROUTES, fetchPolicy: 'no-cache' });

  for (const route of routes) {
    msg.channel.send(makeEmbed(route));
  }
};

export default handler;
