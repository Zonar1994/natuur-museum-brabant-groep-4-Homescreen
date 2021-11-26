document.addEventListener("DOMContentLoaded", function(){
    var popup = document.getElementById("cards");
    var myPopup = document.getElementById("myPopup");


    popup.addEventListener("click", myFunction);

    function myFunction() {
        myPopup.classList.toggle('show');
    }

    var popup1 = document.getElementById("cards1");
    var myPopup1 = document.getElementById("myPopup1");


    popup1.addEventListener("click", myFunction1);

    function myFunction1() {
        myPopup1.classList.toggle('show');
    }

    var popup2 = document.getElementById("cards2");
    var myPopup2 = document.getElementById("myPopup2");


    popup2.addEventListener("click", myFunction2);

    function myFunction2() {
        myPopup2.classList.toggle('show');
    }

    var popup3 = document.getElementById("cards3");
    var myPopup3 = document.getElementById("myPopup3");


    popup3.addEventListener("click", myFunction3);

    function myFunction3() {
        myPopup3.classList.toggle('show');
    }
});