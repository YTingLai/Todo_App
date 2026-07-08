const BASE_URL = "https://localhost:7037/api";

export function apiFetch(path, options = {}) {
    return fetch(`${BASE_URL}${path}`, options);
};