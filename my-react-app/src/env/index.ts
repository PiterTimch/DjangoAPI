const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_IMAGE_URL = API_BASE_URL + import.meta.env.VITE_APP_IMAGE_URL;

const APP_ENV = {
    API_BASE_URL,
    APP_IMAGE_URL
}

export { APP_ENV };