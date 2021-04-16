function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const errorStyle = "border: 2px solid;border-color:#e54858;";
// DOM Elements
// Form
const formElt = document.querySelector("form");
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const mail = document.querySelector("#email");
const birth = document.querySelector("#birthdate");
const tournaments = document.querySelector("#quantity");
const cities = document.querySelector("#cities");
const cgu = document.querySelector("#checkbox1");

// Modal
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const quiBt = document.querySelectorAll(".close, #btn-close"); // Adding all closing related elements

// Thank panel
const thankPanel = document.querySelector(".thanks");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Quit event
quiBt.forEach((btn) => btn.addEventListener("click", quitModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
}

function quitModal(){
  modalbg.style.display = "none";
  thankPanel.style.display = "none";
  document.body.style.overflow = "auto";
}

formElt.addEventListener("submit",function(e)
{
  e.preventDefault(); // Cancel default submit behaviour
  CheckFormData();
});

function CheckFormData(){
  ResetForm();
  var dataOk = true;
  // Checking first name
  if (prenom.value.length < 2){
    prenom.parentNode.getElementsByTagName('p')[0].style.display = "block"; // inputElt --> parentNode --> first child of type "p"
    prenom.style = errorStyle;
    dataOk = false;
    return;
  }
  // Checking last name
  if (nom.value.length < 2){
    nom.parentNode.getElementsByTagName('p')[0].style.display = "block";
    nom.style = errorStyle;
    dataOk = false;
    return;
  }
  // Checking email
  if(!emailIsValid(email.value)){
    email.parentNode.getElementsByTagName('p')[0].style.display = "block";
    email.style = errorStyle;
    dataOk = false;
    return;
  }
  if(Number.isNaN(getAge(birth.value)) || getAge(birth.value) < 5 || getAge(birth.value) > 110){
    birth.parentNode.getElementsByTagName('p')[0].style.display = "block";
    birth.style = errorStyle;
    dataOk = false;
    return;
    console.log("Age not valid");
  }
  // Checking tournaments value
  if(!valueIsNumber(tournaments.value)){
    tournaments.parentNode.getElementsByTagName('p')[0].style.display = "block";
    tournaments.style = errorStyle;
    dataOk = false;
    return;
  }
  // Checking locations 
  if(formElt.elements.location.value == ""){
    formElt.elements.location[0].parentNode.getElementsByTagName('p')[0].style.display = "block";
    cities.style = errorStyle + "padding: 6px;border-radius:9.2px;";
    dataOk = false;
    return;
  }
  //Checking CGU
  if(!cgu.checked){
    cgu.parentNode.getElementsByTagName('p')[0].style.display = "block";
    dataOk = false;
    return;
  }
  
  if (dataOk){
    // Fermer le panneau form
    quitModal();
    // Ouvrir le panneau thank
    thankPanel.style.display = "block";
  }
}

function ResetForm(){
  // Reset error texts
  document.querySelectorAll(".formData p").forEach((elt) => elt.style.display = "none");
  // Reset classic error border
  document.querySelectorAll("input").forEach((elt) => elt.style= "border: none;");
  // Reset area error border
  cities.style = "border: none;padding: 0;";
}

ResetForm();

/* Regex tools */
function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function valueIsNumber(value){
  return /^(0|[1-9][0-9]*)$/.test(value);
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}