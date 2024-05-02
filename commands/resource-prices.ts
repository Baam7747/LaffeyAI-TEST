import { ICommand } from "wokcommands";
import { request, gql } from 'graphql-request'
const { baam } = require('../config.json')
var nf = new Intl.NumberFormat();
import * as x from '../exports';

export default {
    category: 'Utility',
    description: 'Displaying the price and profit margin for each resource!',

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        if (interaction) {

            await interaction.deferReply()

            const endpoint = `https://api.politicsandwar.com/graphql?api_key=${baam}`

            const query = gql`
            { tradeprices(first: 50)
                { data 
                    {food, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum}}}
                    `

            const data = await request(endpoint, query)

            const food_price = data.tradeprices.data[0].food
            const coal_price = data.tradeprices.data[0].coal
            const oil_price = data.tradeprices.data[0].oil
            const uranium_price = data.tradeprices.data[0].uranium
            const iron_price = data.tradeprices.data[0].iron
            const bauxite_price = data.tradeprices.data[0].bauxite
            const lead_price = data.tradeprices.data[0].lead
            const gasoline_price = data.tradeprices.data[0].gasoline
            const munitions_price = data.tradeprices.data[0].munitions
            const steel_price = data.tradeprices.data[0].steel
            const aluminum_price = data.tradeprices.data[0].aluminum

            let embed = new x.Embed()
                .setTitle('Resource Prices & Profit Margins!')
                .setDescription(`It's assumed that you have the necessary projects for each resource and the maximum number of improvements in each city for said resource. Values are for each individual improvement.`)
                .setFields([
                    { name: 'Coal', value: `Market Value: $${nf.format(coal_price)} \nGross Value: $${nf.format((coal_price * 45) / 10)} \nTotal Upkeep: $4,000 \nNet Value: **$${nf.format(((coal_price * 45) - 4000) / 10)}**`, inline: true },
                    { name: 'Oil', value: `Market Value: $${nf.format(oil_price)} \nGross Value: $${nf.format((oil_price * 45) / 10)} \nTotal Upkeep: $6,000 \nNet Value: **$${nf.format(((oil_price * 45) - 6000) / 10)}**`, inline: true },
                    { name: 'Iron', value: `Market Value: $${nf.format(iron_price)} \nGross Value: $${nf.format((iron_price * 45) / 10)} \nTotal Upkeep: $16,000 \nNet Value: **$${nf.format(((iron_price * 45) - 16000) / 10)}**`, inline: true },
                    { name: 'Bauxite', value: `Market Value: $${nf.format(bauxite_price)} \nGross Value: $${nf.format((bauxite_price * 45) / 10)} \nTotal Upkeep: $16,000 \nNet Value: **$${nf.format(((bauxite_price * 45) - 16000) / 10)}**`, inline: true },
                    { name: 'Lead', value: `Market Value: $${nf.format(lead_price)} \nGross Value: $${nf.format((lead_price * 45) / 10)} \nTotal Upkeep: $15,000 \nNet Value: **$${nf.format(((lead_price * 45) - 15000) / 10)}**`, inline: true },
                    { name: 'Uranium', value: `Market Value: $${nf.format(uranium_price)} \nGross Value: $${nf.format((uranium_price * 22.5) / 5)} \nTotal Upkeep: $25,000 \nNet Value: **$${nf.format(((uranium_price * 22.5) - 25000) / 5)}**`, inline: true },
                    { name: 'Food (4000 land)', value: `Market Value: $${nf.format(food_price)} \nGross Value: $${nf.format((food_price * 2400) / 20)} \nTotal Upkeep: $6,000 \nNet Value: **$${nf.format(((food_price * 1800) - 6000) / 20)}**`, inline: true },
                    { name: 'Food (5000 land)', value: `Market Value: $${nf.format(food_price)} \nGross Value: $${nf.format((food_price * 3000) / 20)} \nTotal Upkeep: $6,000 \nNet Value: **$${nf.format(((food_price * 2400) - 6000) / 20)}**`, inline: true },
                    { name: 'Gasoline', value: `Market Value: $${nf.format(gasoline_price)} \nGross Value: $${nf.format((gasoline_price * 90) / 5)} \nTotal Upkeep: $20,000 \nRaw Costs: $${nf.format((oil_price * 45) / 5)} \nNet Value: **$${nf.format(((gasoline_price * 90) - (oil_price * 45) - 20000) / 5)}**`, inline: true },
                    { name: 'Steel', value: `Market Value: $${nf.format(steel_price)} \nGross Value: $${nf.format((steel_price * 91.8) / 5)} \nTotal Upkeep: $20,000 \nRaw Costs: $${nf.format(((coal_price * 30.6) + (iron_price * 30.6)) / 5)} \nNet Value: **$${nf.format(((steel_price * 91.8) - ((coal_price * 30.6) + (iron_price * 30.6)) - 20000) / 5)}**`, inline: true },
                    { name: 'Aluminum', value: `Market Value: $${nf.format(aluminum_price)} \nGross Value: $${nf.format((aluminum_price * 91.8) / 5)} \nTotal Upkeep: $12,500 \nRaw Costs: $${nf.format((bauxite_price * 30.6) / 5)} \nNet Value: **$${nf.format(((aluminum_price * 91.8) - (bauxite_price * 30.6) - 12500) / 5)}**`, inline: true },
                    { name: 'Munitions', value: `Market Value: $${nf.format(munitions_price)} \nGross Value: $${nf.format((munitions_price * 180.9) / 5)} \nTotal Upkeep: $17,500 \nRaw Costs: $${nf.format((lead_price * 60.3) / 5)} \nNet Value: **$${nf.format(((munitions_price * 180.9) - (lead_price * 60.3) - 17500) / 5)}**`, inline: true },
                ])

            await interaction.editReply({
                embeds: [embed]
            })

        }
    },
} as ICommand