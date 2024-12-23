import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Data, Question, QuestionType } from "../Data";
import { ICommand } from "./ICommand";

export class CommandQ implements ICommand {
    public commandName = "q";

    constructor(public data: Data) { }

    getCommand(): any {
        const command = new SlashCommandBuilder()
            .setName(this.commandName)
            .setDescription("Create a new question")
            .addStringOption(option =>
                option.setName('qtype')
                    .setDescription('The type of question')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Multiple Choice', value: 'MULTI_CHOICE' },
                        { name: 'True or False', value: 'TRUE_FALSE' }
                    )
            ).addStringOption(option =>
                option.setName('text')
                    .setDescription('The text of the question')
                    .setRequired(true)
            );
        return command;
    }

    processCommand(interaction: ChatInputCommandInteraction): void {
        const qType = interaction.options.getString("qtype")! as QuestionType;
        const text = interaction.options.getString("text")!;
        const question = new Question(qType, text);
        this.data.questions.set(question.id, question);

        this.data.users.set(interaction.user.id, question);

        let _questions: Array<Question> | undefined = this.data.channels.get(interaction.channelId);
        if (!_questions) {
            _questions = new Array();
            this.data.channels.set(interaction.channelId, _questions);
        }
        _questions.push(question);

        interaction.reply("Starting a new question");
    }

}