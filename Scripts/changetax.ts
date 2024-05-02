import { gql, GraphQLClient } from 'graphql-request'
const { baam } = require('../config.json')
const { bank } = require('../config.json')



async function changetax() {
    const endpoint = `https://api.politicsandwar.com/graphql?api_key=${baam}`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            ["X-Bot-Key"]: bank,
            ["X-Api-Key"]: baam,
        },
    })

    const query = gql
        `mutation { 
            assignTaxBracket (
                id: 141186,
                target_id: 15499
              )
        {id, date}
    }`

    try {
        const data = await graphQLClient.request(query)
        console.log(data)
    } catch (error) {
        console.error(JSON.stringify(error))
        let errorMsg = JSON.stringify(error)
        let onlyMsg = JSON.parse(errorMsg)

        console.log(onlyMsg.response.errors[0].message)
        return
    }
}

changetax()