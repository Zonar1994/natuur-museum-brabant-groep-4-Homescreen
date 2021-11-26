function relocate_home()
{
     location.href = "register.html";
} 

function login()
{
     location.href = "login.html";
} 

function home()
{
     location.href = "home.html";
} 

function wwcheck()
{
     location.href = "wachtwoordaanvraag.html";
} 
function index()
{
     location.href = "index.html";
} 

function loadanim() {
    var element = document.getElementById("card2");
    element.classList.add("cardstart-active");
    element.classList.remove("cardstart");
  }

  document.addEventListener('click', function(e){
    var element = document.getElementById("card2");
	if (document.getElementById('card2').contains(e.target)){
  	console.log("Clicked in Box");
  } else{
    element.classList.remove("cardstart-active");
    element.classList.add("cardstart");
  }
})

var input = document.getElementById('myinput');
var element = document.getElementById('card2');

input.addEventListener('focus', function() {
  element.classList.add("cardclick");
  card2.classList.remove("cardstart");
  console.log("Clicked in Box");
});

input.addEventListener('focusout', function() {
  card2.classList.remove("cardclick");
  element.classList.add("cardstart");
});