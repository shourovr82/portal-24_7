export const getBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL;
};

export const getAuthKey = (): string => {
  return import.meta.env.VITE_AUTH_KEY;
};
export const sideBarModeKey = (): string => {
  return import.meta.env.VITE_SIDEBAR_MODE_KEY;
};
export const imageUrlKey = (): string => {
  return import.meta.env.VITE_IMAGE_URL_KEY;
};
