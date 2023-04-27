import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    parse(interaction) {
        if (!interaction.customId.match(/^boost_/)) return this.none();

        return this.some();
    }

    async run(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('offerBoost')
            .setTitle('Offer Boost');


        // Add components to modal

        // Create the text input components
        const characterClass = new TextInputBuilder()
            .setCustomId('reason')
            // The label is the prompt the user sees for this input
            .setLabel("Reason")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const row1 = new ActionRowBuilder().addComponents(characterClass);

        // Add inputs to the modal
        modal.addComponents(row1);

        // Show the modal to the user
        await interaction.showModal(modal);
    }
}