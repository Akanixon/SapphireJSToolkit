import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';


export class ButtonHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    parse(interaction) {
        //checks if the customId is equal to the pattern
        //this file only runs it if matched
        if (!interaction.customId.match(/^button/)) return this.none();

        return this.some();
    }

    async run(interaction) {
        await interaction.reply("Thank you")
    }
}