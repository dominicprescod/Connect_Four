# Dominic Prescod 

-----
# Connect 4

[http://dominicprescod.github.io/Connect_Four/](http://dominicprescod.github.io/Connect_Four/)

### Description
This is a description of the app
Connect Four (also known as Captain's Mistress, Four Up, Plot Four, Find Four, Fourplay, Four in a Row and Four in a Line) is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to connect four of one's own discs of the same color next to each other vertically, horizontally, or diagonally before your opponent. Connect Four is a strongly solved game. The first player can always win by playing the right moves.

The game was first sold under the famous Connect Four trademark by Milton Bradley in February 1974.

I took a slightly different approach and styled it using patterns from the 80's and SuperMario sounds!!

### Tech used / Stack
- Javascript Vanilla -> mainly used to set and check the tiles played
- jQuery -> most of the game grabbing and assigning elements
- CSS & HTML

### Features
- Responsive Design
- CSS sleectors
- Audio on click

### Future Implementations
- Working Ai
- Mobile Responsive


I spent most of the time working and perfecting the logic. It was important to get that out of the way before working on the application. The checkWin logic directly influenced how I set up the game and the functionality of the entire program. I used the index of the elements to setup a virtual grid of the board that I could use to properly analyze a win. A combination of adding and subtracting [1,8,7,6] evaluated the board for a win after every user turn. The function would scan the entire board and once it found one tile of color, it would check all of the surrounding positions for four matching tiles to indicate a win. 
The drawLogic that I got from Vincent added the amount of times the board was clicked and if it was equal to or greater than the number of elements on the board then it would declare a draw.

The other most challenging aspect was properly allocating time to work on bugs. Despite resolving all bugs and issues I wish I had more time to allocate towards the AI which is currently functional but could be responsive to user behavior and incorporate strategic behavior rather than randomization functions. 
