import AdService from './adService';

class EngageAdsSDK {
    private adService: AdService;

    constructor(config: any) {
        this.adService = new AdService(config);
    }

    loadAd(params: any): Promise<any> {
        return this.adService.loadAd(params);
    }

    displayAd(container: HTMLElement): void {
        this.adService.displayAd(container);
    }

    static init(config: any): EngageAdsSDK {
        return new EngageAdsSDK(config);
    }
}

export default EngageAdsSDK;
