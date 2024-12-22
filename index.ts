import { Client, SlashCommandBuilder, GatewayIntentBits, Events } from "discord.js";

const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, (client:Client)=> {
    console.log(`Logged in as ${client.user?.tag}`);

    const slashCommandPing = new SlashCommandBuilder().setName("ping").setDescription("Replies with pong").toJSON();
    client.application?.commands.create(slashCommandPing, "1008709138110488586").then(acs => {
        console.log(acs);
    });
});

client.on(Events.InteractionCreate, interaction => {
    console.log(interaction);
});

client.on(Events.MessageCreate, message => {
    console.log(message);
});

client.login(token);