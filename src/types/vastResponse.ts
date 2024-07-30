export interface VastResponse {
    version: string;
    ads: Array<any>;
}

export function parseVastResponse(data: string): VastResponse {
    // Parse the VAST XML or JSON response here
    // This is a placeholder for actual parsing logic
    console.log(data);
    const parser = new DOMParser();

    // Parse the XML string
    const xmlDoc = parser.parseFromString(data, "application/xml");

    // Extract data from the XML document
    const version = xmlDoc.getElementsByTagName("VAST")[0].getAttribute("version");
    const ads = Array.from(xmlDoc.getElementsByTagName("Ad"))?.map(ad => {
        // Extract and return ad details here
        return {
            id: ad.getAttribute("id"),
            // Add more ad details as needed
            creative: Array.from(ad.getElementsByTagName("Creative")).map(creative => {
                const creativeType = creative.getAttribute("creativeType");
                const mediaFiles = Array.from(creative.getElementsByTagName("MediaFile")).map(mediaFile => {
                    return {
                        type: mediaFile.getAttribute("type"),
                        url: mediaFile.textContent,
                    };
                });
                return {
                    type: creativeType,
                    mediaFiles: mediaFiles,
                };
            }),
            impressions: Array.from(ad.getElementsByTagName("Impression")).map(impression => {
                return impression.textContent;
            }),
            clickThrough: ad.getElementsByTagName("ClickThrough")[0]?.textContent,
            clickTracking: Array.from(ad.getElementsByTagName("ClickTracking")).map(clickTracking => {
                return clickTracking.textContent;
            }),
            duration: ad.getElementsByTagName("Duration")[0]?.textContent,
            adSystem: ad.getElementsByTagName("AdSystem")[0]?.textContent,
            adTitle: ad.getElementsByTagName("AdTitle")[0]?.textContent,
            description: ad.getElementsByTagName("Description")[0]?.textContent,
            survey: ad.getElementsByTagName("Survey")[0]?.textContent,
            error: Array.from(ad.getElementsByTagName("Error")).map(error => {
                return error.textContent;
            }),
        };
    }) ?? [];
    return {
        version: version ?? "3.0",
        ads: ads,
    };
}
