import { Listener } from '@sapphire/framework';

export class ReadyListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: false,
            event: 'messageCreate'
        });
    }
    run(client) {
        //Runs when a message gets sent
        this.container.logger.info(`messageCreate triggered`);
    }
}