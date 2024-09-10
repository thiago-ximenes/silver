/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASE_API_URL: string;
  readonly VITE_APP_CRYPTO_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
