import { Command, container } from '@sapphire/framework';

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
        //sends a reply
        await interaction.reply("Hi");
        //if you are unsure how the payload looks like:
        console.log(interaction);
    }
}