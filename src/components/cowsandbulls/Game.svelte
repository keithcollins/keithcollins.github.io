<script>
	import {gameObj} from './store.js';
	import GuessInput from './GuessInput.svelte';
	import Guess from './Guess.svelte';
	import Keyboard from './Keyboard.svelte';
	import dictionary from './wordsSelect.json';
	
	let showIntro = true;
	
	// Get the magic word from gameObj
	$: magicWord = $gameObj.magicWord;

	function enterGuess() {
		const newGuess = $gameObj.currentInput.toLowerCase();
		const guessArr = newGuess.split('');
		let message = '';
		let messageClass = '';

		$gameObj.message = '&nbsp;';
		
		// Check for errors
		if ($gameObj.guesses.length && $gameObj.guesses.map(d=>d.word).indexOf(newGuess) > -1) {
			message = '🚫 You already guessed that word!';
			messageClass = 'error';
		} else if (guessArr.length !== 4) {
			message = '🚫 Only four-letter words are allowed.';
			messageClass = 'error';
		} else if ([...new Set(guessArr)].length !==4) {
			message = '🚫 All four letters must be unique.';
			messageClass = 'error';
		} else if (dictionary.indexOf(newGuess)===-1) {
			message = '🚫 That word was not found in the dictionary.';
			messageClass = 'error';
		}

		// Short delay before error message
		if (messageClass == 'error') {
			return setTimeout(()=>{
				$gameObj.message = message;
				$gameObj.messageClass = messageClass;
				message = '';
				messageClass = '';
			},200);
		}

		// Score new guess
		guessArr.forEach((guessLetter,i)=>{
			if (guessLetter == magicWord[i]) {
				$gameObj.currentBulls++;
			} else if (magicWord.indexOf(guessLetter)>-1) {
				$gameObj.currentCows++;
			}
		});

		// Send a message based on the answer
		if (newGuess.toLowerCase() == magicWord) {
			$gameObj.won = true;
			message = `🏆 You got it in <strong>${$gameObj.guesses.length+1} tries</strong>! The word was <strong>${magicWord.toUpperCase()}</strong>.`;
			messageClass = 'win';
		} else if ($gameObj.guesses.length == $gameObj.maxGuesses-1) {
			$gameObj.lost = true;		
			message = `🥲 So close! The word was <strong>${magicWord.toUpperCase()}</strong>.`;
			messageClass = 'error';
		} else if ($gameObj.currentCows == 0 && $gameObj.currentBulls == 0) {
			message = '🧐 Now you can rule out all of those letters!';
			$gameObj.ruledOut += newGuess.toUpperCase();
		} else if ($gameObj.currentCows > 0 && $gameObj.currentBulls > 0) {
			message = '🤔 Lots of possibilities here!';
		} else if ($gameObj.currentBulls > 0) {
			message = '🎯 Bullseye!';
		} else if ($gameObj.currentCows > 0) {
			message = '😅 Now turn those cows into bulls!';
		}

		$gameObj.animateScore = true;

		setTimeout(()=>{
			
			$gameObj.message = message;
			$gameObj.messageClass = messageClass;

			if (!$gameObj.won && !$gameObj.lost) {
				$gameObj.currentInput = '';
				$gameObj.guesses.push({
					word: newGuess,
					cows: $gameObj.currentCows,
					bulls: $gameObj.currentBulls,
				});
				$gameObj.guesses = $gameObj.guesses;
			}

			$gameObj.currentBulls = 0;
			$gameObj.currentCows = 0;

		},1500);
	}

</script>

<div class='cowsandbulls'>

	<h1><a href='/cowsandbulls'><span>COWS</span>&<span>BULLS</span></a></h1>

	<table>
		<thead>
			<tr>
				<th colspan='2'>guesses ({$gameObj.lost ? 0 : $gameObj.maxGuesses-$gameObj.guesses.length} left)</th>
				<th>cows</th>
				<th>bulls</th>
			</tr>
		</thead>
		<tbody>
			<GuessInput 
				on:submit={enterGuess}
				bind:showIntro={showIntro}
				gameObj={$gameObj}
				index={$gameObj.guesses.length}
			/>
			{#each [...$gameObj.guesses].reverse() as guess,i (guess)}
				<Guess {guess} index={$gameObj.guesses.length-i} />
			{/each}
		</tbody>
	</table>

	<Keyboard 
		bind:currentInput={$gameObj.currentInput}
		bind:showIntro={showIntro}
		on:submit={enterGuess}
		gameObj={$gameObj}
	/>

</div>

<style>
	/* https://coolors.co/20b2aa-ffbc42-d81159-b8b3be-696d7d */
	/* https://coolors.co/282c34-788191-e06c75-be5046-98c379-7a9f60-e5c07b-d19a66-61afef-3b84c0 */

	.cowsandbulls {
		max-width:400px;
    font-family: 'Source Code Pro', monospace;
    font-size: 35px;
    font-weight: 400;
		line-height: 1.2;
		margin:0 auto;
	}

	h1 {
		margin:15px 0 10px;
		text-align: center;
		letter-spacing: 12px;
		font-size: 35px;
	}
	h1 > a {
    text-decoration: none;
    color: #666;
	}
	h1 > a > span {
		color:#FFBC42;
		text-shadow: 0px 0px 1px rgba(0,0,0,0.7);
	}
	h1 > a > span:last-child {
		color:lightseagreen;
	}

	table {
		width:100%;
		margin-bottom: 20%;
	}

	th {
		text-align: left;
		text-transform: uppercase;
		font-size: 16px;
    padding-bottom: 10px;
		font-weight: 500;
    color: #666;
	}

	:global(.cowsandbulls > table td) {
		text-align: left;
		text-transform: uppercase;
		font-weight: 400;
		color:#666;
		width:15%;
	}
	:global(.cowsandbulls > table .num) {
		color:#ddd;
		font-weight: 500;
		width:20%
	}
	:global(.cowsandbulls > table .guess) {
    letter-spacing: 12px;
		width:50%;
	}

	:global(.cowsandbulls > table td.cows-points) {
		font-weight: bold;
		/* color:lightsalmon; */
		color:#FFBC42;
	}

	:global(.cowsandbulls > table td.bulls-points) {
		font-weight: bold;
		/* color:mediumseagreen; */
		color:lightseagreen;
	}

	:global(.cowsandbulls > table td.points) {
		font-weight: 400;
		color:#666;
	}

	@media (max-width: 395px) {
		.message > p {
			margin-bottom: 8px;
		}
	}

	/* 414: iPhone 6/7/8 Plus, XR,   */
	/* 390: iPhone 12/13 Pro */
	/* 375: iPhone 6/7/8, SE, X, 11 PRO */
	/* 320: iPhone 5/SE */
</style>