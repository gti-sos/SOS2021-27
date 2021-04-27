<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicideFrontEnd/suicide.svelte';
	import Budgets from './budgetsFrontEnd/budget.svelte';


	const routes={
		'/':Home,
		'/suicide-records':SuicideRecord,
		'/province-budget-and-investment-in-social-promotion': Budgets,
		'*':NotFound
	};

</script>

<main>

	<Router {routes}/>
</main>