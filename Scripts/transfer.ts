import datastore from 'nedb';
const userInfo = new datastore({ filename: 'userInfo.db' });
const deposits = new datastore({ filename: 'deposits.db' });

userInfo.loadDatabase((err) => {

    deposits.loadDatabase((err) => {

        deposits.find({}, (err: Error | null, docs: any[]) => {

            for (var i = 0; i < docs.length; i++) {

                console.log(`Commencing deposits transfer of ${docs[i].identification}.`)

                let money1 = docs[i].cash
                let food1 = docs[i].food
                let coal1 = docs[i].coal
                let oil1 = docs[i].oil
                let uranium1 = docs[i].ura
                let lead1 = docs[i].lead
                let iron1 = docs[i].iron
                let bauxite1 = docs[i].baux
                let gasoline1 = docs[i].gas
                let munitions1 = docs[i].muni
                let steel1 = docs[i].steel
                let aluminum1 = docs[i].alum

                userInfo.update({ discordID: docs[i].identification },
                    {
                        $set: {
                            deposits: {
                                money: money1,
                                coal: coal1,
                                oil: oil1,
                                uranium: uranium1,
                                lead: lead1,
                                iron: iron1,
                                bauxite: bauxite1,
                                gasoline: gasoline1,
                                munitions: munitions1,
                                steel: steel1,
                                aluminum: aluminum1,
                                food: food1
                            }
                        }
                    },
                    { multi: false },
                    (err: Error | null, numReplaced: number) => { });

            }
        })
    })
})