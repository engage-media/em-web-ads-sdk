export function validateConfig(config: any): boolean {
    return config.publisherId && config.channelId && typeof config.gdprApproved === 'boolean';
}

export function validateParams(params: any): boolean {
    return params && params.container && typeof params.container === 'object';
}
