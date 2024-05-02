import { ICommand } from "wokcommands";
import DiscordJS from 'discord.js';
import { request, gql } from 'graphql-request'
import * as x from '../exports';
const { baam } = require('../config.json')
import fs from 'fs';

export default {
    category: 'Utility',
    description: 'Changing the offshore alliance ID!',


    slash: true,
    testOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<offshore_id>',
    options: [
        {
            name: 'offshore_id',
            description: "The ID of the in-game offshore!",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        }
    ],

    callback: async ({ interaction }) => {

        let offshoreID = interaction.options.getNumber('offshore_id')!

        const endpoint = `https://api.politicsandwar.com/graphql?api_key=${baam}`

        const query = gql`
        { alliances (id: ${offshoreID}, first: 50) 
        { data 
            { name }}}
            `

        const data = await request(endpoint, query)

        if (data.alliances.data[0] == null) {
            let embed = new x.Embed()
                .setTitle('Error!')
                .setDescription(`This alliance doesn't exist!`)

            await interaction.reply({
                embeds: [embed]
            })
        } else {

            fs.readFile('./config.json', 'utf-8', (err, jsonString) => {
                if (err) {
                    console.log(err);
                } else {
                    try {
                        const data = JSON.parse(jsonString);
                        console.log(data.token)

                        const newObject = data

                        newObject["offshoreID"] = `${offshoreID}`

                        console.log(newObject)

                        fs.writeFile('./config.json', JSON.stringify(newObject, null, 2), async err => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('File successfully written!')

                                let embed = new x.Embed()
                                    .setTitle('Success!')
                                    .setDescription(`Offshore changed to AA ID **${offshoreID}**!`)

                                await interaction.reply({
                                    embeds: [embed]
                                })
                            }
                        })
                    } catch (err) {
                        console.log('Error parsing JSON', err)
                    }
                }
            })
        }
    },
} as ICommand