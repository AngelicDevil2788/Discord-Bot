const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Site online!'))

app.listen(port, () => {
  console.log('Site online!')
})

const Discord = require('discord.js')
const fs = require('node:fs');
const path = require('node:path');
const client = new Discord.Client({ intents: 32767 })
require('dotenv').config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
console.log("init rest")

const rest = new REST({ version: '10' }).setToken("OTgxMjI0NTAyOTk2NDAyMTk3.GtTTBW.-I6YWjMxlT6Hide0ueBHoLTzMUMfReje2NzPdo");
console.log("rest initialized")

client.on('ready', () => {
  console.log('ready');
  try {
    console.log('Started refreshing application (/) commands.');

    client.guilds.cache.forEach((guild) => {
      rest.put(
        Routes.applicationGuildCommands("981224502996402197", guild.id),
        { body: commands },
      );
    })

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;


  const command = require(`./commands/${interaction.commandName}.js`)

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
  }

})

client.login("OTgxMjI0NTAyOTk2NDAyMTk3.GtTTBW.-I6YWjMxlT6Hide0ueBHoLTzMUMfReje2NzPdo");