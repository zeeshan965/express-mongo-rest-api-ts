/** To include globally accessible functions **/

/**
 * @param name
 * @param default_value
 */
globalThis.getEnv = (name: string, default_value: string) => {
    if (default_value === undefined) {
        default_value = ''
    }
    return process.env[name] !== undefined ? process.env[name] : default_value;
}