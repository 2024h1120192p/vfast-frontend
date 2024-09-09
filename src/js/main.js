$("#bookingForm").on('submit', function (e) {
    e.preventDefault();

    if($("#firstName")[0].value == false){
        alert("Please check the box to agree with the Terms and Conditions.");
    }
    else{
        data = {
            name         : $("#firstName")[0].value + " " + $("#lastName")[0].value,
            email        : $("#email")[0].value,
            age          : $("#age")[0].value,
            checkIn      : $("#startDate")[0].value,
            checkOut     : $("#endDate")[0].value,
            roomType     : $("#roomType")[0].value,
            roomCount    : $("#roomCount")[0].value,
        }
    
        $.ajax({
            type: "POST",
            url: "http://172.17.49.100:8000/book",
            data: JSON.stringify(data),
            contentType : "application/json",
            dataType: "text",
            success: function (response) {
                console.log("response : "+response)
                alert("The form was submitted successfully.")
            }
        });
    }
});