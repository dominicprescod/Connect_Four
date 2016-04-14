$(function(){
// ===================================================
// Creating a simple animation with the #4 when the window loads
  var remove = [1,3,5,7,12,13,15];
  var r = 0;

$('td').each(function(i){
  if (i === remove[r]) {
    setTimeout(function(){
      $('td').eq(i).css('background','red');
    }, 500);
    setTimeout(function(){
      $('td').eq(i).css('background','black');
    }, 1000);
    setTimeout(function(){
      $('td').eq(i).css('background','#3FC380');
    }, 1500);
    r++;
  }
});
// ===================================================

$('#radio').click(function(){
  if(players.length === 0){
      if ($('#button').css('margin-left') === '0px'){
        $('#button').css("margin-left", "70px");
        // $(this).css('background', 'black');
        $(this).css('background-position','-15px -12px');
          setTimeout(function(){
            $("#button h5").html('&#xe805')
                          .css({
                            'padding':'6px',
                            'font-size': '17px'
                          });
            $('#p2').hide();
            $('#messages h1').text('Enter Player Name');
          },500);
        } else {
          $('#button').css("margin-left", "0px");
          // $(this).css('background', 'white');
          $(this).css('background-position','17px -77px');
          setTimeout(function(){
            $("#button h5").html('&#xe809')
                          .css({
                            'padding':'2px',
                            'font-size': '20px'
                          });
            $('#p2').show();
            $('#messages h1').text('Enter Player Names');
          },500);
      }
    }
  });


// ==================================================================
// Necessary mechanics variables
var control     = [35,36,37,38,39,40,41], //allows gameplay for each column (minus by 7 to fill each tile)
    n           = 0, //allows to switch between first and second player (switches to 1||0 throughout the game)
    choices     = ['red','black'], //color choices available
    checks      = [1,8,7,6,-1,-8,-7,-6],//for the winning condition to move in each direction to find a connect
    checkDraw   = 0, //checks the tiles played(amount of times the board has been played) if greater than or equal to 41 the game is a tie
    winnerFound = false, //because the winner checks are done within loops, need an external variable that can be checked in global scope
    players     = [], //used to store the names of the players and activates the aI when choosen provided the second element is 'Computer'
    //checks to make sure that checkWinner() isnt evaluating wins across the edge of the board
    edgeL       = [6,13,20,27,34,41],
    edgeR       = [0,7,14,21,28,35];


// jQuery / DOM elements setting up the user interface
var $board          = $('.board'),
    $boardControl   = $('.control'),
    $reset          = $('<button>Reset</button>').css('width','20%'),
    $done           = $('<button>Done</button>'),
    $replay         = $('<button>Replay</button>');
// console.log($p1);

// Starting the game, user has to choose either User or Computer.
// depending on the choice, either enters two names for two players
// or one to play against the computer


$('#display h1').hide();

$('#display button').click(function(){
  $('#display input,button').hide();
  if(($('#button').css('margin-left') === '0px')){
    players.push($('#p1').val(), $('#p2').val());
  } else {
    players.push($('#p1').val(), 'Computer');
  }

    $('#messages').hide();
    $('#display h1').text(players[n])
                    .show();
    $('#display').append($reset);
});

//reset function that sets the board to its original state when clicked
$reset.click(function(){
  control = [35,36,37,38,39,40,41];//set the first play to the lowest number in each "column"
  $board.each(function(index){//for loop substitute
    $board.eq(index).css('background','');//sets all td's to no background -->''
  });
  n = 0; // sets back to 0 to show the first person to play in the players array
  $('#display h1').text(players[n]);//shows the first player to play
});

var aI = function(){
  //only plays when the 'Computer is the second element in the players array
  // also only plays when ther winnerFound is set to false
  if(!(winnerFound) && (players[1] === 'Computer')){
    // delays game play to give the illusion of the aI contemplating its next move
    setTimeout(function(){
        var randomNumber = Math.floor(Math.random()*7); //provides a random number to be played from 0 - 6
        $board.eq(control[randomNumber]).css('background',choices[n]);//sets the board to the current color played red||black
        checkDraw++; //logs the play to check if there's been a draw
        n = (n === 0) ? 1 : 0;//switches between red and black
        control[randomNumber] -= 7; //allows the board to not play in a played spot - minus the current index by 7 to get the one right above it
        $('#display h1').text(players[n]); //shows the next player
         checkWinner();
      },500);
  }
};

// Setting up click function on the board
$boardControl.click(function(){
  //checks to see if the column clicked is full
  if(control[$(this).index()] >= 0) {
    $board.eq(control[$(this).index()]).css('background',choices[n]); //sets the available tile to the players color
    n = (n === 0) ? 1 : 0; //switches the display to the next player
    control[$(this).index()] -= 7; //logs the play in the control function
    checkDraw++; //logs the play to check for a draw
  }
  $('#display h1').text(players[n]); //shows the next player to play
  checkWinner(); //checks winner
  aI(); //activates the aI move
});

var checkWinner = function(){
// loops through each tile on the board
  $board.each(function(index){
    // switches between the red or black choices checking for a win on each color
    for(var z = 0; z < choices.length; z++){
      // if a tile is played ie red or black it activates the checks
      if($board[index].style.background === choices[z]){
        // loops through the checks incrementing or decrementing the index position of the saved tile taking a snap shot of the four positoins surrounding it
        for(var i = 0; i < checks.length; i++){
            var a = index,
                b = a + checks[i],
                c = b + checks[i],
                d = c + checks[i],
                edgeCheck = false;
                for(var e = 0; e < edgeR.length; e++){
                  //because continue will jump out of THIS current loop needed to set a variable outside of the loop that can be changed to check if the criteria is met ie b||c is an edge #
                  if((b === edgeL[e])|| (b === edgeR[e])) edgeCheck = true;
                  if((c === edgeL[e])|| (c === edgeR[e])) edgeCheck = true;
                }
                // fixing bug that developed from my edgeCheck..wouldnt check for wins on the edge columns..setting the edgeCheck to false when a & d are both edge numbers of the same column
                for(var k = 0; k < edgeR.length; k++){
                  for(var l = 0; l < edgeR.length; l++){
                    if(a === edgeL[k] && d === edgeL[l]) edgeCheck = false;
                    if(a === edgeR[k] && d === edgeR[l]) edgeCheck = false;
                  }
                }
                // creating a limit for the board not less than 0 and not greater than 41 if it is the loop moves on to the other factor
            if( (b < 0) || (c < 0) || (d < 0) ) continue;
            if( (b > 41)  || (c > 41) || (d > 41) ) continue;
            if(edgeCheck) continue; //if edge check is true it activates continue and skips this check
            // if the four positions saved are all the same color then we have a winner!!
            if( ($board[a].style.background === choices[z]) && ($board[b].style.background === choices[z]) && ($board[c].style.background === choices[z]) && ($board[d].style.background === choices[z]) ){
              // sets each position to green to show the winning tiles
              $board.eq(a).css('background','green');
              $board.eq(b).css('background','green');
              $board.eq(c).css('background','green');
              $board.eq(d).css('background','green');
              winnerFound = true;//deactivates the aI
              displayWinner(); //Shows the current winner
            }
            if(checkDraw >= 42) displayWinner(); //shows that the game is drawn
          }
        }
      }
    });
  };


var displayWinner = function() {
  choices = []; //stops the user from entering plays on the board
  setTimeout(function(){ //delays the switch so the user can see where they one
    $("#messages").append($done)
                  .append($replay); //shows a 'Done' & 'Replay' button
    $reset.hide();
    n = (n === 0) ? 1 : 0;//switches to the previous player that won
    // shows that the game has been drawn
    if(checkDraw >= 42){
      $('#messages h1').text('Its a DRAW!');
    } else {
      $('#messages h1').text(players[n]+' WINS!');//shows the winner!
    }
    $('#messages').show();
    // click event for the done and replay buttons
    $done.click(function(){
      $done.remove(); $replay.remove(); //removes replay button
      $('#messages h1').text('Thanks for playing!'); //displays message
      setTimeout(function(){ //waits 2.5 seconds thens reloads the page
        location.reload();
      },2500);
    });
    $replay.click(function(){//replay button simply reloads the page
      location.reload();
    });
  },500);
};


});
