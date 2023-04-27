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
        if (interaction.customId !== 'boostingApplication') return this.none();

        return this.some();
    }

    async run(interaction) {
        //Modal for Boost Application
        const options = interaction.fields.fields;
        const role = interaction.guild.roles.cache.get(options.get("roleid").value);
        const embed = new EmbedBuilder()
            .setTitle("Boosting Application")
            .setColor("Random")
            .setDescription("Use the `Confirm Request` button to send out your request.")
            .setAuthor({
                name: "LEON",
                icon_url: `https://cdn.discordapp.com/avatars/990165832564879381/641d5ee8445a97b16e5761c24eb3a0e0.png`,
            }).addFields([{
                name: "Title:",
                value: `${options.get("title").value}`
            }, {
                name: "Description:",
                value: `${options.get("description").value}`
            },
            {
                name: "Boosting Role:",
                value: `**${role.name}**`
            }, {
                name: "Created:",
                value: `<t:${Math.round(Date.now() / 1000)}:F>`
            }
            ]);
        const message = {
            embeds: [embed],
            ephemeral: true,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            style: 3,
                            custom_id: `confirmBoost`,
                            disabled: false,
                            label: "Confirm Request",
                            type: 2,
                        },
                    ],
                },
            ]
        }

        try {
            await this.container.client.users.send(interaction.user.id, message);
        } catch (e) {
            await interaction.reply(message);
        }
    }
}