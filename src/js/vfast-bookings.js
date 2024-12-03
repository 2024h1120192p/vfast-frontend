// vfast-bookings.js

/**
 * Get Availability Calendar
 * @param {string} start - The start date (e.g., '2024-12-01').
 * @param {string} end - The end date (e.g., '2024-12-31').
 * @returns {Promise<object>} The availability data.
 */
async function getAvailability(start, end) {
    const params = new URLSearchParams({ start, end });
    const endpoint = `/api/v1/booking/availability?${params.toString()}`;
    const response = await apiRequest(endpoint, {
        method: 'GET',
    }, true);
    return response;
}

/**
 * Request a Booking
 * @param {object} bookingData - The booking request data.
 * @returns {Promise<object>} The response data.
 */
async function requestBooking(bookingData) {
    const response = await apiRequest('/api/v1/booking/booking-request', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    }, true);
    return response;
}

/**
 * Confirm a Booking
 * @param {object} confirmData - The booking confirmation data.
 * @returns {Promise<object>} The response data.
 */
async function confirmBooking(confirmData) {
    const response = await apiRequest('/api/v1/booking/confirm-booking', {
        method: 'POST',
        body: JSON.stringify(confirmData),
    }, true);
    return response;
}

/**
 * Get Booking Dashboard
 * @param {string} [reqDate] - The requested date (optional).
 * @returns {Promise<object>} The dashboard data.
 */
async function getBookingDashboard(reqDate = '') {
    const params = reqDate ? `?req_date=${encodeURIComponent(reqDate)}` : '';
    const endpoint = `/api/v1/booking/booking-dashboard${params}`;
    const response = await apiRequest(endpoint, {
        method: 'GET',
    }, true);
    return response;
}

/**
 * Get Booking Statistics
 * @param {string} [reqDate] - The requested date (optional).
 * @returns {Promise<object>} The statistics data.
 */
async function getBookingStatistics(reqDate = '') {
    const params = reqDate ? `?req_date=${encodeURIComponent(reqDate)}` : '';
    const endpoint = `/api/v1/booking/booking-statistics${params}`;
    const response = await apiRequest(endpoint, {
        method: 'GET',
    }, true);
    return response;
}

/**
 * Get Booking Requests
 * @param {string} [reqDate] - The requested date (optional).
 * @returns {Promise<object>} The booking requests data.
 */
async function getBookingRequests(reqDate = '') {
    const params = reqDate ? `?req_date=${encodeURIComponent(reqDate)}` : '';
    const endpoint = `/api/v1/booking/booking-requests${params}`;
    const response = await apiRequest(endpoint, {
        method: 'GET',
    }, true);
    return response;
}

/**
 * Get User Bookings
 * @returns {Promise<object>} The user's bookings data.
 */
async function getUserBookings() {
    const endpoint = '/api/v1/booking/user-bookings';
    const response = await apiRequest(endpoint, {
        method: 'GET',
    }, true);
    return response;
}

(function ($) {
    $("#bookingForm").on(
        'submit', 
        function (e) {
            e.preventDefault();

            window.location.href = "./dashboard.html"
        }
    );
})(jQuery);
