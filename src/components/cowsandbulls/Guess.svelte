<script>	
	export let guess = null;
	export let index = null;
</script>

{#if guess}
	<tr>
		<td class='num'>{index<10?'0':''}{index}</td>
		<td class='guess prev'>{guess.word}</td>
		<td class={+guess.cows>0?'cows-points':'points'}>{@html guess.cows}</td>
		<td class={+guess.bulls>0?'bulls-points':'points'}>{@html guess.bulls}</td>
	</tr>
{/if}
<style>

	@media (max-width: 600px) {
	}

</style>