<script>
import { createEventDispatcher } from 'svelte';

export let gameObj;
export let currentInput = '';
export let showIntro = true;

const enter = '⮑';
const backspace = '⬅';
const buttons = [
	'QWERTYUIOP',
	'ASDFGHJKL',
	`${enter}ZXCVBNM${backspace}`
];
const dispatch = createEventDispatcher();
const select = letter => () => handleKeyClick(letter);

let containerHeight;

function handleKeyClick(letter) {
	if (letter == '⮑') {
		dispatch('submit');
		if (showIntro) showIntro = false;
	} else if (letter == '⬅' && currentInput.length) {
		currentInput = currentInput.slice(0, -1); 
	} else if (currentInput.length < 4) {
		currentInput += letter;
	}
}

function handleWindowClick(e) {
	const yPos = window.innerHeight-e.pageY;
	if (showIntro && containerHeight && yPos > containerHeight) {
		showIntro = false;
	}
}

function handleTabClick() {
	showIntro = !showIntro;
}

$: getKeyClass = (letter) => {
	let cls = [];
	if (gameObj.ruledOut.indexOf(letter)>-1) cls.push('ruled-out');
	if (letter == enter || letter == backspace) cls.push('wider');
	return cls.join(' ');
}

</script>

<svelte:window on:click={handleWindowClick}/>

<div class='bottom-container' bind:clientHeight={containerHeight}>

	<div class='intro {showIntro?'':'closed'}' on:click={handleTabClick}>
		{#if !showIntro && gameObj.message}
			<div class='message {gameObj.messageClass}'>{@html gameObj.message}</div>
		{/if}
		<div class='question'>?</div>
		<div class='instructions'>
			Guess a four-letter word that has four unique letters. 
			A <strong>bull</strong> is a correct letter in the correct position.
			A <strong>cow</strong> is a correct letter in an incorrect position.
			You can enter up to <strong>{gameObj.maxGuesses} guesses</strong>.
		</div>
	</div>

	<div class='keyboard'>
		{#each buttons as row}
			<div class='key-row'>
				{#each row.split('') as letter}
					<div 
						class='key {getKeyClass(letter)}' 
						on:click={select(letter)}>
							{letter}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>

	.bottom-container {
		font-size:22px;
		background-color: white;
		width:100%;
		max-width: 400px;
		position: fixed;
		bottom:0;
	}
	.key-row {
		display: flex;
		justify-content: center;
		margin-left: 2px;
	}
	.key {
		/* width:35px;  */
		width:9.2%; 
		height:55px;
		text-align: center;
		line-height: 55px;
		background-color:#ddd;
		border-radius: 2px;
		margin-right:3px;
		margin-bottom: 3px;
	}

	.key.ruled-out {
		color:#999;
	}

	.key.wider {
		width:14%; 
	}

	.intro {
    transition: opacity 1s;
    opacity: 1;
    font-family: 'Roboto', sans-serif;
		font-size: 16px;
    padding: 20px;
		color:#666;
    background-color: #eee;
    margin-bottom: 5px;
	}

	.intro .question {
    width: 21px;
    height: 21px;
    line-height: 21px;
    margin-top: 1px;
    border-radius: 50%;
    background-color: #666;
    color: white;
    float: left;
    text-align: center;
    font-weight: 500;
	}

	.intro .instructions {
		margin-left:26px;
		transition: all 1s;
		width:100%;
	}

	.intro.closed {
		padding: 5px 6px;
		display: flex;
	}

	.intro.closed .question {
		float: none;
		margin-left: auto;
	}

	.intro.closed .instructions {
		display:none;
	}

	.message {
		line-height: 1.5;
	}

	.message.error {
		color:#D81159;
	}

	.message.win {
		color: lightseagreen;
	}

	@media (max-width: 395px) {
		.bottom-container {
			left:0;
		}
	}

	@media (min-width: 600px) {
	}

</style>