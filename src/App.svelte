<script>
	import Router from 'svelte-spa-router';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicideFrontEnd/suicide.svelte';
	import SuicideEdit from './suicideFrontEnd/editSuicide.svelte'
	import Budgets from './budgetsFrontEnd/budget.svelte';
	import BudgetsEdit from './budgetsFrontEnd/editBudget.svelte';
	import Info from './info.svelte';
	import Landing from './Landing.svelte';


	const routes={
		'/':Landing,
		'/suicide-records':SuicideRecord,
		'/suicide-records/:province/:year':SuicideEdit,
		'/province-budget-and-investment-in-social-promotion':Budgets,
		'/province-budget-and-investment-in-social-promotion/:province/:year':BudgetsEdit,
		'/info':Info,
		'*':NotFound
		
	};

</script>

<main>

	<Router {routes}/>
</main>