import { ICommand } from "wokcommands";
import DiscordJS from 'discord.js';
import * as x from '../exports';
import fs from 'fs';

export default {
    category: 'Utility',
    description: 'Changing the war channel category!',


    slash: true,
    testOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<category_id>',
    options: [
        {
            name: 'category_id',
            description: "The ID of the category you want war channels to appear in!",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        }
    ],

    callback: async ({ interaction }) => {

        let categoryID = interaction.options.getString('category_id')!

        fs.readFile('./config.json', 'utf-8', (err, jsonString) => {
            if (err) {
                console.log(err);
            } else {
                try {
                    const data = JSON.parse(jsonString);
                    console.log(data.token)

                    const newObject = data

                    newObject["warcat"] = categoryID

                    console.log(newObject)

                    fs.writeFile('./config.json', JSON.stringify(newObject, null, 2), async err => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File successfully written!')

                            let embed = new x.Embed()
                                .setTitle('Success!')
                                .setDescription(`War channel category changed to **${categoryID}**!`)

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
    },
} as ICommand