import AdServiceConfig from "./adServiceConfig";

class WebOSAdServiceConfig implements AdServiceConfig {
    publisherId: string;
    channelId: string;
    gdprApproved: boolean;
    isDebug: boolean;
    userId: string;
    isAutoplay: boolean;
    webOSDeviceId: string;
    webOSAppName: string;

    constructor(
        publisherId: string = 'defaultPublisherId',
        channelId: string = 'defaultChannelId',
        gdprApproved: boolean = false,
        webOSDeviceId: string = '',
        webOSAppName: string = '',
        isDebug: boolean = false,
        userId: string = '',
        isAutoplay: boolean = false
    ) {
        this.publisherId = publisherId;
        this.channelId = channelId;
        this.gdprApproved = gdprApproved;
        this.webOSDeviceId = webOSDeviceId;
        this.webOSAppName = webOSAppName;
        this.isDebug = isDebug;
        this.userId = userId;
        this.isAutoplay = isAutoplay;
    }
}

export default WebOSAdServiceConfig;