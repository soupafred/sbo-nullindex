import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

export default defineNuxtPlugin(() => {
  // Extend once during app startup
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  // Expose globally as `$dayjs`
  return {
    provide: {
      dayjs,
    },
  };
});
