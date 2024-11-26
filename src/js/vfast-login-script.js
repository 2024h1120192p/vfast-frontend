// vfast-login-script.js

// Function to handle login form submission
$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        var data = {
            username: $('#email').val(),
            password: $('#password').val()
        };

        $.ajax({
            type: 'POST',
            url: 'https://ec2-15-207-110-230.ap-south-1.compute.amazonaws.com/api/v1/user/login',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                // Assuming the response contains an auth token
                // Save the token to localStorage or a cookie
                localStorage.setItem('authToken', response.token);
                alert('Login successful');
                // Redirect to dashboard or another page
                window.location.href = 'admin.html';
            },
            error: function(xhr, status, error) {
                console.error('Login error:', error);
                alert('Login failed: ' + xhr.responseJSON.message);
            }
        });
    });
});

// Function to handle Google Sign-In response
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Send the Google ID token to the backend
    var data = {
        token: response.credential
    };

    $.ajax({
        type: 'POST',
        url: 'https://ec2-15-207-110-230.ap-south-1.compute.amazonaws.com/api/v1/user/gauth',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            // Assuming the response contains an auth token
            localStorage.setItem('authToken', response.token);
            alert('Google Sign-In successful');
            // Redirect to dashboard or another page
            window.location.href = 'dashboard.html';
        },
        error: function(xhr, status, error) {
            console.error('Google Sign-In error:', error);
            alert('Google Sign-In failed: ' + xhr.responseJSON.message);
        }
    });
}
