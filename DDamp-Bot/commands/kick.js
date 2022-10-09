const Discord = require('discord.js')
const fs = require('fs')
const embed = new Discord.EmbedBuilder()
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kicks the specified user')
  .addUserOption(option =>
    option.setName('user')
      .setDescription('The user to be kicked')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('reason')
      .setDescription('The reason for the kick')
      .setRequired(false));

module.exports.execute = async (interaction, client) => {
  let member = interaction.guild.members.cache.find(m => m.id === interaction.options.getUser('user').id)

  let reason = interaction.options.getString('reason') || "No reason given"
  if (!interaction.member.permissions.has('KICK_MEMBERS')) {
    embed.setDescription('You do not have the needed permissions')
      .setColor('#0000ff')
    return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });
  }
  if (!interaction.guild.members.cache.find(user => user.id === client.user.id).permissions.has('KICK_MEMBERS')) {
    embed.setDescription('I do not have the needed permissions')
      .setColor('#0000ff')
    return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });
  }
  if (interaction.member.id == member.id) {
    embed.setDescription('You can not kick yourself')
      .setColor('#0000ff')
    return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });
  }

  member.ban({ reason: reason })

  embed.setDescription(`${interaction.options.getUser('user').tag} has been kicked. Reason: ${reason}`)
    .setColor('#0000ff')
  return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });

}
