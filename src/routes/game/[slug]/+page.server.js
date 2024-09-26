import { error } from '@sveltejs/kit';


export async function load({fetch, params }) {
	const res = await fetch(`/api/game/${params.slug}`);
	if(!res.ok){
		throw error(404)
	}
	return await res.json();
}
