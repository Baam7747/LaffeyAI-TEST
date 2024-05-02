import { gql, request, GraphQLClient } from 'graphql-request'
import datastore from 'nedb';
const { baam, amaya, bank, offshoreID } = require('../config.json')
var nf = new Intl.NumberFormat();



async function transferAmaya() {

    const bank_endpoint = `https://api.politicsandwar.com/graphql?api_key=${amaya}`

    const bank_query = gql`
    { alliances(id: 9745, first: 50)
        { data 
            {id, money, coal, oil, uranium, iron, bauxite, lead, gasoline, munitions, steel, aluminum, food }}}
    `

    const bank_data = await request(bank_endpoint, bank_query)

    console.log(bank_data.alliances.data)

    const endpoint = `https://api.politicsandwar.com/graphql?api_key=${amaya}`

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
        money: 1,
        coal: 0,
        oil: 0,
        uranium: 0,
        iron: 0,
        bauxite: 0,
        lead: 0,
        gasoline: 0,
        munitions: 0,
        steel: 0,
        aluminum: 0,
        food: 0,
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
        return
    }

}

transferAmaya()