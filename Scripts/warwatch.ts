const Pusher = require('pusher-js')
const { baam } = require('../config.json')

async function defwarwatch() {

    const channelName = JSON.parse(await (await fetch(`https://api.politicsandwar.com/subscriptions/v1/subscribe/war/update?api_key=${baam}&alliance_id=5476,10382`, {
        method: 'GET',
    })).text()).channel;

    const pusher = new Pusher("a22734a47847a64386c8", {
        wsHost: "socket.politicsandwar.com",
        disableStats: true,
        authEndpoint: "https://api.politicsandwar.com/subscriptions/v1/auth",
        cluster: "CLUSTER",
    });

    const channel = pusher.subscribe(channelName)

    function handler(data: any) {
        console.log(data)
    }

    channel.bind("BULK_WAR_UPDATE", handler)

    console.log("Starting subscriptions...")

}

defwarwatch()