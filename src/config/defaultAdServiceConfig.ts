import AdServiceConfig from "./adServiceConfig";

// Make the class implement the AdServiceConfig interface
// And take in as parameters the publisherId, channelId, and gdprApproved
// Return the parameters in the fetchMetadata method
// Return the default values for the parameters


class DefaultAdServiceConfig implements AdServiceConfig {

    publisherId: string;
    channelId: string;
    gdprApproved: boolean;
    isDebug: boolean;
    userId: string;
    isAutoplay: boolean;


    constructor(
        publisherId: string = 'defaultPublisherId',
        channelId: string = 'defaultChannelId',
        gdprApproved: boolean = false,
        isDebug: boolean = false,
        userId: string = '',
        isAutoplay: boolean = false
    ) {
        this.publisherId = publisherId;
        this.channelId = channelId;
        this.gdprApproved = gdprApproved;
        this.isDebug = isDebug;
        this.userId = userId;
        this.isAutoplay = isAutoplay
    }
}

export default DefaultAdServiceConfig;