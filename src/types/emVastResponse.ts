import { VastResponse } from './vastResponse';

export interface EMVastResponse {
    version: string;
    ads: Array<any>;
}

export function mapToEMVastResponse(vastResponse: VastResponse): EMVastResponse {
    // Map the VastResponse to EMVastResponse
    // This is a placeholder for actual mapping logic
    return {
        version: vastResponse.version,
        ads: vastResponse.ads
    };
}
