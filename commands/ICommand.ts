import { Interaction, SlashCommandBuilder } from "discord.js";

export interface ICommand {
    getCommand() : SlashCommandBuilder;
    processCommand(interaction:Interaction) : void;
}