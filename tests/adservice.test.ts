import AdService from '../src/adService';

describe('AdService', () => {
    const validConfig = {
        publisherId: 'a8ce40dc',
        channelId: '62570352',
        gdprApproved: true
    };

    it('should throw error for invalid config', () => {
        expect(() => new AdService({})).toThrow('Invalid configuration');
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
