import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Answer, Data } from "../Data";
import { ICommand } from "./ICommand";

export class CommandA implements ICommand {
    public commandName = "a";

    constructor(public data: Data) { }

    getCommand(): any {
        const command = new SlashCommandBuilder()
            .setName(this.commandName)
            .setDescription("Add an answer")
            .addStringOption(option =>
                option.setName('text')
                    .setDescription('The text of the answer')
                    .setRequired(true)
            ).addBooleanOption(option =>
                option.setName('correct')
                    .setDescription('Is the answer correct?')
                    .setRequired(true)
            );
        return command;
    }

    processCommand(interaction: ChatInputCommandInteraction): void {
        const text = interaction.options.getString("text")!;
        const correct = interaction.options.getBoolean("correct")!;
        const answer = new Answer(text, correct);
        const question = this.data.users.get(interaction.user.id);
        if (!question) {
            interaction.reply("Could not find a current question. Create one before adding answers");
            return;
        }
        question.answers.push(answer);

        interaction.reply(`Added. Question ${question.id} now has ${question.answers.length} answers`);
    }

}