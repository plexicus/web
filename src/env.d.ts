interface ImportMetaEnv {
  readonly SITE_URL: string;
  readonly BLOG_SITE_URL: string;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv;
}