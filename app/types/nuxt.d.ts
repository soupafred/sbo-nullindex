import type { $Fetch } from 'ofetch';

declare module '#app' {
  interface NuxtApp {
    $customFetch: $Fetch;
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $customFetch: $Fetch;
  }
}
export {};
