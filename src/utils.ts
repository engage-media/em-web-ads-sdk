export function validateConfig(config: any): boolean {
    return config.publisherId &&
        config.publisherId.length > 0 &&
        config.channelId &&
        config.channelId.length > 0 &&
        typeof config.gdprApproved === 'boolean';
}
