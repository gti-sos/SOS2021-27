<script>
	import Router from 'svelte-spa-router';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicideFrontEnd/suicide.svelte';
	import SuicideEdit from './suicideFrontEnd/editSuicide.svelte'
	import Info from './info.svelte';
	import Landing from './Landing.svelte';


	const routes={
		'/':Landing,
		'/suicide-records':SuicideRecord,
		'/suicide-records/:province/:year':SuicideEdit,
		'/info':Info,
		'*':NotFound
		
	};

</script>

<main>

	<Router {routes}/>
</main>