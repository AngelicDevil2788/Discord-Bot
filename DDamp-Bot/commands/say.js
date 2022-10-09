const Discord = require('discord.js')
const fs = require('fs')
const embed = new Discord.EmbedBuilder()
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.data = new SlashCommandBuilder()
  .setName('say')
  .setDescription('Replies with your input!')
  .addStringOption(option =>
    option.setName('text')
      .setDescription('The input to be sent back')
      .setRequired(true));

module.exports.execute = async (interaction, client) => {
  interaction.reply({
    content: interaction.options.getString('text'),
    ephemeral: false
  }).catch((err) => { console.log(err) });
}
