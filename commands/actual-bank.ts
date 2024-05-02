import { ICommand } from "wokcommands";
import { request, gql } from 'graphql-request'
const { baam, kaurv, offshoreID } = require('../config.json')
var nf = new Intl.NumberFormat();
import datastore from 'nedb';
const userInfo = new datastore({ filename: 'userInfo.db' });
import * as x from '../exports';

export default {
    category: 'Utility',
    description: 'Calculating how much the bank actually has after deposits!',

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {

        await interaction.deferReply()

        const bank_endpoint = `https://api.politicsandwar.com/graphql?api_key=${baam}`

        const bank_query = gql`
                { alliances(id: 5476, first: 50)
                    { data 
                        {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
                `

        const bank_data = await request(bank_endpoint, bank_query)

        const endpoint = `https://api.politicsandwar.com/graphql?api_key=${kaurv}`

        const query = gql`
                { alliances(id: ${offshoreID}, first: 50)
                    { data 
                        {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
                `

        const data = await request(endpoint, query)

        userInfo.loadDatabase(async (err) => {    // Callback is optional

            userInfo.find({}, async (err: Error | null, docs: any[]) => {

                var money = 0
                var food = 0
                var coal = 0
                var oil = 0
                var uranium = 0
                var lead = 0
                var iron = 0
                var bauxite = 0
                var gasoline = 0
                var munitions = 0
                var steel = 0
                var aluminum = 0
                for (var i = 0; i < docs.length; i++) {
                    money += parseInt(docs[i].deposits.money);
                    food += parseInt(docs[i].deposits.food);
                    coal += parseInt(docs[i].deposits.coal);
                    oil += parseInt(docs[i].deposits.oil);
                    uranium += parseInt(docs[i].deposits.uranium);
                    lead += parseInt(docs[i].deposits.lead);
                    iron += parseInt(docs[i].deposits.iron);
                    bauxite += parseInt(docs[i].deposits.bauxite);
                    gasoline += parseInt(docs[i].deposits.gasoline);
                    munitions += parseInt(docs[i].deposits.munitions);
                    steel += parseInt(docs[i].deposits.steel);
                    aluminum += parseInt(docs[i].deposits.aluminum);
                }

                let embed = new x.Embed()
                    .setTitle('Actual Alliance Bank Values')
                    .setDescription(`Here's how much of the bank that actually belongs to the alliance!`)
                    .setFields([
                        { name: 'Money', value: `$${nf.format((bank_data.alliances.data[0].money + data.alliances.data[0].money) - money)}`, inline: true },
                        { name: 'Food', value: `${nf.format((bank_data.alliances.data[0].food + data.alliances.data[0].food) - food)}`, inline: true },
                        { name: 'Coal', value: `${nf.format((bank_data.alliances.data[0].coal + data.alliances.data[0].coal) - coal)}`, inline: true },
                        { name: 'Oil', value: `${nf.format((bank_data.alliances.data[0].oil + data.alliances.data[0].oil) - oil)}`, inline: true },
                        { name: 'Uranium', value: `${nf.format((bank_data.alliances.data[0].uranium + data.alliances.data[0].uranium) - uranium)}`, inline: true },
                        { name: 'Lead', value: `${nf.format((bank_data.alliances.data[0].lead + data.alliances.data[0].lead) - lead)}`, inline: true },
                        { name: 'Iron', value: `${nf.format((bank_data.alliances.data[0].iron + data.alliances.data[0].iron) - iron)}`, inline: true },
                        { name: 'Bauxite', value: `${nf.format((bank_data.alliances.data[0].bauxite + data.alliances.data[0].bauxite) - bauxite)}`, inline: true },
                        { name: 'Gasoline', value: `${nf.format((bank_data.alliances.data[0].gasoline + data.alliances.data[0].gasoline) - gasoline)}`, inline: true },
                        { name: 'Munitions', value: `${nf.format((bank_data.alliances.data[0].munitions + data.alliances.data[0].munitions) - munitions)}`, inline: true },
                        { name: 'Steel', value: `${nf.format((bank_data.alliances.data[0].steel + data.alliances.data[0].steel) - steel)}`, inline: true },
                        { name: 'Aluminum', value: `${nf.format((bank_data.alliances.data[0].aluminum + data.alliances.data[0].aluminum) - aluminum)}`, inline: true },
                    ])

                await interaction.editReply({
                    embeds: [embed]
                })
                return
            })
        })
    },
} as ICommand