const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;
const GOOGLE_AUTH_KEY = import.meta.env.VITE_GOOGLE_AUTH;

const APP_ENV = {
    API_BASE_URL,
    RECAPTCHA_KEY,
    GOOGLE_AUTH_KEY
}

export { APP_ENV };