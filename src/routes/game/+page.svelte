<script>
	let message = 'It is your turn to move.';
	let player = 'X';
	let plane = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];
	let winnermodalOpen = false;
	let tieModalOpen = false;

	/**
	 * @param {number} row
	 * @param {number} col
	 */
	function handleClick(row, col) {
		if (plane[row][col] == '') {
			plane[row][col] = player;
			if (checkWinner()) {
				winnermodalOpen = true;
			} 
			else if (checkTie()){
				tieModalOpen = true;
			}
			else {
				player = player == 'X' ? 'Y' : 'X';
				message = 'Your turn to move.';
			}
		} else {
			message = 'Incorrect move. Try again.';
		}
	}

	function checkTie(){
		return plane.every(row => row.every(c => c != ""));
	}

	function checkWinner() {
		return (
			plane.some((row) => row.every((it) => !!it && it === row[0])) || // Alla rader horisontellt
			(!!plane[0][0] && plane[0][0] === plane[1][0] && plane[0][0] === plane[2][0]) || // första lodräta
			(!!plane[0][1] && plane[0][1] === plane[1][1] && plane[0][1] === plane[2][1]) || // andra lodräta
			(!!plane[0][2] && plane[0][2] === plane[1][2] && plane[0][2] === plane[2][2]) || // tredje lodräta
			(!!plane[0][0] && plane[0][0] === plane[1][1] && plane[0][0] === plane[2][2]) || // första diagonalen
			(!!plane[0][2] && plane[0][2] === plane[1][1] && plane[0][2] === plane[2][0])
		); // andra diagonalen
	}

    function reset(){
        message = 'It is your turn to move.';
	    player = 'X';
	    plane = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        winnermodalOpen = false
		 tieModalOpen = false
    }
</script>

<main class="container">
	<hgroup>
		<h1>Player: {player}</h1>
		<h2>{message}</h2>
	</hgroup>
	<div class="plane container-fluid">
		{#each plane as row, y}
			<section class="grid row">
				{#each row as col, x}
					<button on:click={() => handleClick(y, x)} class="tictacer">
						{#if col === 'X'}
							<svg id="cross" viewBox="0 0 64 64" width="100%" height="100%">
								<image xlink:href="cross.svg" width="64" height="64" />
							</svg>
						{/if}
						{#if col === 'Y'}
							<svg id="circle" viewBox="0 0 64 64" width="100%" height="100%">
								<image xlink:href="circle.svg" width="64" height="64" />
							</svg>
						{/if}
					</button>
				{/each}
			</section>
		{/each}
		{#if winnermodalOpen}
            <dialog open>
				<article>
                    <h2>🏅 Congratulations {player === 'X' ? 'X:s' : 'O:s'}!!</h2>
					<p>Do you want to play another round?</p>
                    <button on:click={() => reset()}>Yes please!</button>
					<a role="button" class="secondary" href="/">No, take me back</a>
				</article>
			</dialog>
		{/if}
		{#if tieModalOpen}
		<dialog open>
			<article>
				<hgroup>
					<h2>🏅 It's a draw!</h2>
					<h3>You are both winners in my eyes.</h3>
				</hgroup>
				<p>Do you want to play another round?</p>
				<button class="primary" on:click={() => reset()}>Yes please!</button>
				<a role="button" class="secondary" href="/">No, take me back</a>
			</article>
		</dialog>
	{/if}
	</div>
</main>

<style>
	.plane {
		width: 50%;
		min-width: 320px;
	}
	.tictacer {
		aspect-ratio: 1 / 1;
		border-radius: 20%;
		border-style: groove;
	}
	.tictacer:hover {
		border-style: ridge;
	}
</style>
