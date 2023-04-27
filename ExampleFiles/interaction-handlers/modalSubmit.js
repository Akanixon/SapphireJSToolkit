import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';

export class ModalHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.ModalSubmit
        });
    }

    parse(interaction) {
        //checks if the custonId is not equal to modalSubmit
        //this file only runs if the customId is equal to modalSubmit
        if (interaction.customId !== 'modalSubmit') return this.none();

        return this.some();
    }

    async run(interaction) {
        //creates a list of all fields inside the modal that has been submitted
        const options = interaction.fields.fields;
        //you can retrieve the userinput by doing options.get("fieldname").value
        console.log(options.get("reason").value)
        //ephemeral means: the reply is only visible to the user that triggered this event
        await interaction.reply({content:"Boost offer sent.",ephemeral:true});
    }
}