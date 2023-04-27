import { SapphireClient, LogLevel, container } from '@sapphire/framework';
import '@sapphire/plugin-api/register';
import { GatewayIntentBits, Partials, OAuth2Scopes, Collection } from 'discord.js';
import config from "config";

const client = new SapphireClient({
    defaultPrefix: config.prefix,
    caseInsensitiveCommands: true,
    logger: {
        level: LogLevel.Info
    },
    shards: 'auto',
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
    partials: [Partials.Channel],
    loadMessageCommandListeners: false,
    hmr: {
        enabled: true
    }
});

client.login(config.get("discord.token"));

//set the Status
setInterval(async () => {
    client.user.setActivity(`I'M BACK on ${container.client.guilds.cache.map(guild => guild.id).length} servers`, { type: 0 });
}, 10 * 60 * 1000);