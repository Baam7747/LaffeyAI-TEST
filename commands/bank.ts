import { ICommand } from "wokcommands";
import DiscordJS from 'discord.js';
import { request, gql } from 'graphql-request'
const { empiur, kaurv, offshoreID } = require('../config.json')
import * as x from '../exports';

function thousands_separators(num: number) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

export default {
    category: 'Banking',
    description: `Viewing the alliance bank!`,

    slash: true,
    testOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<bank_type>',
    options: [
        {
            name: 'bank_type',
            description: "Choosing which bank to view contents for!",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {
                    name: 'Weebunism',
                    value: 'weebunism'
                },
                {
                    name: `Fumo`,
                    value: 'fumo'
                }
            ],
        }
    ],

    callback: async ({ interaction }) => {

        await interaction.deferReply()

        if (interaction.options.getString('bank_type') == 'weebunism') {

            const endpoint = `https://api.politicsandwar.com/graphql?api_key=${empiur}`

            const query = gql`
            { alliances(id: 5476, first: 50)
                { data 
                    {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
              `

            const data = await request(endpoint, query)

            let embed = new x.Embed()
                .setTitle('Weebunism 🌸')
                .setDescription("Here are the contents found within Weebunism's bank!")
                .setFields([
                    { name: 'Money', value: `$${thousands_separators(data.alliances.data[0].money)}`, inline: true },
                    { name: 'Food', value: `${thousands_separators(data.alliances.data[0].food)}`, inline: true },
                    { name: 'Coal', value: `${thousands_separators(data.alliances.data[0].coal)}`, inline: true },
                    { name: 'Oil', value: `${thousands_separators(data.alliances.data[0].oil)}`, inline: true },
                    { name: 'Uranium', value: `${thousands_separators(data.alliances.data[0].uranium)}`, inline: true },
                    { name: 'Lead', value: `${thousands_separators(data.alliances.data[0].lead)}`, inline: true },
                    { name: 'Iron', value: `${thousands_separators(data.alliances.data[0].iron)}`, inline: true },
                    { name: 'Bauxite', value: `${thousands_separators(data.alliances.data[0].bauxite)}`, inline: true },
                    { name: 'Gasoline', value: `${thousands_separators(data.alliances.data[0].gasoline)}`, inline: true },
                    { name: 'Munitions', value: `${thousands_separators(data.alliances.data[0].munitions)}`, inline: true },
                    { name: 'Steel', value: `${thousands_separators(data.alliances.data[0].steel)}`, inline: true },
                    { name: 'Aluminum', value: `${thousands_separators(data.alliances.data[0].aluminum)}`, inline: true },
                ])

            await interaction.editReply({
                embeds: [embed]
            })
            return

        } else if (interaction.options.getString('bank_type') == 'fumo') {

            const endpoint = `https://api.politicsandwar.com/graphql?api_key=${kaurv}`

            const query = gql`
            { alliances(id: ${offshoreID}, first: 50)
                { data 
                    {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
              `

            const data = await request(endpoint, query)

            let embed = new x.Embed()
                .setTitle(`Offshore`)
                .setDescription("Here are the contents found within the offshore's bank!!")
                .setFields([
                    { name: 'Money', value: `$${thousands_separators(data.alliances.data[0].money)}`, inline: true },
                    { name: 'Food', value: `${thousands_separators(data.alliances.data[0].food)}`, inline: true },
                    { name: 'Coal', value: `${thousands_separators(data.alliances.data[0].coal)}`, inline: true },
                    { name: 'Oil', value: `${thousands_separators(data.alliances.data[0].oil)}`, inline: true },
                    { name: 'Uranium', value: `${thousands_separators(data.alliances.data[0].uranium)}`, inline: true },
                    { name: 'Lead', value: `${thousands_separators(data.alliances.data[0].lead)}`, inline: true },
                    { name: 'Iron', value: `${thousands_separators(data.alliances.data[0].iron)}`, inline: true },
                    { name: 'Bauxite', value: `${thousands_separators(data.alliances.data[0].bauxite)}`, inline: true },
                    { name: 'Gasoline', value: `${thousands_separators(data.alliances.data[0].gasoline)}`, inline: true },
                    { name: 'Munitions', value: `${thousands_separators(data.alliances.data[0].munitions)}`, inline: true },
                    { name: 'Steel', value: `${thousands_separators(data.alliances.data[0].steel)}`, inline: true },
                    { name: 'Aluminum', value: `${thousands_separators(data.alliances.data[0].aluminum)}`, inline: true },
                ])

            await interaction.editReply({
                embeds: [embed]
            })
            return

        }
    }
} as ICommand