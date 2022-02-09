/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PICK_TIME: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
