$(document).ready(function() {
  var table = "";
  for (var i=1; i < 7; i++) {
    table += " <tr> ";
    for (var j=1; j < 7; j++) {
      
      table += " <td id='s-" + i + "-" + j + "'";
      if ( (i == 1 && j == 1) || (i == 1 && j == 6) ||
           (i == 6 && j == 1) || (i == 6 && j == 6) ) {
        table += " class='target-cell' >";
      }
      else {
        table += " class='normal-cell' >"
      }
      
      if ( (j > 1 && j < 6) && (i < 3 || i > 4 ) ) {
        table += "<div class='draggable' data-color='blue'> </div>";
      }
      table += " </td> ";
    }
    table += " </tr> ";
  }
  $("#table-body").html(table);
  
  
});

window.onload = function () {
  // if you have multiple .draggable elements
  // get all draggie elements
  var draggableElems = document.querySelectorAll('.draggable');
  // array of Draggabillies
  var draggies = []
  // init Draggabillies
  for ( var i=0, len = draggableElems.length; i < len; i++ ) {
    var draggableElem = draggableElems[i];
    var draggie = new Draggabilly( draggableElem, {
      // options...
    });
    
    draggie.on( 'pointerDown', function( event, pointer ) {
      console.log( "donw. ev" + event + " pointer: "+pointer);
    });
    draggies.push( draggie );
    //console.log( i + ") Draggie element. Details:" + JSON.stringify(draggie));
  }

//  var dra = $('.draggable').data('draggabilly');
//  // access Draggabilly properties
//  console.log( 'draggie at ' + dra.position.x + ', ' + dra.position.y );

  $('.draggable').click(function(ev) {
      if ($(this).data('color') === 'blue') {
        $(this).addClass('red-solid');
        $(this).data('color', 'red');
        $(this).html("Red");
        
      }
      else {
        $(this).removeClass('red-solid');
        $(this).data('color', 'blue');
        $(this).html("Blue");
      }
      $(window).trigger('resize');
    });
  
  $("#but-ready").click(function() {
     $('.draggable').unbind("click");
     $("#but-ready").html("Go");
  });

 
};