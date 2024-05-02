// import mongoose from 'mongoose'
// const { PNW_URL } = require('./config.json');

// mongoose.connect(PNW_URL)
//     .then((result) => console.log('Connected to PnWDatabase!'))
//     .catch(console.error)


import datastore from 'nedb';
import { gql, request } from 'graphql-request'
const { kappa } = require('./config.json')
const userInfo = new datastore({ filename: 'userInfo.db' });
import { setTimeout } from "timers/promises";

userInfo.loadDatabase((err) => { // Callback is optional

    userInfo.find({}, async (err: Error | null, docs: any[]) => {

        for (var i = 0; i < docs.length; i++) {
            if (docs[i].deposits.money != 0 ||
                docs[i].deposits.food != 0 ||
                docs[i].deposits.coal != 0 ||
                docs[i].deposits.oil != 0 ||
                docs[i].deposits.uranium != 0 ||
                docs[i].deposits.lead != 0 ||
                docs[i].deposits.iron != 0 ||
                docs[i].deposits.bauxite != 0 ||
                docs[i].deposits.gasoline != 0 ||
                docs[i].deposits.munitions != 0 ||
                docs[i].deposits.steel != 0 ||
                docs[i].deposits.aluminum != 0
            ) {
                let nationID = docs[i].nationID

                const endpoint = `https://api.politicsandwar.com/graphql?api_key=${kappa}`

                const query = gql`
                    { nations (id: ${nationID}, first: 50) 
                        { data 
                            { alliance{name}, alliance_position }}}
                            `

                const data = await request(endpoint, query)

                if ((data.nations.data[0] != null) && (data.nations.data[0].alliance != null) && ((data.nations.data[0].alliance.name != "Weebunism"))) {
                    if (data.nations.data[0].alliance.name != "Otaku Shougaku") {

                            console.log(`<@${docs[i].discordID}>`)
                    }
                }
                await setTimeout(1000);
            }
        }


    })

})
