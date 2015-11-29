//
//
//
//
var boardMap = {}; //{key: div-id, value: ghost obj}
var needAfix = false;

//
var Pos = function(x,y) {
  this.x = x;
  this.y = y;
};

Pos.prototype.getAsStr = function() {
  return this.x + "," + this.y;
};

//
var Ghost = function (id, position, color) {
  this.id = id;
  this.position = position;
  this.color = color;
};

Ghost.prototype.move = function(toPos) {
  console.log("moving from: " + this.position + " to: " + toPos);
};

//
function getIdFromCord(pos) {
  return "s-" + ((Math.floor(pos.y / 100)) + "-" + ((Math.floor(pos.x / 100)) +1));
}

//
// Start the party
//
$(document).ready(function() {
  var table = "";
  for (var i=1; i < 7; i++) {
    table += " <tr> ";
    for (var j=1; j < 7; j++) {
      
      table += " <td id='s-" + i + "-" + j + "'";
      boardMap['s-' + j + '-' + i] = "empty";
      if ( (i === 1 && j === 1) || (i === 1 && j === 6) ||
           (i === 6 && j === 1) || (i === 6 && j === 6) ) {
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
  var draggies = [];
  // init Draggabillies
  for ( var i=0, len = draggableElems.length; i < len; i++ ) {
    var draggableElem = draggableElems[i];
    var posX = draggableElem.parentElement.id.substr(2,1);
    var posY = draggableElem.parentElement.id.substr(4,1);
    var tPos = new Pos(posX, posY);
    var ghost = new Ghost(draggableElem.parentElement.id, tPos, draggableElem.getAttribute('data-color'));
    boardMap[ghost.id] = ghost;
    
    var draggie = new Draggabilly( draggableElem, {
      // bla-bla
    });
    
    draggies.push( draggie );
    
    var startingX = 0;
    var startingY = 0;
    draggie.on( 'dragStart', function( event, pointer ) {
        //console.log( "donw. ev" + JSON.stringify(event) + " pointer: " + JSON.stringify(pointer));
        startingX = event.clientX || pointer.clientX; 
        startingY = event.clientY || pointer.clientY;
        console.log("starting from: " + startingX + "," + startingY); //draggableElem.parentElement.id);

      });
      
    draggie.on( 'dragEnd', function( event, pointer ) {
      if (needAfix != false) {
        if (draggableElem.parentElement.id == needAfix.parentElement.id) {
          alert ("First fix your last move!");
          return;
        }
      }
        //console.log( "donw. ev" + JSON.stringify(event) + " pointer: " + JSON.stringify(pointer));
        var x = event.clientX || pointer.clientX; 
        var y = event.clientY || pointer.clientY;
        draggableElem.setAttribute('data-pos', x + "," + y);
        
        var id = getIdFromCord(new Pos(x,y));
        console.log("ending at: " + x + "," + y + " id: " + id);
        var tGhost = boardMap[id];
        if (tGhost !== "empty") {
          alert("You can't go there!");
          // TODO
          needAfix = draggableElem;
        }
        else {
          // update the board
          var fromId = getIdFromCord(new Pos( startingX , startingY));
          var tG = boardMap[fromId];
          boardMap[id] = tG;
          boardMap[fromId] = "empty";
          
        }
      });
    //console.log( i + ") Draggie element. Details:" + JSON.stringify(draggie));
  }


  $('.draggable').click(function(ev) {
    if ($(this).data('color') === 'blue') {
      $(this).addClass('red-solid');
      $(this).data('color', 'red');
      //$(this).html("R");  
      var key = $(this).parent()[0].id;
      var tGhost = boardMap[key];
      tGhost.color = 'red';
      //console.log ('id: ' + key);
      boardMap[key, tGhost];
    }
    else {
      $(this).removeClass('red-solid');
      $(this).data('color', 'blue');
      //$(this).html("B");
      var key = $(this).parent()[0].id;
      var tGhost = boardMap[key];
      tGhost.color = 'blue';
      console.log ('id for blue: ' + key);
      boardMap[key, tGhost];
    }
    //$(window).trigger('resize');
  });
  
  $("#but-ready").click(function() {
     $('.draggable').unbind("click");
     $("#but-ready").html("Go");
  });

 
};