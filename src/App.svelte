<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicideFrontEnd/suicide.svelte';


	const routes={
		'/':Home,
		'/suicide-records':SuicideRecord,
		'*':NotFound
	};

</script>

<main>

	<Router {routes}/>
</main>