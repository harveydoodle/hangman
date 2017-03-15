/*
	Hangman
	---------------------------------------
	Let's make Hangman! Some code is already provided for printing
	a simple man as you guess wrong. Using the printHangman(count)
	function, add the code the print the man as someone gets
	wrong answers as well as the logic for the game.

	THIS ONE MUST BE DONE USING JSFIDDLE SINCE PROMPT IS USED.

	It would be helpful to write a command that allows you to stop 
	the game incase someone wants to quit.

	Your game wont be perfect but do your best!

	HINT: What type of conditional would be best for implementing
	the printHangman function? 
*/

// pick a word
// user chooses a letter
// if letters match, add word to its position
// if letter does not match, add a body part to hangman, add a count so user has 1 less life
// pick a word again ...

// if user wants to quit, provide quit button (replace  cancel?)
// if no more guesses left, prompt user.

setTimeout(function() {
	let answer = prompt("Pick a four-letter word! Type 'quit' if you want to stop playing."); // make it ***** ?
	// console.log(answer);
	const answerarray = answer.split(''); // array of the answer letters
	// console.log(answer[0]);
	for (i = 0; i < answerarray.length; i++) {
		let answerblank = document.getElementById(`border-bottom${i}`);
		answerblank.innerHTML = answerarray[i];
		// console.log(answerarray[i]);
	}
	// console.log(answerarray);

	let count = 0; // number of times user guesses wrong letter
	let win = 0; // numer of times user guesses correctly 
	let word = answer.length ; // 'blank' word that user attemps to complete // use for # of underscores
	let gameWin = word - count; // number of guesses left
	let hangmanarray = ["&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;) <br>",
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;|&nbsp;/<br>",
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>",
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\\"
						];
	let pastguesses = '';

	let hangman = function printHangman(count) {
		let man = '';
		for (i = 0; i < count; i++) {
			man += hangmanarray[i];
		}

		const display = document.getElementById('hangmandisplay')
		display.innerHTML = man;
		setTimeout(function() {
			play();
		}, 500);
	}

play();

	function play() {
		if (gameWin > 0 && (count < 4 && win < 4 )){
			let guess = prompt("Pick a letter!");

			let reg = new RegExp(guess, 'gi')

			
			
			if (guess.toLowerCase() === 'quit') {
				return;
				console.log('You quit the game.'); 
			}

			else if (win === 4) {
				console.log(`Congrats!`);
			}

			else if (count === 4 ) {
				console.log(`Sorry :(`);
			}

			else if (guess.length === 1 && pastguesses.match(reg)) { // if letter already guessed
				console.log(`You guessed ${guess} already!`);
				// add the letter to underscore
				hangman(count);
			}
			else if (guess.length === 1 && answer.match(reg)) { // if user inputs 1 letter and it matches a letter in 'answer'
				win += 1;
				pastguesses += guess;
				for (i = 0; i < answer.length; i++) {
					if (guess === answerarray[i]){
						$(`#border-bottom${i}`).css("color", "blue");
					}
				}
				console.log(`You guessed ${guess} correctly! ${gameWin} more guesses.`);
				// add the letter to underscore
				hangman(count);
			}
			else if (guess.length === 1 && guess !== answer.match(reg)) {
				count += 1;
				pastguesses += guess;
				gameWin = word - count; // so that gameWin value updates
				console.log(`You guessed ${guess} incorrectly! ${gameWin} more wrong answers and you lose.`);
				// add a bodypart
				hangman(count);
			}
			else {
				prompt("Please try again. Pick a letter!"); 
				hangman(count);
			}
		}
	}
}, 200);