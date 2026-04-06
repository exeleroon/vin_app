export interface AppConfig {
    apiUrl: string;
    imagesUrl: string;
    apiKey: string;
    appName: string;
    environment: string;
    version: string;
    ui: {
        language: string;
    };
    api: {
        timeout: number;
        retries: number;
    };
}

export class ConfigLoader {
    private config: AppConfig | null = null;
    private loading: Promise<AppConfig> | null = null;

    /**
     * Load configuration from public/config.json
     * Uses caching to avoid multiple requests
     */
    async load(): Promise<AppConfig> {
        // Return cached config if already loaded
        if (this.config) {
            return this.config;
        }

        // Return existing promise if already loading
        if (this.loading) {
            return this.loading;
        }

        // Start loading
        this.loading = this.fetchConfig();

        try {
            this.config = await this.loading;
            return this.config;
        } catch (error) {
            this.loading = null; // Reset on error so we can retry
            throw error;
        }
    }

    private async fetchConfig(): Promise<AppConfig> {
        try {
            const response = await fetch('/config.json');

            if (!response.ok) {
                throw new Error(`Failed to load config: ${response.status} ${response.statusText}`);
            }

            const config = await response.json();

            // Validate that we got an object
            if (typeof config !== 'object' || config === null) {
                throw new Error('Config file must contain a valid JSON object');
            }

            return config;
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error('Config file contains invalid JSON');
            }
            throw error;
        }
    }

    /**
     * Get a specific config value with optional default
     */
    get<T = any>(key: string, defaultValue?: T | any): T {
        if (!this.config) {
            throw new Error('Config not loaded. Call load() first.');
        }

        const value = this.config[key];
        return value !== undefined ? value : defaultValue;
    }

    /**
     * Get the entire config object
     */
    getAll(): AppConfig {
        if (!this.config) {
            throw new Error('Config not loaded. Call load() first.');
        }
        return {...this.config}; // Return a copy
    }

    /**
     * Check if config is loaded
     */
    isLoaded(): boolean {
        return this.config !== null;
    }

    /**
     * Reset the config (useful for testing or reloading)
     */
    reset(): void {
        this.config = null;
        this.loading = null;
    }
}

// Create a singleton instance
export const configLoader = new ConfigLoader();

