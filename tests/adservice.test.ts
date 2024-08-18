import AdService from '../src/adService';
import DefaultAdServiceConfig from '../src/config/defaultAdServiceConfig';
import WebOSAdServiceConfig from '../src/config/webOSAdServiceConfig';

describe('AdService', () => {
    const validConfig = new WebOSAdServiceConfig(
        'a8ce40dc',
        '62570352',
        true,
        'webOSDeviceId',
        'webOSAppName',
        false,
        'userId',
        true
    );


    it('should throw error for invalid config', () => {
        expect(() => new AdService(new DefaultAdServiceConfig(
            '',
            '',
            false,
            false,
            '',
        ))).toThrow('Invalid configuration');
    });

    it('should load ad data successfully', async () => {
        const adService = new AdService(validConfig);
        const adData = await adService.loadAd({
            container: document.createElement('div')
        });
        expect(adData).toBeDefined();
    });

    it('should throw error for invalid parameters', async () => {
        const adService = new AdService(validConfig);
        await expect(adService.loadAd({})).rejects.toThrow('Invalid parameters');
    });
});
