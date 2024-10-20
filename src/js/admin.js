let table_body = $("#dashboard-table-body")[0];

$.ajax({
    type: "GET",
    url: "http://vfast.online:8000/admin",
    dataType: "text",
    success: function (response) {
        data = JSON.parse(response).data;
        console.log(data);
        data.forEach((dataRow, i) => {
            let row = "<tr>";
            row += `<td>${i+1}</td>`;
            row += `<td>${dataRow.name}</td>`;
            row += `<td>${dataRow.email}</td>`;
            row += `<td>${dataRow.age}</td>`;
            row += `<td>${dataRow.checkIn}</td>`;
            row += `<td>${dataRow.checkOut}</td>`;
            row += `<td>${dataRow.roomsAvailed}</td>`;
            row += "</tr>"
            table_body.innerHTML += row
        });
    }
});