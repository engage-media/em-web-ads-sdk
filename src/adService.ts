import axios from 'axios';
import { validateConfig, validateParams } from './utils';
import { VastResponse, parseVastResponse } from './types/vastResponse';
import { EMVastResponse, mapToEMVastResponse } from './types/emVastResponse';
import { getAdServiceConfig } from './config/adServiceConfig';

class AdService {
    private config: any;

    constructor(config: any) {
        if (!validateConfig(config)) {
            throw new Error('Invalid configuration');
        }

        this.config = { ...config, ...getAdServiceConfig() };
    }

    async loadAd(params: any): Promise<EMVastResponse> {
        if (!validateParams(params)) {
            throw new Error('Invalid parameters');
        }
        try {
            const response = await axios.get('http://vast.engagemediatv.com', {
                params: {
                    publisherId: this.config.publisherId,
                    channelId: this.config.channelId,
                    gdprApproved: this.config.gdprApproved,
                    ...params
                },
                timeout: 20000
            });
            const vastResponse: VastResponse = parseVastResponse(response.data);
            const emVastResponse: EMVastResponse = mapToEMVastResponse(vastResponse);

            // Display the ad in the specified container
            const adContainer = params.container;
            if (adContainer != null) {
                this.displayAd(adContainer, emVastResponse);
            }
            return emVastResponse;
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    }

    private displayAd(container: HTMLElement, adResponse: EMVastResponse) {
        // Show the ad container
        container.style.display = 'block';

        // Assuming the ad content is a video URL for simplicity
        // if the ads list is empty, do nothing
        if (adResponse.ads.length === 0) {
            container.style.display = 'none';
            return;
        }
        const adVideoUrl = adResponse.ads[0].mediaUrl;
        const videoElement = document.createElement('video');
        videoElement.src = adVideoUrl;
        videoElement.controls = true;
        videoElement.autoplay = true;

        // Clear any existing content in the container
        container.innerHTML = '';
        container.appendChild(videoElement);

        // Hide the ad container when the video ends
        videoElement.addEventListener('ended', () => {
            container.style.display = 'none';
        });
    }
}

export default AdService;
