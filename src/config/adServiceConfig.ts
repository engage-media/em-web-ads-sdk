import DefaultAdServiceConfig from './defaultAdServiceConfig';
import WebOSAdServiceConfig from './webOSAdServiceConfig';

interface AdServiceConfig {
    fetchMetadata(): Promise<any>;
}

export default AdServiceConfig;

export function getAdServiceConfig(): AdServiceConfig {
    if (typeof window !== 'undefined' && (window as any).webOS) {
        return new WebOSAdServiceConfig();
    } else {
        return new DefaultAdServiceConfig();
    }
}