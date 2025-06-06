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

  var fieldDate = new Date();
  // console.log(campoData);
  // Guardar os dados no LocalStorage
  localStorage.setItem("Park_Date", fieldDate);
  localStorage.setItem("Park_Color", fieldColor);
  localStorage.setItem("Park_Section", fieldSection);
  localStorage.setItem("Park_Number", fieldNumber);
  localStorage.setItem("Status", "Current");

  // update Park_ID
  localStorage.setItem("Park_ID", fieldID);

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
  // recuperar dados do localStorage
  var fieldID = localStorage.getItem("Park_ID");
  var fieldDate = localStorage.getItem("Park_Date");
  var fieldColor = localStorage.getItem("Park_Color");
  var fieldSection = localStorage.getItem("Park_Section");
  var fieldNumber = localStorage.getItem("Park_Number");
  var status = localStorage.getItem("Status");
  // console.log(fieldDate);
  // console.log(fieldColor);
  // console.log(fieldSection);
  // console.log(fieldNumber);
  if (status == "Current") {
    var textData = "";
    textData =
      "<p>" +
      fieldID +
      "</p>" +
      "<p>" +
      fieldDate +
      "</p>" +
      "<p>" +
      fieldColor +
      "</p>" +
      "<p>" +
      fieldSection +
      "</p>" +
      "<p>" +
      fieldNumber +
      "</p>";
    document.getElementById("divData").innerHTML = textData;

    // change div "datadiv" background color
    switch (fieldColor) {
      case "Yellow":
        document.getElementById("divData").style.backgroundColor = "yellow";
        break;
      case "Red":
        document.getElementById("divData").style.backgroundColor = "red";
        document.getElementById("divData").style.color = "white";
        break;
      case "Green":
        document.getElementById("divData").style.backgroundColor = "green";
        document.getElementById("divData").style.color = "white";
        break;
      case "Blue":
        document.getElementById("divData").style.backgroundColor = "blue";
        document.getElementById("divData").style.color = "white";
        break;
      case "Orange":
        document.getElementById("divData").style.backgroundColor = "orange";
        break;
    }

    /*
  savePosition();
  drawMap(fieldID);
  */
  }
}

function showHistoric() {
  // loop through the entire contents of localStorage
  // for (var key in localStorage)
  // {
  // //alert(key);
  // }
  //
  // retrive key Estaciona_ID guardado no localStorage
  var fieldID = localStorage.getItem("Park_ID");
  if (isNaN(fieldID) || fieldID == null) {
    //null
    alert("Sem registo de lugares");
    return;
  }
  var TextHTML = "";
  for (var i = fieldID; i >= 1; i--) {
    var fieldDate = localStorage.getItem("Park_Date_" + i);
    var fieldColor = localStorage.getItem("Park_Color_" + i);
    var fieldSeccao = localStorage.getItem("Park_Section_" + i);
    var fieldNumero = localStorage.getItem("Park_Number_" + i);
    var colorBack, colorFace;
    switch (fieldColor) {
      case "Yellow":
        colorBack = "yellow";
        colorFace = "black";
        break;
      case "Red":
        colorBack = "red";
        colorFace = "white";
        break;
      case "Green":
        colorBack = "green";
        colorFace = "white";
        break;
      case "Blue":
        colorBack = "blue";
        colorFace = "white";
        break;
      case "Orange":
        colorBack = "orange";
        colorFace = "black";
        break;
    }
    TextHTML +=
      "<div style='background-color:" +
      colorBack +
      "; color:" +
      colorFace +
      "'>";
    TextHTML += "<p style='font-size:8pt;'>" + fieldDate + "</p>";
    TextHTML += "<p>" + fieldSeccao + " - " + fieldNumero + "</p>";
    TextHTML += "</div>";
  }
  document.getElementById("divHistoric").innerHTML = TextHTML;
}

function deleteData(){
  var textData = "";
  document.getElementById("divData").innerHTML = textData;
  document.getElementById("divData").style.backgroundColor = "white";
  localStorage.setItem("Status", "History");
}

///Funciton to clear the store history of the places
function clearHistoric() {
  // retrive key Estaciona_ID guardado no localStorage
  var fieldID = localStorage.getItem("Park_ID");
  if (isNaN(fieldID) || fieldID == null) {
    //null
    alert("Sem registo de lugares");
    return;
  }
  for (var i = 1; i <= fieldID; i++) {
    localStorage.removeItem("Park_Date_" + i);
    localStorage.removeItem("Park_Color_" + i);
    localStorage.removeItem("Park_Section_" + i);
    localStorage.removeItem("Park_Number_" + i);
  }
  // update Park_ID
  localStorage.setItem("Park_ID", 0);
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
