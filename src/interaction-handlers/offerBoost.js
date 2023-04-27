import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

export class ModalHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.ModalSubmit
        });
    }

    parse(interaction) {
        if (interaction.customId !== 'offerBoost') return this.none();

        return this.some();
    }

    async run(interaction) {
        const options = interaction.fields.fields;

        const channel = interaction.message.components[0].components[0].data.custom_id.replace("boost_","");
        
        const embed = new EmbedBuilder()
            .setTitle("New Boost offer")
            .setColor("Random")
            .setDescription(`<@${interaction.user.id}> would like to boost you:\n\`${options.get("reason").value}\``)
            .setAuthor({
                name: "LEON",
                icon_url: `https://cdn.discordapp.com/avatars/990165832564879381/641d5ee8445a97b16e5761c24eb3a0e0.png`,
            });
        const message = {
            embeds: [embed],
            ephemeral: false,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            style: 3,
                            custom_id: `acceptBoost`,
                            disabled: false,
                            label: "Accept",
                            type: 2,
                        },
                    ],
                },
            ]
        }
        const boostChannel = await interaction.guild.channels.cache.get(channel);
        await boostChannel.send(message);
        await interaction.reply({content:"Boost offer sent.",ephemeral:true});
    }
}