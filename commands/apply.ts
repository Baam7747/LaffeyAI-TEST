import { ICommand } from "wokcommands";
import { Permissions } from 'discord.js';
import datastore from 'nedb';
const userInfo = new datastore({ filename: 'userInfo.db' });
import * as x from '../exports';

export default {
    category: 'Utility',
    description: 'Starting an application ticket!',

    slash: true,
    testOnly: true,

    callback: async ({ interaction, guild, channel }) => {

        await interaction.deferReply()

        let username = (interaction.user.username).toLowerCase()

        let appChan = guild!.channels.cache.find(c => c.name == `app-${username}`)

        console.log(appChan)

        if (!appChan) {

            const madeChannel: any = await interaction.guild!.channels.create(`app-${interaction.user.username}`, {
                parent: '1085265933439881226',
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.USE_APPLICATION_COMMANDS
                        ],
                    },
                    {
                        id: '857486135717658634',
                        allow: [
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.USE_APPLICATION_COMMANDS
                        ],
                    },
                    {
                        id: channel.guild.roles.everyone,
                        deny: [
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.VIEW_CHANNEL,
                        ],
                    },
                ],
            })

            let embed = new x.Embed()
                .setTitle('Success!')
                .setDescription(`You've created an application at <#${madeChannel.id}>!`)

            let embed1 = new x.Embed()
                .setTitle('Welcome to your application!')
                .setDescription(`We'll get to you as soon as possible!`)

            await interaction.editReply({ embeds: [embed] })
            setTimeout(async () => await interaction.deleteReply(), 10000)

            await madeChannel.send(`<@&697329236834385930> <@${interaction.user.id}>`)
            await madeChannel.send({ embeds: [embed1] })

            userInfo.loadDatabase((err) => { // Callback is optional
                userInfo.find({ discordID: interaction.user.id }, async (err: Error | null, docs: any[]) => {

                    if (docs[0] === undefined) {

                        let embed = new x.Embed()
                            .setTitle('Error!')
                            .setDescription(`I don't see <@${interaction.user.id}> in my database. I can't find their nation ID!`)

                        madeChannel.send({
                            embeds: [embed]
                        })

                    } else {
                        const nationLink = await madeChannel.send(`Here is <@${interaction.user.id}>'s nation! - https://politicsandwar.com/nation/id=${docs[0].nationID}`)
                        nationLink.pin()
                    }
                })
            })
            return
        } else {
            let embed = new x.Embed()
                .setTitle('Error!')
                .setDescription(`You've already started an application!`)

            await interaction.editReply({
                embeds: [embed]
            })
        }
    },
} as ICommand