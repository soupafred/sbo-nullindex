import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: (): {
    accessToken: string;
    refreshToken: string;
  } => {
    return {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkOWI2NTZlMS03ZmE4LTQxMjMtYTJlYS03MTZmMDkwMmIzZjQiLCJzdWIiOiI2ZDkxNTRiMi1lM2IwLTQ0NjQtYWQzYi1jYjRhMGQ1NzlkMzkiLCJpc3MiOiJOdWxsaW5kZXhbSUFNXSIsImlhdCI6MTc2MjE2MzQyOSwiZXhwIjoxNzYyMTY3MDI5LCJlbWFpbCI6Im1pc2FwaXNhdHRvQGdtYWlsLmNvbSIsIm5hbWUiOiJNSVNBIFBpc2F0dG8iLCJhdXRoX3Byb3ZpZGVyIjoiR09PR0xFIiwiYXV0aF9jbGllbnRfaWQiOiJnb29nbGUtbWVyY2hhbnQiLCJ0eXBlIjoiYWNjZXNzIn0.EouN0kzuLlHGAtun1b9NfiZJNTMi8wpTSug9wqOjbqU',
      refreshToken: ''
    };
  },
  persist: true
});
