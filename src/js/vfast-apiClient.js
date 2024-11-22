// vfast-apiClient.js
const BASE_URL = 'http://172.17.48.215:8000'; // Replace with your actual base URL

let authToken = null;

/**
 * Set the authentication token.
 * @param {string} token - The OAuth2 token.
 */
export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

/**
 * Get the current authentication token.
 * @returns {string|null} The OAuth2 token.
 */
export function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Make an HTTP request to the API.
 * @param {string} endpoint - The API endpoint (e.g., '/api/v1/user/login').
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @param {boolean} requiresAuth - Whether the endpoint requires authentication.
 * @returns {Promise<object>} The JSON response.
 * @throws Will throw an error if the response is not ok.
 */
export async function apiRequest(endpoint, options = {}, requiresAuth = false) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const authToken = getAuthToken();

    if (requiresAuth && authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.detail
                ? JSON.stringify(errorData.detail)
                : `Error ${response.status}: ${response.statusText}`
        );
    }

    // If there's no content, return an empty object
    if (response.status === 204) {
        return {};
    }

    return response.json();
}
