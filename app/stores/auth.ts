import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: (): {
    accessToken: string;
    refreshToken: string;
  } => {
    return {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NTFiNzA0NC1mOTY1LTRjYTgtYTkzNy03N2UwZjE3ZmRlYTMiLCJzdWIiOiI2ZDkxNTRiMi1lM2IwLTQ0NjQtYWQzYi1jYjRhMGQ1NzlkMzkiLCJpc3MiOiJOdWxsaW5kZXhbSUFNXSIsImlhdCI6MTc2MjI1NTIxMCwiZXhwIjoxNzYyMjU4ODEwLCJlbWFpbCI6Im1pc2FwaXNhdHRvQGdtYWlsLmNvbSIsIm5hbWUiOiJNSVNBIFBpc2F0dG8iLCJhdXRoX3Byb3ZpZGVyIjoiR09PR0xFIiwiYXV0aF9jbGllbnRfaWQiOiJnb29nbGUtbWVyY2hhbnQiLCJ0eXBlIjoiYWNjZXNzIn0.dCv1fO4FhXfVK9jlKKzmVUdIA8n6IoRUQ3wlHIexeNI',
      refreshToken: ''
    };
  },
  persist: true
});
