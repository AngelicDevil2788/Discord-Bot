const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const embed = new Discord.EmbedBuilder()

module.exports.data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Bans the specified user')
  .addUserOption(option =>
    option.setName('user')
      .setDescription('The user to be banned')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('reason')
      .setDescription('The reason for the ban')
      .setRequired(false));

module.exports.execute = async (interaction, client) => {
  let member = interaction.guild.members.cache.find(m => m.id === interaction.options.getUser('user').id)

  let reason = interaction.options.getString('reason') || "No reason given"
  if (!interaction.member.permissions.has('BAN_MEMBERS')) {
    embed.setDescription('You do not have the needed permissions')
      .setColor('#0000ff')
    return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });
  }
  if (!interaction.guild.members.cache.find(user => user.id === client.user.id).permissions.has('BAN_MEMBERS')) {
    embed.setDescription('I do not have the needed permissions')
      .setColor('#0000ff')
    return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });
  }
  if (interaction.member.id == member.id) {
    embed.setDescription('You can not ban yourself')
      .setColor('#0000ff')
    return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });
  }

  member.ban({ reason: reason })

  embed.setDescription(`${interaction.options.getUser('user').tag} has been banned. Reason: ${reason}`)
    .setColor('#0000ff')
  return interaction.reply({ embeds: [embed], ephemeral: false }).catch((err) => { console.log(err) });

}