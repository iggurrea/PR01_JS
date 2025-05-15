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
  var fieldDate = new Date();
  // console.log(campoData);
  // Guardar os dados no LocalStorage
  localStorage.setItem("Park_Date", fieldDate);
  localStorage.setItem("Park_Color", fieldColor);
  localStorage.setItem("Park_Section", fieldSection);
  localStorage.setItem("Park_Number", fieldNumber);
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
  var fieldDate = localStorage.getItem("Park_Date");
  var fieldColor = localStorage.getItem("Park_Color");
  var fieldSection = localStorage.getItem("Park_Section");
  var fieldNumber = localStorage.getItem("Park_Number");
  // console.log(fieldDate);
  // console.log(fieldColor);
  // console.log(fieldSection);
  // console.log(fieldNumber);
  var textData = "";
  textData =
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
}
