$( document ).ready(function() {
  displayLatestWarning();
  makeImagesZoomable();
});

$(window).on('hashchange', function(){
  displayLatestWarning();
});

function displayLatestWarning(){
  $( ".latest-warning" ).css( "display", $(location).attr('href').includes(latestWarningTrigger)?"inherit":"none" );
}

function makeImagesZoomable(){
  $('img').each(function (index, value){
    $(this).zoomify();
  });
}
