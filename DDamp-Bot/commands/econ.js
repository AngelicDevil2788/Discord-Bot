const Discord = require('discord.js')
const fs = require('fs')
const embed = new Discord.EmbedBuilder()
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.data = new SlashCommandBuilder()
  .setName('econ')
  .setDescription('A list of commands for the Soul Economy')
  .addSubcommand(subCommand =>
    subCommand.setName('balance')
      .setDescription('Shows your currency balance'))


module.exports.execute = async (interaction, client) => {
  try {
    let userData = require(`../users/${interaction.member.user.tag}.json`)
  } catch (err) {
    fs.writeFile(`./users/${interaction.member.user.tag}.json`, JSON.stringify({ balance: 0 }), (err) => { console.log(err) })
    console.log(err)
  }
  let userData = await require(`../users/${interaction.member.user.tag}.json`)
  console.clear()
  if (interaction.options.getSubcommand() === 'balance') {
    embed.setTitle(`${interaction.member.user.tag}`)
      .setDescription(`balance: **$${userData.balance}**`)
    interaction.reply({ embeds: [embed] }).catch((err) => { console.log(err) });
  }

}
