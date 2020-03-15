import gqlClient from '../graphql-client';
import gql from 'graphql-tag';
import { MessageEmbed } from 'discord.js';

const ALL_TUTORIALS = gql`
  query {
    tutorials {
      id
      title
      content

      author {
        username
      }
    }
  }
`;

const makeEmbed = t =>
  new MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(t.author.username)
    .setTitle(t.title)
    .setURL(`https://sudra-routes.com/tutorials/view/${t.id}/`)
    .addFields({ name: 'Author', value: t.author.username })
    .setTimestamp();

const handler = async ({ command, msg }) => {
  if (!['!tutorials', '!tuts', '!tutorial'].includes(command)) {
    return;
  }

  const {
    data: { tutorials },
  } = await gqlClient.query({ query: ALL_TUTORIALS });

  for (const tutorial of tutorials) {
    msg.channel.send(makeEmbed(tutorial));
  }
};

export default handler;
