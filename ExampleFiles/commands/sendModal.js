import { Command, container } from '@sapphire/framework';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export class SlashCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: 'simpleCommand'
        });
    }
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            return builder.setName(this.name) // this.name is equal to the filename excluding .js
                .setDescription(this.description)
        });
    }
    async chatInputRun(interaction) {
         // Sets up model for boosting application
         const modal = new ModalBuilder()
         .setCustomId('boostingApplication')
         .setTitle('Boosting Application');


     // Add components to modal

     // Create the text input components
     const title = new TextInputBuilder()
         .setCustomId('title')
         // The label is the prompt the user sees for this input
         .setLabel("Title")
         // Short means only a single line of text
         .setStyle(TextInputStyle.Short);

     const description = new TextInputBuilder()
         .setCustomId('description')
         .setLabel("Description")
         // Paragraph means multiple lines of text.
         .setStyle(TextInputStyle.Paragraph);
     // An action row only holds one text input,
     // so you need one action row per text input.
     const firstActionRow = new ActionRowBuilder().addComponents(title);
     const secondActionRow = new ActionRowBuilder().addComponents(description);

     // Add inputs to the modal
     modal.addComponents(firstActionRow, secondActionRow, thridActionRow);

     // Show the modal to the user
     await interaction.showModal(modal);

    }
}