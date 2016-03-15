
#Connect Four
[http://dominicprescod.github.io/Connect_Four/](http://dominicprescod.github.io/Connect_Four/)

A remake of the classic game from the 70's and 80's
Users can play against their friends or try their luck playing against the computer.

#Tech Used
 - jQuery
 	- Used throughout the app to manipulate DOM elements for gameplay and used to write the logic for the game. The app used two main functions.
 		- ```checkWinner()``` that checked the board on each click for a winning combination. It takes a snapshot of each position played and also takes a snapshot of the surrounding tiles via for and forEach loops. After the snap shot it eliminates disqualified winning matches that extend the board. Once all checks are complete if it finds four tiles with the matching colors the game ends and it declares a winner.
 		- ```aI()``` A simpler version of an AI uses a random number generator to choose a playing position after the user makes their move.
- HTML & CSS

#Future Implementations
- Strategic AI() that prevents player wins and
- Better design using AngularJS
- Mobile responsive with the ability to play on mobile devices with ease
