import { ICommand } from "wokcommands";
import DiscordJS from 'discord.js';
import * as x from '../exports';
var nf = new Intl.NumberFormat();

export default {
    category: 'Utility',
    description: 'Calculating the cost of cities and their infra!',

    slash: true,
    testOnly: true,
    minArgs: 3,
    maxArgs: 8,
    expectedArgs: '<city> && <infra> && <land>',

    options: [
        {
            name: "city",
            description: "The city you're trying to build",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "infrastructure",
            description: "The amount on infrastructure you want",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "land",
            description: "The amount on land you want",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "urban_planning",
            description: "True or False",
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        },
        {
            name: "advanced_urban_planning",
            description: "True or False",
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        },
        {
            name: "metro_planning",
            description: "True or False",
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        },
        {
            name: "manifest_destiny",
            description: "True or False",
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        },
        {
            name: "gov_support_agency",
            description: "True or False",
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        },

    ],

    callback: async ({ interaction }) => {

        let city = interaction.options.getNumber('city')!
        let infra = interaction.options.getNumber('infrastructure')!
        let land = interaction.options.getNumber('land')!

        function round(num: number) {
            return Math.round(num * 100) / 100;
        }

        function landPrice(amount: number) {
            return (.002 * (amount - 20) * (amount - 20)) + 50;
        }

        function infraPrice(amount: number) {
            return (Math.pow(Math.abs(amount - 10), 2.2) / 710) + 300;
        }

        function calcInfraValue(starting_amount: number, ending_amount: number): any {

            //set some vars
            let value = 0;
            let cost_of_chunk = 0;

            //round values to nearest 2 decimals
            let starting_amount1 = round(starting_amount);
            let ending_amount2 = round(ending_amount);

            //check difference between amounts
            let difference = ending_amount2 - starting_amount1;

            //cap out at 10,000 to prevent script running forever
            if (difference > 10000) {
                return "Error";
            }

            //if values are the same, no need to continue
            if (difference === 0) {
                let value = 0;
                return value;
            }

            //if values are not the same, we need to make sure that the starting amount is smaller than the ending amount
            if (difference < 0) {
                let infraPrice = 150;
                let value = infraPrice * difference;
                return value;
            }

            //break into chunks of 100, and get the price
            if ((difference > 100) && (difference % 100 == 0)) {

                let cost_of_chunk = round(infraPrice(starting_amount1)) * 100;
                //recursively get value of next chunk
                value += (cost_of_chunk + calcInfraValue((starting_amount1 + 100), ending_amount2));
                return value;
            }

            //see if the amount left is not divisible by 100 but greater than 100
            if ((difference > 100) && (difference % 100 != 0)) {

                cost_of_chunk = round(infraPrice(starting_amount1)) * (difference % 100);
                //recursively get value of next chunk
                value += (cost_of_chunk + calcInfraValue((starting_amount1 + (difference % 100)), ending_amount2));
                return value;
            }

            //if there's less or equal to 100 left, just add that. No need for recursion
            if (difference <= 100) {
                cost_of_chunk = round(infraPrice(starting_amount1)) * difference;
                value += cost_of_chunk;
                return value;
            }
        }

        function calcLandValue($starting_amount: number, $ending_amount: number): any {

            //set some vars
            let value = 0;
            let cost_of_chunk = 0;

            //round values to nearest 2 decimals
            let starting_amount = round($starting_amount);
            let ending_amount = round($ending_amount);

            //check difference between amounts
            let difference = ending_amount - starting_amount;

            //cap out at 10,000 to prevent script running forever
            if (difference > 10000) {
                return "Error";
            }

            //if values are the same, no need to continue
            if (difference == 0) {
                let value = 0;
                return value;
            }

            //if values are not the same, we need to make sure that the starting amount is smaller than the ending amount
            if (difference < 0) {
                let landPrice = 50;
                let value = landPrice * difference;
                return value;
            }

            //break into chunks of 500, and get the price
            if ((difference > 500) && (difference % 500 == 0)) {

                let cost_of_chunk = round(landPrice(starting_amount)) * 500;
                //recursively get value of next chunk
                value += (cost_of_chunk + calcLandValue((starting_amount + 500), ending_amount));
                return value;

            }

            //see if the amount left is not divisible by 500 but greater than 500
            if ((difference > 500) && (difference % 500 != 0)) {

                let cost_of_chunk = round(landPrice(starting_amount)) * (difference % 500);
                //recursively get value of next chunk
                value += (cost_of_chunk + calcLandValue((starting_amount + (difference % 500)), ending_amount));
                return value;

            }

            //if there's less or equal to 500 left, just add that. No need for recursion
            if (difference <= 500) {
                let cost_of_chunk = round(landPrice(starting_amount)) * difference;
                value += cost_of_chunk;
                return value;
            }
        }

        function calcCityValue(desired_city: number): any {

            if (!Number.isInteger(desired_city)) {
                return "Error! The number isn't an integer!"
            }

            if (Number.isInteger(desired_city)) {
                let x = (desired_city - 1)
                let city = 50000 * (x - 1) ** 3 + 150000 * x + 75000
                return city
            }
        }

        let cityCost = calcCityValue(city)
        let infraCost = calcInfraValue(10, infra)
        let landCost = calcLandValue(250, land)

        if ((interaction.options.getBoolean('urban_planning')! == true) && city >= 11) {
            cityCost = cityCost - 50000000
            console.log(1)

            if ((interaction.options.getBoolean('advanced_urban_planning')! == true) && city >= 16) {
                cityCost = cityCost - 100000000
                console.log(2)

                if ((interaction.options.getBoolean('metro_planning')! == true) && city >= 21) {
                    cityCost = cityCost - 150000000
                    console.log(3)

                    if ((interaction.options.getBoolean('manifest_destiny')! == true) && (interaction.options.getBoolean('gov_support_agency')! !== true)) {
                        cityCost = cityCost * 0.950
                        console.log(4)

                    } else if ((interaction.options.getBoolean('manifest_destiny')! == true) && (interaction.options.getBoolean('gov_support_agency')! == true)) {
                        cityCost = cityCost * 0.925
                        console.log(5)

                    }
                }
            }
        }

        let embed = new x.Embed()
            .setTitle('City Calculator')
            .setDescription("Here's how much your new city would cost!")
            .setFields([
                { name: 'City', value: `$${nf.format(cityCost)}`, inline: true },
                { name: 'Infrastructure', value: `$${nf.format(infraCost)}`, inline: true },
                { name: 'Land', value: `$${nf.format(landCost)}`, inline: true },
                { name: 'Total Cost', value: `$${nf.format(cityCost + infraCost + landCost)}`, inline: true },
            ])

        await interaction.reply({
            embeds: [embed]
        })
        return

    },
} as ICommand