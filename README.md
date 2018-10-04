# :black_joker: [Memory Game](https://kates-memory-game.herokuapp.com/)

By [Kate Miller](https://katekaho.com/)

## :memo: Instructions

1. Navigate to [repo](https://github.com/katekaho/memory-game)
2. Clone locally using
 `git clone https://github.com/katekaho/memory-game.git`
3. Install dependencies using `npm install`
4. Start your server using `npm start`
5. Navigate to app in [browser](http://localhost:3000)
6. Enjoy! I also hosted the site on Heroku so you can view it [here](https://kates-memory-game.herokuapp.com/)

## :books: Discussion

I used the following technologies: React, HTML, CSS

## :page_with_curl: Requirements

#### Must use ReactJS

Used create-react-app to generate scaffolding for the app

#### Must have a README file for building and running the app

You're reading it right now :)

#### Must place in a public github/bitbucket repo that we can access.

If you made it here you can tell it's on github

#### The cards may be differentiated by colors, numbers, pictures or icons

Used numbers to differentiate the cards

#### The game must be able to:

1. Notify the user if they win or lose
  * For single player, the game notifies the player that they won when they match all pairs. The variable `endGame` in the state of `App.js` gets set to `true` which causes the message gets displayed in `GameStatus.js`. Since I did not enforce a time limit, there is currently no way to lose, similar to solitare.

2. Allow the user to reset at any time
  * The game resets when the reset button in `GameStatus.js` is clicked. The handler is passed to `App.js` where `handleResetClicked()` sets the timer to 0, resets the score, and clears the winning message (if any) by setting `endGame` to false.

3. Randomize the 'cards' layout every game
  * The function `createGrid()` in `App.js` is called whenever a new game is started. It creates a new grid based on the current difficulty and shuffles the grid each time it is called using the Fisher-Yates shuffle.

4. The game grid must be at least 6x6 cards
  * The default difficulty is initally set to 2x2 for demonstration purposes but the difficulty can be changed at any time in the home screen by selecting set difficulty. The difficulty can be set to any number, it is a variable in the state of `App.js` which you can play around with if you want.


## :star: Bonus Points!

#### Multi Player mode

Decided not to do due to time constarnts. I did set up the structure and options, and the view is commented out. If I had more time, I would try using Socket.IO with Express to create game rooms of various difficulties that pairs could join.

#### Tracking Scores

The game currently tracks the total number of pairs matched so far out of total pairs. It does so within `App.js` in the `handleCardClicked()` function.  The value `score` gets updated in the state whenever it detects that there is a new number of matched pairs.

#### Tracking Best Score

The best score for each difficulty is kept track of in the state as an object called `highScore` in the state of `App.js`. When the player wins a game, the high score is updated for their difficulty unless their new score is worse than the current one. This check occurs in `handleCardClicked()` in App.js at the end of the function.

#### Tracking Time

The time is a variable in the state of `App.js` called `time`. When a game is started, a new interval is created which sets the updates the state of the time every second. I format the time within `GameStatus.js` within the `formatTime()` function

#### Adjustable number of cards in the game (difficulty levels)

The difficulty of the game is adjustable and can be set in the home screen, it exists as a variable within the state of `App.js`. I have specific difficulties set for CSS/styling reasons but the game does work for any difficulty (except when the number of cards is odd for obvious reasons). The difficulty is represented as one number, with is the length and width of the board. I chose to do a square to make the design simple.

## :flower_playing_cards: Rules of the Memory Game Itself

a. The cards should be laid out in a grid.
  * Used CSS grid to accomplish this

b. Click to turn over any two cards.
  * Cards are selected by clicks, which trigger the `handleCardClicked()` function that updates the game state accordingly

c. If any two cards match, keep them in a revealed state.
  * The state of each card is in the state of `App.js` as objects in an array of `grid`. When the game detects that the current card matches the other card that is flipped over, the `flipped` value remains `true`.

d. If they don't match, turn them back over.
  * I set a timeout that flips the cards back over one second after the second card has been flipped over

e. (If in multiplayer mode) Watch and remember during the other player's turn.
  * Not implemented

f. The game is over when all the cards have been matched
  * The game ends, the timer freezes, and the score and high score is displayed upon game completion.
