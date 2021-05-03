<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicideFrontEnd/suicide.svelte';
	import Budgets from './budgetsFrontEnd/budget.svelte';
    import Activities from './activitiesFrontEnd/activities.svelte';


	const routes={
		'/':Home,
		'/suicide-records':SuicideRecord,
		'/province-budget-and-investment-in-social-promotion':Budgets,
		'/azar-games-and-bet-activities':Activities,
		'*':NotFound
	};

</script>

<main>

	<Router {routes}/>
</main>