<script>
	import Router from 'svelte-spa-router';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicidesAPI/suicide.svelte';
	import SuicideEdit from './suicidesAPI/editSuicide.svelte';
	import SuicideGraph from './suicidesAPI/suicideGraph.svelte';
	import Budgets from './budgetsAPI/budget.svelte';
	import BudgetsEdit from './budgetsAPI/editBudget.svelte';
	import BudgetsGraphics from './budgetsAPI/budgetsGraphic.svelte';
	import Activities from './activitiesAPI/activities.svelte';
	import ActivitiesEdit from './activitiesAPI/editactivities.svelte';

	import Info from './info.svelte';
	import Landing from './Landing.svelte';
	import Graphics from './Graphs.svelte';

	const routes={
		'/':Landing,
		'/suicide-records':SuicideRecord,
		'/suicide-records/:province/:year':SuicideEdit,
		'/graphics/suicide-records':SuicideGraph,
		'/province-budget-and-investment-in-social-promotion':Budgets,
		'/province-budget-and-investment-in-social-promotion/:province/:year':BudgetsEdit,
		'/graphics/province-budget-and-investment-in-social-promotion':BudgetsGraphics,
		'/azar-games-and-bet-activities':Activities,
		'/azar-games-and-bet-activities/:province/:year':ActivitiesEdit,
		'/info':Info,
		'/graphics':Graphics,
		'*':NotFound
	};

</script>

<main>
	<Router {routes}/>
</main>