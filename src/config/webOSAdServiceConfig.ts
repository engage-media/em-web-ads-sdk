import AdServiceConfig from "./adServiceConfig";

class WebOSAdServiceConfig implements AdServiceConfig {
    constructor(
        private publisherId: string = 'defaultPublisherId',
        private channelId: string = 'defaultChannelId',
        private gdprApproved: boolean = false,
        private webOSDeviceId: string = 'webOSDeviceId',
        private webOSAppName: string = 'webOSAppName'
    ) { }
    async fetchMetadata(): Promise<any> {
        // Fetch metadata from webOS service. Device ID, app name, etc.
        return {
            deviceId: this.webOSDeviceId,
            appName: this.webOSAppName,
            publisherId: this.publisherId,
            channelId: this.channelId,
            gdprApproved: this.gdprApproved
        }
    }
}

export default WebOSAdServiceConfig;