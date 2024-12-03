// vfast-userAuth.js
import { apiRequest, setAuthToken } from './vfast-apiClient.js';

/**
 * User Login
 * @param {object} credentials - The login credentials.
 * @param {string} credentials.username - The user username.
 * @param {string} credentials.password - The user password.
 * @returns {Promise<object>} The response data.
 */
export async function userLogin(credentials) {
    const response = await apiRequest('/api/v1/user/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }, false);
    // Assuming the token is returned in the response, set it
    if (response.token) {
        setAuthToken(response.token);
    }
    return response;
}

/**
 * Verify User OTP
 * @param {object} otpData - The OTP data.
 * @param {string} otpData.otp - The OTP code.
 * @returns {Promise<object>} The response data.
 */
export async function verifyUserOtp(otpData) {
    const response = await apiRequest('/api/v1/user/verify-otp', {
        method: 'POST',
        body: JSON.stringify(otpData),
    }, true);
    return response;
}

/**
 * User Google Authentication
 * @param {object} gAuthData - The Google Auth data.
 * @param {string} gAuthData.token - The Google Auth token.
 * @returns {Promise<object>} The response data.
 */
export async function userGAuth(gAuthData) {
    const response = await apiRequest('/api/v1/user/gauth', {
        method: 'POST',
        body: JSON.stringify(gAuthData),
    }, false);
    // Assuming the token is returned in the response, set it
    if (response.token) {
        setAuthToken(response.token);
    }
    return response;
}