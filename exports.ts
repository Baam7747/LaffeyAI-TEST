import DiscordJS, { TextChannel } from 'discord.js'
import { client } from './index'
import * as x from './exports';
import { gql, request, GraphQLClient } from 'graphql-request'
import datastore from 'nedb';
const Pusher = require('pusher-js')
const { empiur, baam, amaya, bank, offshoreID } = require('./config.json')
const userInfo = new datastore({ filename: 'userInfo.db' });
var nf = new Intl.NumberFormat();

function money_round(num: number) {
    return Math.ceil(num * 100) / 100;
}

class Embed extends DiscordJS.MessageEmbed {
    constructor(options?: DiscordJS.MessageEmbedOptions) {
        super(options);
        this.setTimestamp()
        this.setColor('#0099ff')
        this.setFooter({
            text: 'LaffeyAI',
            iconURL: `${client.user!.avatarURL()}`
        })
    }
}

async function transferBank() {

    const messageChannel = client.channels.cache.get('1088944145516740709') as TextChannel;

    const bank_endpoint = `https://api.politicsandwar.com/graphql?api_key=${empiur}`

    const bank_query = gql`
    { alliances(id: 5476, first: 50)
        { data 
            {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
    `

    const bank_data = await request(bank_endpoint, bank_query)

    const endpoint = `https://api.politicsandwar.com/graphql?api_key=${empiur}`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            ["X-Bot-Key"]: bank,
            ["X-Api-Key"]: baam,
        },
    })

    const query = gql
        `mutation { 
        bankWithdraw(receiver_type: 2, 
        receiver: ${offshoreID},
        money: ${money_round(bank_data.alliances.data[0].money)},
        coal: ${money_round(bank_data.alliances.data[0].coal)},
        oil: ${money_round(bank_data.alliances.data[0].oil)},
        uranium: ${money_round(bank_data.alliances.data[0].uranium)},
        iron: ${money_round(bank_data.alliances.data[0].iron)},
        bauxite: ${money_round(bank_data.alliances.data[0].bauxite)},
        lead: ${money_round(bank_data.alliances.data[0].lead)},
        gasoline: ${money_round(bank_data.alliances.data[0].gasoline)},
        munitions: ${money_round(bank_data.alliances.data[0].munitions)},
        steel: ${money_round(bank_data.alliances.data[0].steel)},
        aluminum: ${money_round(bank_data.alliances.data[0].aluminum)},
        food: ${money_round(bank_data.alliances.data[0].food)},
        note: "Main to offshore transfer")
        {id, date}
            }`

    try {
        const data = await graphQLClient.request(query)
        console.log(data)
    } catch (error) {
        console.error(JSON.stringify(error))
        let errorMsg = JSON.stringify(error)
        let onlyMsg = JSON.parse(errorMsg)

        let embed = new x.Embed()
            .setTitle('Error!')
            .setDescription(`Something went wrong with the withdrawal!\n\nError Message: ${onlyMsg.response.errors[0].message}`)

        await messageChannel.send({
            embeds: [embed],
        })
        return
    }

    let embed1 = new x.Embed()
        .setTitle('Withdrawal')
        .setDescription(`The main bank to offshore (${offshoreID}) transfer was successful! Here's the transfer information.`)
        .setFields([
            { name: 'Money', value: `$${nf.format(bank_data.alliances.data[0].money)}`, inline: true },
            { name: 'Food', value: `${nf.format(bank_data.alliances.data[0].food)}`, inline: true },
            { name: 'Coal', value: `${nf.format(bank_data.alliances.data[0].coal)}`, inline: true },
            { name: 'Oil', value: `${nf.format(bank_data.alliances.data[0].oil)}`, inline: true },
            { name: 'Uranium', value: `${nf.format(bank_data.alliances.data[0].uranium)}`, inline: true },
            { name: 'Lead', value: `${nf.format(bank_data.alliances.data[0].lead)}`, inline: true },
            { name: 'Iron', value: `${nf.format(bank_data.alliances.data[0].iron)}`, inline: true },
            { name: 'Bauxite', value: `${nf.format(bank_data.alliances.data[0].bauxite)}`, inline: true },
            { name: 'Gasoline', value: `${nf.format(bank_data.alliances.data[0].gasoline)}`, inline: true },
            { name: 'Munitions', value: `${nf.format(bank_data.alliances.data[0].munitions)}`, inline: true },
            { name: 'Steel', value: `${nf.format(bank_data.alliances.data[0].steel)}`, inline: true },
            { name: 'Aluminum', value: `${nf.format(bank_data.alliances.data[0].aluminum)}`, inline: true },
        ])

    await messageChannel.send({
        embeds: [embed1],
    })
    return
}

async function transferAmaya() {

    const messageChannel = client.channels.cache.get('1088944145516740709') as TextChannel;

    const bank_endpoint = `https://api.politicsandwar.com/graphql?api_key=${amaya}`

    const bank_query = gql`
    { alliances(id: 9745, first: 50)
        { data 
            {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
    `

    const bank_data = await request(bank_endpoint, bank_query)

    const endpoint = `https://api.politicsandwar.com/graphql?api_key=${amaya}`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            ["X-Bot-Key"]: bank,
            ["X-Api-Key"]: baam,
        },
    })

    console.log(bank_data.alliances.data[0].money)

    const query = gql
        `mutation { 
        bankWithdraw(receiver_type: 2, 
        receiver: ${offshoreID},
        money: ${money_round(bank_data.alliances.data[0].money)},
        coal: ${money_round(bank_data.alliances.data[0].coal)},
        oil: ${money_round(bank_data.alliances.data[0].oil)},
        uranium: ${money_round(bank_data.alliances.data[0].uranium)},
        iron: ${money_round(bank_data.alliances.data[0].iron)},
        bauxite: ${money_round(bank_data.alliances.data[0].bauxite)},
        lead: ${money_round(bank_data.alliances.data[0].lead)},
        gasoline: ${money_round(bank_data.alliances.data[0].gasoline)},
        munitions: ${money_round(bank_data.alliances.data[0].munitions)},
        steel: ${money_round(bank_data.alliances.data[0].steel)},
        aluminum: ${money_round(bank_data.alliances.data[0].aluminum)},
        food: ${money_round(bank_data.alliances.data[0].food)},
        note: "Amaya to offshore transfer")
        {id, date}
            }`

    try {
        const data = await graphQLClient.request(query)
        console.log(data)
    } catch (error) {
        console.error(JSON.stringify(error))
        let errorMsg = JSON.stringify(error)
        let onlyMsg = JSON.parse(errorMsg)

        let embed = new x.Embed()
            .setTitle('Error!')
            .setDescription(`Something went wrong with the withdrawal for Amaya!\n\nError Message: ${onlyMsg.response.errors[0].message}`)

        await messageChannel.send({
            embeds: [embed],
        })
        return
    }


    userInfo.loadDatabase((err) => { // Callback is optional

        userInfo.find({ discordID: "577899610228654081" }, (err: Error | null, docs: any[]) => {

            const money1 = money_round(docs[0].deposits.money)
            const food1 = money_round(docs[0].deposits.food)
            const coal1 = money_round(docs[0].deposits.coal)
            const oil1 = money_round(docs[0].deposits.oil)
            const uranium1 = money_round(docs[0].deposits.uranium)
            const lead1 = money_round(docs[0].deposits.lead)
            const iron1 = money_round(docs[0].deposits.iron)
            const bauxite1 = money_round(docs[0].deposits.bauxite)
            const gasoline1 = money_round(docs[0].deposits.gasoline)
            const munitions1 = money_round(docs[0].deposits.munitions)
            const steel1 = money_round(docs[0].deposits.steel)
            const aluminum1 = money_round(docs[0].deposits.aluminum)

            console.log(money1)

            userInfo.update({ discordID: "577899610228654081" },
                {
                    $set: {
                        deposits: {
                            money: money_round(bank_data.alliances.data[0].money + money1),
                            coal: money_round(bank_data.alliances.data[0].coal + coal1),
                            oil: money_round(bank_data.alliances.data[0].oil + oil1),
                            uranium: money_round(bank_data.alliances.data[0].uranium + uranium1),
                            iron: money_round(bank_data.alliances.data[0].iron + iron1),
                            bauxite: money_round(bank_data.alliances.data[0].bauxite + bauxite1),
                            lead: money_round(bank_data.alliances.data[0].lead + lead1),
                            gasoline: money_round(bank_data.alliances.data[0].gasoline + gasoline1),
                            munitions: money_round(bank_data.alliances.data[0].munitions + munitions1),
                            steel: money_round(bank_data.alliances.data[0].steel + steel1),
                            aluminum: money_round(bank_data.alliances.data[0].aluminum + aluminum1),
                            food: money_round(bank_data.alliances.data[0].food + food1),
                        }
                    }
                },
                { multi: false },
                (err: Error | null, numReplaced: number) => { });
        })
    })

    let embed1 = new x.Embed()
        .setTitle('Withdrawal')
        .setDescription(`Amaya's bank to offshore (${offshoreID}) transfer was successful! Here's the transfer information.`)
        .setFields([
            { name: 'Money', value: `$${nf.format(bank_data.alliances.data[0].money)}`, inline: true },
            { name: 'Food', value: `${nf.format(bank_data.alliances.data[0].food)}`, inline: true },
            { name: 'Coal', value: `${nf.format(bank_data.alliances.data[0].coal)}`, inline: true },
            { name: 'Oil', value: `${nf.format(bank_data.alliances.data[0].oil)}`, inline: true },
            { name: 'Uranium', value: `${nf.format(bank_data.alliances.data[0].uranium)}`, inline: true },
            { name: 'Lead', value: `${nf.format(bank_data.alliances.data[0].lead)}`, inline: true },
            { name: 'Iron', value: `${nf.format(bank_data.alliances.data[0].iron)}`, inline: true },
            { name: 'Bauxite', value: `${nf.format(bank_data.alliances.data[0].bauxite)}`, inline: true },
            { name: 'Gasoline', value: `${nf.format(bank_data.alliances.data[0].gasoline)}`, inline: true },
            { name: 'Munitions', value: `${nf.format(bank_data.alliances.data[0].munitions)}`, inline: true },
            { name: 'Steel', value: `${nf.format(bank_data.alliances.data[0].steel)}`, inline: true },
            { name: 'Aluminum', value: `${nf.format(bank_data.alliances.data[0].aluminum)}`, inline: true },
        ])

    await messageChannel.send({
        embeds: [embed1],
    })
    return
}

async function attwarwatch() {

    const channelName = JSON.parse(await (await fetch(`https://api.politicsandwar.com/subscriptions/v1/subscribe/war/create?api_key=${baam}&att_alliance_id=5476,10382`, {
        method: 'GET',
    })).text()).channel;

    const pusher = new Pusher("a22734a47847a64386c8", {
        wsHost: "socket.politicsandwar.com",
        disableStats: true,
        authEndpoint: "https://api.politicsandwar.com/subscriptions/v1/auth",
        cluster: "CLUSTER",
    });

    const channel = pusher.subscribe(channelName)

    async function handler(data: any) {
        const messageChannel = client.channels.cache.get('638239140785160203') as TextChannel;

        const endpoint = `https://api.politicsandwar.com/graphql?api_key=${baam}`

        const query1 = gql`
        { nations (id: ${data[0].att_id}, first: 50) 
        { data 
          { nation_name, 
            alliance{name}, 
            num_cities, 
            score, 
            soldiers, 
            tanks, 
            aircraft, 
            ships,
            missiles,
            nukes,
            war_policy }}}
                `

        const query2 = gql`
        { nations (id: ${data[0].def_id}, first: 50) 
        { data 
          { nation_name, 
            alliance{name}, 
            num_cities, 
            score, 
            soldiers, 
            tanks, 
            aircraft, 
            ships,
            missiles,
            nukes,
            war_policy }}}
                `

        const attdata = await request(endpoint, query1)
        const defdata = await request(endpoint, query2)

        let attscore = attdata.nations.data[0].score
        let defscore = defdata.nations.data[0].score

        function attallianceNull(AA: any) {
            if (AA == null) {
                return 'None'
            } else {
                return attdata.nations.data[0].alliance.name
            }
        }

        function defallianceNull(AA: any) {
            if (AA == null) {
                return 'None'
            } else {
                return defdata.nations.data[0].alliance.name
            }
        }

        let embed = new x.Embed()
            .setTitle(`[Offensive War] - ${attallianceNull(attdata.nations.data[0].alliance)} v. ${defallianceNull(defdata.nations.data[0].alliance)} - ${data[0].war_type}`)
            .setURL(`https://politicsandwar.com/nation/war/timeline/war=${data[0].id}`)
            .setFields(
                { name: 'Attacker Name', value: `[${attdata.nations.data[0].nation_name}](https://politicsandwar.com/nation/id=${data[0].att_id})` },
                { name: 'Alliance', value: `${attallianceNull(attdata.nations.data[0].alliance)}` },
                { name: 'Cities', value: `${attdata.nations.data[0].num_cities}`, inline: true },
                { name: 'Score', value: `${attscore}`, inline: true },
                { name: 'Scores in Range', value: `${Math.round(100 * (attscore / 1.75)) / 100} - ${Math.round(100 * (attscore / 0.75)) / 100}`, inline: true },
                { name: 'Soldiers', value: `${attdata.nations.data[0].soldiers}`, inline: true },
                { name: 'Tanks', value: `${attdata.nations.data[0].tanks}`, inline: true },
                { name: 'Aircraft', value: `${attdata.nations.data[0].aircraft}`, inline: true },
                { name: 'Ships', value: `${attdata.nations.data[0].ships}`, inline: true },
                { name: 'Missiles', value: `${attdata.nations.data[0].missiles}`, inline: true },
                { name: 'Nukes', value: `${attdata.nations.data[0].nukes}`, inline: true },

                { name: 'Defender Name', value: `[${defdata.nations.data[0].nation_name}](https://politicsandwar.com/nation/id=${data[0].def_id})` },
                { name: 'Alliance', value: `${defallianceNull(defdata.nations.data[0].alliance)}` },
                { name: 'Cities', value: `${defdata.nations.data[0].num_cities}`, inline: true },
                { name: 'Score', value: `${defscore}`, inline: true },
                { name: 'Scores in Range', value: `${Math.round(100 * (defscore / 1.75)) / 100} - ${Math.round(100 * (defscore / 0.75)) / 100}`, inline: true },
                { name: 'Soldiers', value: `${defdata.nations.data[0].soldiers}`, inline: true },
                { name: 'Tanks', value: `${defdata.nations.data[0].tanks}`, inline: true },
                { name: 'Aircraft', value: `${defdata.nations.data[0].aircraft}`, inline: true },
                { name: 'Ships', value: `${defdata.nations.data[0].ships}`, inline: true },
                { name: 'Missiles', value: `${defdata.nations.data[0].missiles}`, inline: true },
                { name: 'Nukes', value: `${defdata.nations.data[0].nukes}`, inline: true },
            )
        await messageChannel.send({
            embeds: [embed],
        })
        return
    }

    console.log("Starting offensive war subscription...")

    channel.bind("BULK_WAR_CREATE", handler)

    console.log("Offensive war subscription started")


}



export {
    Embed,
    transferBank,
    attwarwatch,
    transferAmaya,
}