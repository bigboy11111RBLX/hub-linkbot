const Discord = require('discord.js')
const editJsonFile = require('edit-json-file');
const { getOwnership } = require('noblox.js');
module.exports = {
	name: 'link',
	description: 'Links your Discord Account to your Registered User with a code generated from the Hub.',
	arguments: [
        {
            label: 'Link Code'
        }
    ],
    guildOnly: false,
    userPermissions: [],
    clientPermissions: [
        'SEND_MESSAGES'
    ],
    cooldown: 10,
	run: async (bot, message, args) => {
        let guild = bot.guilds.cache.get(process.env.BOT_PRIMARYGUILD)
        let database = admin.firestore();
        let users = await database.collection('users').get()
        if (users) {
            let entries = users.docs
            let set = entries.find(u => {if (u.data().verify.status == 'link') {return u.data().verify.value == args.join(' ')} else {return false}})
            if (set) {
                let index = set.id
                let value = set.data()
                await database.collection('users').doc(index).update({verify: {status:'complete',value:message.author.id}})
                let robloxUsername = await bot.functions.updateMember(guild.members.cache.find(m => m.user.id == message.author.id))
                if (robloxUsername !== false && robloxUsername !== guild.members.cache.find(m => m.user.id == message.author.id).displayName && guild.members.cache.find(m => m.user.id == message.author.id).id !== guild.owner.id && process.env.HUB_CHANGENICKNAME == 'true' && guild.members.cache.find(m => m.user.id == message.author.id).roles.highest.position < guild.me.roles.highest.position && guild.me.hasPermission('MANAGE_NICKNAMES', true)) guild.members.cache.find(m => m.user.id == message.author.id).setNickname(robloxUsername)
                let ThisEmbed = new Discord.MessageEmbed()
                    .setColor(Number(process.env.BOT_EMBEDCOLOR))
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle('**Link Information**')
                    .addField('Status', ':white_check_mark: **Complete!**', true)
                    .addField('Linked to', value.robloxUsername, true)
                    .setThumbnail(guild.iconURL())
                await message.channel.send(ThisEmbed)
                return
            } else {
                let ThisEmbed = new Discord.MessageEmbed()
                    .setColor(Number(process.env.BOT_EMBEDCOLOR))
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle('**Link Information**')
                    .addField('Status', ':x: **Incomplete!**', true)
                    .addField('Error', 'User to link not Found.', true)
                    .setThumbnail(guild.iconURL())
                await message.channel.send(ThisEmbed)
                return
            }
        } 
        let ThisEmbed = new Discord.MessageEmbed()
            .setColor(Number(process.env.BOT_EMBEDCOLOR))
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle('**Link Information**')
            .addField('Status', ':x: **Incomplete!**', true)
            .addField('Error', 'User to link not Found.', true)
            .setThumbnail(guild.iconURL())
        await message.channel.send(ThisEmbed)
	}
};
