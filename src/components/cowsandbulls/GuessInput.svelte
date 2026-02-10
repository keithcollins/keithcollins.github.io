<script>
	import { createEventDispatcher } from 'svelte';
	
	export let index = null;
	export let gameObj;
	export let showIntro = true;

	const dispatch = createEventDispatcher();

	let cows = '?';
	let bulls = '?';
	let inputClass = '';
	let blinking = true;

	function handleInput(e) {
		const letter = e.key;
		if (letter == 'Enter') {
			dispatch('submit');
			showIntro = false;
		} else if (letter == 'Backspace' && gameObj.currentInput.length) {
			gameObj.currentInput = gameObj.currentInput.slice(0, -1); 
		} else if (letter.length == 1 && letter.match(/[a-z]/i) && gameObj.currentInput.length < 4) {
			gameObj.currentInput += letter;
		}
	}

	$: {
		if (gameObj.animateScore) {
			gameObj.animateScore = false;

			// Animate in the score
			inputClass = 'entered';
	
			setTimeout(()=>{
				cows = gameObj.currentCows;
			},500);
	
			setTimeout(()=>{
				bulls = gameObj.currentBulls;
			},1000);
	
			setTimeout(()=>{
				if (gameObj.won || gameObj.lost) blinking = false;
				if (gameObj.won) inputClass = 'won';
				if (gameObj.lost) inputClass = '';
				if (!gameObj.won && !gameObj.lost) {
					cows = '?';
					bulls = '?'
					inputClass = '';
				}
			},1500);
		}
	}

	$: blinkingClass = (sqNum) => {
		return blinking && gameObj.currentInput.length+1 == sqNum ? 'blink' : '';
	}
	
</script>
<svelte:window on:keydown={handleInput}/>
<tr>
	<td class='num'>{index+1<10?'0':''}{index+1}</td>
	<td class='guess {inputClass}'>
		<div class='squares'>
			{#each [1,2,3,4] as sq}
				<div class='square {blinkingClass(sq)}'></div>
			{/each}
		</div>
		<div class='input'>{gameObj.currentInput}</div>
		<!-- <input
			bind:this={inputField}
			bind:value={value}
			on:keydown={handleInput}
			disabled={inputDisabled}
			type="text"
			minlength="4"
			maxlength="4"
			spellcheck="false"
			autocorrect="false"
			size="4"
		/> -->
	</td>
	<td class={+cows>0?'cows-points':'points'}>{cows}</td>
	<td class={+bulls>0?'bulls-points':'points'}>{bulls}</td>
</tr>

<style>
	.guess {
		position:relative;
	}

	.guess > .input {
		color:#000;
    letter-spacing: 12px;
    padding-left: 3px;
	}

	.guess.won .input {
		font-weight: bold;
	}

	.guess.entered .input {
		font-weight: bold;
		color:#282C34;
	}

	.guess > .squares {
		position: absolute;
		top:50%;
		left:0;
		transform: translateY(-50%);
		display: flex;
    justify-content: space-between;
		width:130px;
		z-index: -100;
	}
	.guess .square {
		background-color: #ddd;
		width: 30px;
    height: 40px;
		transition: background-color 200ms;
	}
	/* .guess.entered .square {
		background-color: #788191;
		box-sizing: border-box;
		animation: none;
	} */

	.guess .square.blink {
		animation: blink 6s infinite linear;
	}

	@keyframes blink {
    0% { background-color: #666; }
    50% { background-color: #ddd; }
    100% { background-color: #666; }
	}

	@media (max-width: 600px) {

	}

</style>