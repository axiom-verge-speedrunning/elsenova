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

const handler = async ({ command, msg, args }) => {
  if (!['!tutorials', '!tuts', '!tutorial'].includes(command)) {
    return;
  }

  const {
    data: { tutorials },
  } = await gqlClient.query({ query: ALL_TUTORIALS, fetchPolicy: 'no-cache' });

  const filter = item => {
    if (args.length === 0) {
      return true;
    }

    return item.title.toLowerCase().includes(args.join(' ').toLowerCase());
  };

  if (tutorials.filter(filter).length > 5) {
    msg.reply('More than 5 results were returned, please enter a search term to narrow it down!');
    return;
  }

  for (const tutorial of tutorials.filter(filter)) {
    msg.channel.send(makeEmbed(tutorial));
  }
};

export default handler;
