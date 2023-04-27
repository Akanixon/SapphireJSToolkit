import { Command, container } from '@sapphire/framework';

export class SlashCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: 'advancedCommand'
        });
    }
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            return builder.setName(this.name)
                .setDescription(this.description)
                //role select option
                .addRoleOption(option =>
                    option.setName("targetrole")
                    .setDescription("select a role to target")
                    .setRequired(true))
                //text input option
                .addStringOption(option =>
                    option.setName("money")
                    .setDescription("Where is my money")
                    .setRequired(false))
        });
    }
    async chatInputRun(interaction) {
        //makes all selected options available as array [{},{}] 
        const options = interaction.options["_hoistedOptions"];
        //looks for the option called money
        let money = options.find(option => option.name =="money")
        await interaction.reply("Hi");
    }
}