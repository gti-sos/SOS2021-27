<script>
	import Router from 'svelte-spa-router';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicideFrontEnd/suicide.svelte';
<<<<<<< HEAD
	import SuicideEdit from './suicideFrontEnd/editSuicide.svelte'
	import Info from './info.svelte';
	import Landing from './Landing.svelte';
=======
	import Budgets from './budgetsFrontEnd/budget.svelte';
>>>>>>> 2acc19cfcc1bc3f8000b22505434cf6812903a33


	const routes={
		'/':Landing,
		'/suicide-records':SuicideRecord,
<<<<<<< HEAD
		'/suicide-records/:province/:year':SuicideEdit,
		'/info':Info,
=======
		'/province-budget-and-investment-in-social-promotion':Budgets,
>>>>>>> 2acc19cfcc1bc3f8000b22505434cf6812903a33
		'*':NotFound
		
	};

</script>

<main>

	<Router {routes}/>
</main>