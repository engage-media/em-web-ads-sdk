import AdServiceConfig from "./adServiceConfig";

class WebOSAdServiceConfig implements AdServiceConfig {
    async fetchMetadata(): Promise<any> {
        // Fetch metadata from webOS service. Device ID, app name, etc.
        return {
            deviceId: 'webOSDeviceId',
            appName: 'webOSAppName'
        }
    }
}

export default WebOSAdServiceConfig;