export const useDate = () => {
  const { $dayjs } = useNuxtApp();

  const formatDate = (date?: string | Date, format = 'YYYY-MM-DD') =>
    date ? $dayjs(date).format(format) : '';

  const timeAgo = (date?: string | Date) => (date ? $dayjs(date).fromNow() : '');

  const toLocalTime = (date?: string | Date) =>
    date ? $dayjs.utc(date).local().format('YYYY-MM-DD HH:mm') : '';

  return { formatDate, timeAgo, toLocalTime };
};
