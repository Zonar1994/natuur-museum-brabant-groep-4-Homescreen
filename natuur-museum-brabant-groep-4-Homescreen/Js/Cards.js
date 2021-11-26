var elem = document.querySelector('.carousel');
var cardInfo = document.querySelector('#cardInfo');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'center',
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  contain: true,
  on: {
    ready: function() {
      console.log('Flickity is ready');
    },
    change: function( index ) {
        switch(index){
            case 1:
                cardInfo.innerHTML="Scan de QR codes om de tentoonstellingen in Augmented Reality te zien!";
                break;
            case 2:
                cardInfo.innerHTML="Op deze pagina kan je al jouw behaalde badges zien";
                break;
            case 3:
                cardInfo.innerHTML="Krijg een overzicht van al je groepen met leerlingen, en welke badges zij hebben behaald";
                break;
            case 0:
                cardInfo.innerHTML="Wil je de tour starten? Klik dan hier!";
                break;
        }
    }
  }
});
flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    console.log(cellIndex);
    switch(cellIndex){
        case 0:
            window.location.href = "Pages/tour.html";
    }
});
