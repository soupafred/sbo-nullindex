import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: (): {
    accessToken: string;
    refreshToken: string;
  } => {
    return {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNTczNDQ3YS0yZTMzLTQ0YWQtOTM1Ny05YWYzNGE1YjcxOGQiLCJzdWIiOiI2ZDkxNTRiMi1lM2IwLTQ0NjQtYWQzYi1jYjRhMGQ1NzlkMzkiLCJpc3MiOiJOdWxsaW5kZXhbSUFNXSIsImlhdCI6MTc2MjA2MDc1MSwiZXhwIjoxNzYyMDY0MzUxLCJlbWFpbCI6Im1pc2FwaXNhdHRvQGdtYWlsLmNvbSIsIm5hbWUiOiJNSVNBIFBpc2F0dG8iLCJhdXRoX3Byb3ZpZGVyIjoiR09PR0xFIiwiYXV0aF9jbGllbnRfaWQiOiJnb29nbGUtbWVyY2hhbnQiLCJ0eXBlIjoiYWNjZXNzIn0.2Cfj62tB5bzcvDRJNJLizllkxivqGn6HyC-1mU2jQ0w',
      refreshToken: ''
    };
  },
  persist: true
});
