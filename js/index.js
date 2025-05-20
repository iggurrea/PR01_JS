function saveData() {
  // alert("Function...");
  // retrieve form data
  var fieldColor = document.getElementById("inputColor").value;
  var fieldSection = document.getElementById("inputSection").value;
  var fieldNumber = document.getElementById("inputNumber").value;
  // or.., through jQuery
  //var fieldColor = $("#inputColor").val();
  //var fieldSection = $("# inputSection").val();
  //var fieldNumber = $("# inputNumber").val();
  //console.log(fieldColor);
  //console.log(fieldSection);
  //console.log(fieldNumber);
  if (fieldColor == "..." || fieldSection == "" || fieldNumber == "") {
    alert("Invalid data!");
    return; // abort function
  }

  // retrieve the Key "Park_ID" stored in localStorage
  var fieldID = localStorage.getItem("Park_ID");

  if (isNaN(fieldID) || fieldID == null) {
    //null
    fieldID = 1;
  } else {
    fieldID = parseInt(fieldID) + 1;
  }
  // update Park_ID
  localStorage.setItem("Park_ID", fieldID);

  const entry = {
    id: fieldID,
    date: new Date().toString(),
    color: fieldColor,
    section: fieldSection,
    number: fieldNumber,
    status: "Current",
  };

  localStorage.setItem(`Park_${fieldID}`, JSON.stringify(entry));

  // alert("Place saved!");
  var MessageSuccess = new bootstrap.Modal(
    document.getElementById("MessageModal"),
    {
      keyboard: false,
    }
  );
  MessageSuccess.show();

  document.getElementById("inputColor").value = "";
  document.getElementById("inputSection").value = "";
  document.getElementById("inputNumber").value = "";
} //saveData

function showData() {
  const container = document.getElementById("divData");
  container.innerHTML = "";

  const fieldID = localStorage.getItem("Park_ID");
  if (!fieldID) return;

  for (let i = 1; i <= fieldID; i++) {
    const item = localStorage.getItem(`Park_${i}`);
    if (!item) continue;

    const data = JSON.parse(item);
    if (data.status !== "Current") continue;

    const div = document.createElement("div");
    div.classList.add("mb-3", "p-3", "rounded");
    div.style.backgroundColor = data.color.toLowerCase();
    div.style.color = ["red", "blue", "green"].includes(
      data.color.toLowerCase()
    )
      ? "white"
      : "black";

    div.innerHTML = `
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Color:</strong> ${data.color}</p>
      <p><strong>Section:</strong> ${data.section}</p>
      <p><strong>Number:</strong> ${data.number}</p>
      <button onclick="deletePlace(${data.id})" class="btn btn-sm btn-warning">Delete</button>
    `;

    container.appendChild(div);

    /*
  savePosition();
  drawMap(fieldID);
  */
  }
}

function deletePlace(id) {
  const item = localStorage.getItem(`Park_${id}`);
  if (!item) return;

  let data = JSON.parse(item);
  data.status = "History";
  localStorage.setItem(`Park_${id}`, JSON.stringify(data));

  showData(); // Refresh the view
}

function deleteData() {
  localStorage.setItem("Park_Status_" + id, "History");
  showData();

  const fieldID = localStorage.getItem("Park_ID");
  if (!fieldID) return;

  for (let i = 1; i <= fieldID; i++) {
    let item = localStorage.getItem(`Park_${i}`);
    if (!item) continue;

    let data = JSON.parse(item);
    if (data.status === "Current") {
      data.status = "History";
      localStorage.setItem(`Park_${i}`, JSON.stringify(data));
    }
  }
  showData(); // Refresh to see anything
}

function showHistory() {
  var displayDiv = document.getElementById("dataDisplay");
  displayDiv.innerHTML = ""; // limpiar todo primero

  var fieldID = localStorage.getItem("Park_ID");
  if (isNaN(fieldID) || fieldID == null) return;

  for (var i = 1; i <= fieldID; i++) {
    let status = localStorage.getItem("Park_Status_" + i);
    if (status !== "History") continue;

    let date = localStorage.getItem("Park_Date_" + i);
    let color = localStorage.getItem("Park_Color_" + i);
    let section = localStorage.getItem("Park_Section_" + i);
    let number = localStorage.getItem("Park_Number_" + i);

    let card = `
      <div class="card mb-3 p-3">
        <p><strong>ID:</strong> ${i}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Color:</strong> ${color}</p>
        <p><strong>Section:</strong> ${section}</p>
        <p><strong>Number:</strong> ${number}</p>
      </div>
    `;

    displayDiv.innerHTML += card;
  }
}



///Funciton to clear the store history of the places
function deleteHistory() {
  var fieldID = localStorage.getItem("Park_ID");
  if (isNaN(fieldID) || fieldID == null) return;

  for (var i = 1; i <= fieldID; i++) {
    var status = localStorage.getItem("Park_Status_" + i);
    if (status === "History") {
      localStorage.removeItem("Park_Date_" + i);
      localStorage.removeItem("Park_Color_" + i);
      localStorage.removeItem("Park_Section_" + i);
      localStorage.removeItem("Park_Number_" + i);
      localStorage.removeItem("Park_Status_" + i);
    }
  }

  showHistory();
}

///Function to store the localitation of the place
function savePosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    // alert("LAT: " + lat);

    localStorage.setItem("Park_lat", lat);
    localStorage.setItem("Park_long", long);
  });
}

///Fuction to draw a map in the HTML. You need to use this elements
/*   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=myMap"></script> 
       <div id="googleMap" style="width:100%;height:400px;"></div> 
  */
function drawMap() {
  var lat = localStorage.getItem("Park_lat_");
  var long = localStorage.getItem("Park_long_");

  var mapProp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var myLatlng = new google.maps.LatLng(lat, long);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "Titulo",
  });

  marker.setMap(map);
}
