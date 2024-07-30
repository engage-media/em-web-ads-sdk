import AdServiceConfig from "./adServiceConfig";

class DefaultAdServiceConfig implements AdServiceConfig {
    async fetchMetadata(): Promise<any> {
        return {
            publisherId: 'defaultPublisherId',
            channelId: 'defaultChannelId',
            gdprApproved: true
        }
    }
}

export default DefaultAdServiceConfig;