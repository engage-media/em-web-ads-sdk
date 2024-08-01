import AdServiceConfig from "./adServiceConfig";

// Make the class implement the AdServiceConfig interface
// And take in as parameters the publisherId, channelId, and gdprApproved
// Return the parameters in the fetchMetadata method
// Return the default values for the parameters


class DefaultAdServiceConfig implements AdServiceConfig {
    constructor(
        private publisherId: string = 'defaultPublisherId',
        private channelId: string = 'defaultChannelId',
        private gdprApproved: boolean = false
    ) { }
    async fetchMetadata(): Promise<any> {
        return {
            publisherId: this.publisherId,
            channelId: this.channelId,
            gdprApproved: this.gdprApproved
        }
    }
}

export default DefaultAdServiceConfig;