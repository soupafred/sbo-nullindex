export const useDeviceDetection = (): {
  isApple: boolean;
  isIOS: boolean;
  isMac: boolean;
} => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const userAgent = navigator.userAgent;

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);
    const isMac = /Macintosh|Mac OS X/.test(userAgent);

    return {
      isApple: isIOS || isMac,
      isIOS,
      isMac
    };
  }

  return {
    isApple: false,
    isIOS: false,
    isMac: false
  };
};
