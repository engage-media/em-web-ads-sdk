import axios from 'axios';
import { validateConfig } from './utils';
import { VastResponse, parseVastResponse } from './types/vastResponse';
import { EMVastResponse, mapToEMVastResponse } from './types/emVastResponse';
import AdServiceConfig, { getAdServiceConfig } from './config/adServiceConfig';
import WebOSAdServiceConfig from './config/webOSAdServiceConfig';

class AdService {
    private config: AdServiceConfig;

    private emVastResponse?: EMVastResponse;
    private currentAdIndex = 0;

    constructor(config: AdServiceConfig) {
        if (!validateConfig(config)) {
            throw new Error('Invalid configuration');
        }

        this.config = config;
    }

    async loadAd(params: any): Promise<EMVastResponse> {
        // Check if the autoplay is enabled and the container is provided
        if (this.config.isAutoplay && !params.container) {
            throw new Error('Invalid parameters');
        }

        try {
            const response = await axios.get(this.config.isDebug ? 'https://s.adtelligent.com/demo' : 'https://vast.engagemediatv.com', {
                params: this.config instanceof WebOSAdServiceConfig ? {
                    publisherId: this.config.publisherId,
                    channelId: this.config.channelId,
                    gdprApproved: this.config.gdprApproved,
                    userId: this.config.userId,
                    // add webos params, if the object is WebOSAdServiceConfig
                    webOSDeviceId: this.config.webOSDeviceId,
                    webOSAppName: this.config.webOSAppName
                } : {
                    publisherId: this.config.publisherId,
                    channelId: this.config.channelId,
                    gdprApproved: this.config.gdprApproved,
                    userId: this.config.userId,
                },
                headers: {
                    'Content-Type': 'application/xml'
                },
                timeout: 20000
            });
            const vastResponse: VastResponse = parseVastResponse(response.data);
            this.emVastResponse = mapToEMVastResponse(vastResponse);
            this.currentAdIndex = 0;

            // Display the ad in the specified container

            if (this.config.isAutoplay) {
                const adContainer = params.container;
                if (adContainer != null) {
                    this.displayAd(adContainer);
                }
            }
            return this.emVastResponse;
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    }

    displayAd(container: HTMLElement) {
        // Show the ad container
        container.style.display = 'block';

        // Assuming the ad content is a video URL for simplicity
        // if the ads list is empty, do nothing
        if (this.emVastResponse?.ads.length === 0) {
            container.style.display = 'none';
            return;
        }

        // check if the current ad index is out of bounds
        if (this.currentAdIndex >= (this.emVastResponse?.ads?.length ?? 0)) {
            this.currentAdIndex = 0;
        }

        const adVideoUrl = this.emVastResponse?.ads[this.currentAdIndex++].mediaUrl;
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
