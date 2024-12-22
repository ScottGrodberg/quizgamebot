import { Client, SlashCommandBuilder, GatewayIntentBits, Events } from "discord.js";
import { Utility } from "./Utility";

const { token, guildId } = require("./config.json");


type QuestionType = "MULTI_CHOICE" | "TRUE_FALSE";

interface Answer {
    text: string;
    correct: boolean;
}
class Question {
    id: string;
    text?: string;
    answers: Array<Answer>;

    constructor(public questionType: QuestionType) {
        this.id = Utility.generateUid(8);
        this.answers = new Array();
    }
}
type QuestionId = string;
type UserId = string;
type ChannelId = string;
const questions = new Map<QuestionId, Question>();
const users = new Map<UserId, Question>(); // Used to track which question the user is creating
const channels = new Map<ChannelId, Array<Question>>();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, client => {
    console.log(`Logged in as ${client.user.tag}`);

    const command = new SlashCommandBuilder()
        .setName("new")
        .setDescription("Create a new question")
        .addStringOption(option =>
            option.setName('qtype')
                .setDescription('The type of question')
                .setRequired(true)
                .addChoices(
                    { name: 'Multiple Choice', value: 'MULTI_CHOICE' },
                    { name: 'True or False', value: 'TRUE_FALSE' }
                )
        );
    client.application.commands.create(command, guildId);
});

client.on(Events.InteractionCreate, interaction => processInteraction(interaction));

client.on(Events.MessageCreate, message => { });

client.login(token);

function processInteraction(interaction: any) {
    if (interaction.commandName === "new") {

        const question = new Question(interaction.options.getString("qtype"));
        questions.set(question.id, question);

        users.set(interaction.user.id, question);

        let _questions: Array<Question> | undefined = channels.get(interaction.channelId);
        if (!_questions) {
            _questions = new Array();
            channels.set(interaction.channelId, _questions);
        }
        _questions.push(question);
        
        interaction.reply("Starting a new question");

    }

}