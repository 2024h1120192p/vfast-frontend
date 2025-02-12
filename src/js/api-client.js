// vfast-apiClient.js
// const BASE_URL = 'https://ec2-15-207-110-230.ap-south-1.compute.amazonaws.com/api/v1'; // Replace with your actual base URL
const BASE_URL = 'https://vfast-backend-16dd4b0bfa8f.herokuapp.com/api/v1'; // Replace with your actual base URL

function jwt_decode(token) {
    const payload = token.split('.')[1]; // Extract the payload part
    return JSON.parse(atob(payload)); // Decode from base64 and parse JSON
}

/**
 * Set the authentication token.
 * @param {string} token - The OAuth2 token.
 */
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

/**
 * Get the current authentication token.
 * @returns {string|null} The OAuth2 token.
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Clear the authentication token.
 */
function clearAuthToken(token) {
    localStorage.removeItem('authToken');
}

function getUserData(){
    return jwt_decode(getAuthToken());
}

/**
 * Make an HTTP request to the API using jQuery's $.ajax.
 *
 * @param {string} endpoint - The API endpoint (e.g., '/api/v1/user/login').
 * @param {object} [options={}] - AJAX options.
 * @param {string} [options.method='GET'] - HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [options.headers] - Additional headers to include in the request.
 * @param {object} [options.body] - The request payload to be sent as JSON.
 * @param {boolean} [requiresAuth=false] - Whether the endpoint requires authentication.
 * @returns {Promise<object>} A promise that resolves with the JSON response or rejects with an error.
 *
 * @throws {Error} Will throw an error if the response is not ok or if there's a network issue.
 *
 * @example
 * // Making a POST request with authentication
 * apiRequest('/api/v1/user/login', {
 *     method: 'POST',
 *     body: { username: 'user', password: 'pass' },
 * }, true)
 * .then(data => {
 *     console.log('Login successful:', data);
 * })
 * .catch(error => {
 *     console.error('Login failed:', error.message);
 * });
 */
function apiRequest(endpoint, options = {}, requiresAuth = false) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = Object.assign(
        {
            'Content-Type': 'application/json',
        },
        options.headers || {}
    );

    const authToken = getAuthToken();

    if (requiresAuth && authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    console.log(url)

    // Prepare AJAX settings
    const ajaxSettings = {
        url: url,
        method: options.method || 'GET',
        headers: headers,
        data: options.body ? JSON.stringify(options.body) : null,
        dataType: 'json', // Expect JSON response
        contentType: 'application/json', // Send data as JSON
    };

    return $.ajax(ajaxSettings)
        .then(function (data, textStatus, jqXHR) {
            // Handle HTTP 204 No Content
            if (jqXHR.status === 204) {
                return {};
            }
            return data;
        })
        .catch(function (jqXHR, textStatus, errorThrown) {
            let errorMessage = `Error ${jqXHR.status}: ${jqXHR.statusText}`;
            try {
                const errorData = JSON.parse(jqXHR.responseText);
                if (errorData.data) {
                    errorMessage += " from server : " + JSON.stringify(errorData.data);
                }
                if (errorData.message) {
                    errorMessage += " from server : " + JSON.stringify(errorData.message);
                }
            } catch (e) {
                // If response is not JSON or parsing fails, retain the default error message
                console.log("api-client.js:108", e);
                console.log(jqXHR.responseText);
            }
            // Reject the promise with an Error object
            return Promise.reject(new Error(errorMessage));
        });
}
