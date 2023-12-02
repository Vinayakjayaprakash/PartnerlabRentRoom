function addUser(username) {
    const app = new XMLHttpRequest();
    app.open("POST", "http://127.0.0.1:3000/users", true);
    // Set the Content-Type header
    app.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify({ username: username }));
    app.onload = function () {
        if (app.status === 200) {
            console.log("User added successfully");
            let newElt = document.querySelector('pre');
            newElt.innerHTML=""
            newElt.appendChild(document.createElement("br"))
            newElt.textContent = "User Created with UserName:" + username;
            newElt.appendChild(document.createElement("br"))

        } else {
            console.error("Error adding user:", app.responseText);
            let newElt = document.querySelector('pre');
            newElt.innerHTML = ""
            newElt.appendChild(document.createElement("br"))
            newElt.textContent = "Error Creating UserName:" + app.responseText;
            newElt.appendChild(document.createElement("br"))
        }
    };
    app.send(JSON.stringify({username: username }));
}

function getUserReservation(username) {
    const app = new XMLHttpRequest();
    app.open("GET", `http://127.0.0.1:3000/reservations/user/${username}`, true);
    app.onload = function () {
        if (app.status === 200) {
            console.log("User reservation:", app.responseText);
            let responseText = this.responseText;
            let data = JSON.parse(this.responseText);
            let userdetail = "";
           
            if (username == data.Name) {
               // userdetail = "User Reservation Details: <br> Name:" + data.Name;
                let newElt = document.querySelector('pre');
                newElt.appendChild(document.createElement("br"))
                newElt.textContent = "User Reservation Details: Name:" + data.Name ;   
                newElt.appendChild(document.createElement("br"))

                } else
            {
                let newElt = document.querySelector('pre');
                newElt.appendChild(document.createElement("br"))
                newElt.textContent = "User Reservation Not Found / User has No Reservations"; 
                newElt.appendChild(document.createElement("br"))

            
            }
/*
            let newElt = document.querySelector('pre');
            newElt.appendChild(document.createElement("br"))
            newElt.textContent = userdetail //"User reservation: " + responseText;
            newElt.appendChild(document.createElement("br"))*/
            console.log(responseText);
        } else {
            console.error("Error retrieving reservation:", app.responseText);
        }
    };
    app.send();
}

function getAllReservations() {
    const app = new XMLHttpRequest();
    app.open("GET", "http://127.0.0.1:3000/reservations", true);
    app.onload = function () {
        if (app.status === 200) {
            console.log("All reservations:", app.responseText);
            let responseText = this.responseText;
            let newElt = document.querySelector('pre');
            newElt.appendChild(document.createElement("br"))
            newElt.textContent = "User reservation: " + responseText;
            newElt.appendChild(document.createElement("br"))   


            let data = JSON.parse(this.responseText);
          //  let Users = data.row;
            let container = document.getElementById("resultsBody");
            container.innerHTML = ""; // Clear the container

            let table = document.createElement("table");
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");

            let headerRow = document.createElement("tr");

            let nameHeader = document.createElement("th");
            nameHeader.textContent = "username";
            headerRow.appendChild(nameHeader);

            let jerseynoHeader = document.createElement("th");
            jerseynoHeader.textContent = "start date";
            headerRow.appendChild(jerseynoHeader);

            let playerDBOHeader = document.createElement("th");
            playerDBOHeader.textContent = "start time";
            headerRow.appendChild(playerDBOHeader);

            let playerDBOSunRiseHeader = document.createElement("th");
            playerDBOSunRiseHeader.textContent = "number of hours";
            headerRow.appendChild(playerDBOSunRiseHeader);

            thead.appendChild(headerRow);

            for (let user of data) {
                let userRow = document.createElement("tr");

                let nameCell = document.createElement("td");
                nameCell.textContent = user.Name;
                userRow.appendChild(nameCell);

                let startDateCell = document.createElement("td");
                startDateCell.textContent = "";
                userRow.appendChild(startDateCell);

                let startTimeCell = document.createElement("td");
                startTimeCell.textContent = user.Time;
                userRow.appendChild(startTimeCell);

                tbody.appendChild(userRow);
                }
               
    
            table.appendChild(thead);
            table.appendChild(tbody);
            container.appendChild(table);


        } 
        else {
            console.error("Error retrieving reservations:", app.responseText);
        }

        /*request.onload = function () {
            if (request.status == 200) {
                console.log('Response OK.');
    
                let responseText = this.responseText;
                let newElt = document.querySelector('pre');
                newElt.appendChild(document.createElement("br"))
                newElt.textContent = responseText;
                newElt.appendChild(document.createElement("br"))
                console.log(responseText);
    
            } else {
                console.log(`Error occurred in viewing error logs. Status: ${request.status}`);
            }*/







    };
    app.send();
}

function createReservation(username, startDate, startTime, hours) {
    const app = new XMLHttpRequest();

    console.log(JSON.stringify({ username, startDate, startTime, hours }));

    app.open("POST", "http://127.0.0.1:3000/reservations", true);
    app.onload = function () {
        if (app.status === 200) {
            console.log("Reservation created successfully");
            let newElt = document.querySelector('pre');
            newElt.innerHTML = ""
            newElt.appendChild(document.createElement("br"))
            newElt.textContent = "User Reservation Created for:" + username + "startDate:" + startDate + "startTime : " + startTime +"hours: " + hours;
            newElt.appendChild(document.createElement("br"))

        } else {
            console.error("Error creating reservation:", app.responseText);

            let newElt = document.querySelector('pre');
            newElt.innerHTML = ""
            newElt.appendChild(document.createElement("br"))
            newElt.textContent = "Error Creating Reservation: " + app.responseText;
            newElt.appendChild(document.createElement("br"))
        }
    };
  //  console.log(JSON.stringify({ username, startDate, startTime, hours }));
    // app.send();
    app.send(JSON.stringify({ username, startDate, startTime, hours }));
}

function updateReservation(username, startDate, startTime, hours) {
    const app = new XMLHttpRequest();
    app.open("PUT", `http://127.0.0.1:3000/reservations/${username}`, true);
    app.onload = function () {
        if (app.status === 200) {
            console.log("Reservation updated successfully");
        } else {
            console.error("Error updating reservation:", app.responseText);
        }
    };
    app.send(JSON.stringify({ username, startDate, startTime, hours }));
}

function deleteReservation(username) {
    const app = new XMLHttpRequest();
    app.open("DELETE", `http://127.0.0.1:3000/reservations/${username}`, true);
    app.onload = function () {
        if (app.status === 200) {
            console.log("Reservation deleted successfully");
        } else {
            console.error("Error deleting reservation:", app.responseText);
        }
    };
    app.send();
}
