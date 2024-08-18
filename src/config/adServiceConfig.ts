import DefaultAdServiceConfig from './defaultAdServiceConfig';
import WebOSAdServiceConfig from './webOSAdServiceConfig';

interface AdServiceConfig {
    publisherId: string;
    channelId: string;
    gdprApproved: boolean;
    isDebug: boolean;
    userId: string;
    isAutoplay: boolean;
}

export default AdServiceConfig;

export function getAdServiceConfig(): AdServiceConfig {
    if (typeof window !== 'undefined' && (window as any).webOS) {
        return new WebOSAdServiceConfig();
    } else {
        return new DefaultAdServiceConfig();
    }
}