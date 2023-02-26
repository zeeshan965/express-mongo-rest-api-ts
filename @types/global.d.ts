export {};

declare global {
    var getEnv: (name: string, default_value: string) => string|undefined;
}