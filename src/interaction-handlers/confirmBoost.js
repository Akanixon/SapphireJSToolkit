import { InteractionHandler, InteractionHandlerTypes, container } from '@sapphire/framework';
import { EmbedBuilder, ChannelType, PermissionsBitField, Component } from 'discord.js';
import { nanoid } from 'nanoid';

export class ButtonHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }
    
    parse(interaction) {
        if (interaction.customId != "confirmBoost") return this.none();

        return this.some();
    }
    
    async run(interaction) {
        //Submit Boost Application for Admins to review

        const id = nanoid(6);
        await interaction.reply(`Thank you for sending your boosting Application.\nYour id is: **${id}**`);
        const embed = new EmbedBuilder()
            .setTitle(`New Boosting Request #${id}`)
            .setDescription(`From user: <@${interaction.user.id}> (**${interaction.user.id}**)`)
            .setFields(interaction.message.embeds[0].fields);

        const guild = this.container.client.guilds.cache.get("836159657705603094");

        const newChannel = await guild.channels.create({ name: id, type: ChannelType.GuildText, parent: "836165403918598155", permissionOverwrites: [{ id: guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] }] });

        await newChannel.send({
            embeds: [embed],
            components: [{
                type: 1,
                components: [{
                    style: 3,
                    custom_id: `approveBoostRequest`,
                    disabled: false,
                    label: `Approve Boost`,
                    type: 2,
                },
                {
                    style: 3,
                    custom_id: `rejectBoostRequest`,
                    disabled: false,
                    label: `Reject Boost`,
                    type: 2,
                }]
            }]
        });
        /*
        const boostChannel = await guild.channels.cache.get("1100552680549658645");
        await boostChannel.send({
            embeds: [embed],
            components: [{
                type: 1,
                components: [
                    {
                        style: 3,
                        custom_id: `boost_${newChannel.id}`,
                        disabled: false,
                        label: `Boost ${id}`,
                        type: 2,
                    }
                ]
            }]
        })
        */
    }
}