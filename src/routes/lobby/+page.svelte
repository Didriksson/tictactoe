<script>
	import { onMount } from 'svelte';

	let rooms = [];

	onMount(async () => {
		const res = await fetch(`/api/rooms`);
		rooms = await res.json();
	});
</script>

<article>
	<header>Rooms</header>
	<body>
		<h4>Available</h4>
        {#each rooms as room}
            <article>
                <p>{room.players}</p>
                <a role="button" href="/game/{room.id}">Join</a>
            </article>
        {/each}            
		<a href="/" role="button">Create room</a> <a class="secondary" href="/" role="button">Back</a>
	</body>
</article>


<style>

</style>