<script>
	import Router from 'svelte-spa-router';
	import NotFound from './notFound.svelte';
	import SuicideRecord from './suicidesAPI/suicide.svelte';
	import SuicideEdit from './suicidesAPI/editSuicide.svelte';
	import SuicideGraph from './suicidesAPI/suicideGraph.svelte';

	import Budgets from './budgetsAPI/budget.svelte';
	import BudgetsEdit from './budgetsAPI/editBudget.svelte';
	import BudgetsGraphicLine from './budgetsAPI/budgetsGraphicLine.svelte';
	import BudgetsGraphicArea from './budgetsAPI/budgetsGraphicArea.svelte';
	import BudgetsGraphicAmCharts from './budgetsAPI/budgetsGraphicAmChart.svelte';
	import IntegrationEducationExpenditures from './budgetsAPI/integrationEducationExpenditures.svelte';
	import IntegrationLifeStats from './budgetsAPI/integrationLifeStats.svelte';
	import UseSuperheroStats from './budgetsAPI/useSuperheroStats.svelte';
	import UseAudioDB from './budgetsAPI/useAudioDB.svelte';


	import Activities from './activitiesAPI/activities.svelte';
	import ActivitiesEdit from './activitiesAPI/editactivities.svelte';
	import ActivitiesGraph from './activitiesAPI/activitiesGraph.svelte';
	import About from './About.svelte';

	import SuicideGraph2 from './suicidesAPI/suicideGraph2.svelte';
	import SuicideGraphUvChart from './suicidesAPI/suicideGraphUvChart.svelte';
	import suiCovid from './suicidesAPI/covidGraph.svelte';
	import suiDogs from './suicidesAPI/reservoirDogsGraph.svelte';
	import anxiety from './suicidesAPI/anxiety_suicideGraph.svelte';
	import depression from './suicidesAPI/depression_suicideGraph.svelte';
	import stress from './suicidesAPI/stress_suicideGraph.svelte';
	import cripto from './suicidesAPI/criptos_Graph.svelte';

	import ActivitiesGraph2 from './activitiesAPI/activitiesGraph2.svelte';
	import ActivitiesGraphVis from './activitiesAPI/activitiesGraphVis.svelte';
	import Integrations from './Integrations.svelte'
	import Alcohol from './activitiesAPI/alcoholGraph.svelte';
	import Cartas from './activitiesAPI/cartasGraph.svelte';
	import Pobreza from './activitiesAPI/povertyriskGraph.svelte';
	import Desempleo from './activitiesAPI/unemploymentGraph.svelte';
	import StarWar from './activitiesAPI/starwarGraph.svelte';
	import Children from './activitiesAPI/outschoolGraph.svelte';
	import Chuck from './activitiesAPI/chuckGraph.svelte';


	import Info from './info.svelte';
	import Landing from './Landing.svelte';
	import Graphics from './Graphs.svelte';
import { children } from 'svelte/internal';

	const routes={
		'/':Landing,
		'/suicide-records':SuicideRecord,
		'/suicide-records/:province/:year':SuicideEdit,
		'/graphics/suicide-records':SuicideGraph,
		'/graphics/suicide-records2':SuicideGraph2,
		'/graphics/suicide-records3':SuicideGraphUvChart,
		'/graphics/integrations/covid':suiCovid,
		'/graphics/integrations/dogs':suiDogs,
		'/graphics/integrations/anxiety':anxiety,
		'/graphics/integrations/depression':depression,
		'/graphics/integrations/stress':stress,
		'/graphics/integrations/criptos':cripto,




		'/province-budget-and-investment-in-social-promotion':Budgets,
		'/province-budget-and-investment-in-social-promotion/:province/:year':BudgetsEdit,
		'/graphics/line/province-budget-and-investment-in-social-promotion':BudgetsGraphicLine,
		'/graphics/area/province-budget-and-investment-in-social-promotion':BudgetsGraphicArea,
		'/graphics/amCharts/province-budget-and-investment-in-social-promotion':BudgetsGraphicAmCharts,
		'/graphics/integrations/educationExpenditures':IntegrationEducationExpenditures,
		'/graphics/integrations/lifeStats':IntegrationLifeStats,
		'/graphics/integrations/superheroStats':UseSuperheroStats,
		'/graphics/integrations/audioDB':UseAudioDB,
		
		'/azar-games-and-bet-activities':Activities,
		'/azar-games-and-bet-activities/:province/:year':ActivitiesEdit,
		'/graphics/azar-games-and-bet-activities':ActivitiesGraph,
		'/graphics/azar-games-and-bet-activities2':ActivitiesGraph2,
		'/graphics/azar-games-and-bet-activities3':ActivitiesGraphVis,
		'/graphics/integrations/alcohol':Alcohol,
		'/graphics/integrations/cards':Cartas,
		'/graphics/integrations/poverty':Pobreza,
		'/graphics/integrations/unemployment':Desempleo,
		'/graphics/integrations/starwar':StarWar,
		'/graphics/integrations/outschool':Children,
		'/graphics/integrations/chuck':Chuck,


		'/about':About,
		'/integrations':Integrations,


		'/info':Info,
		'/analytics':Graphics,
		'*':NotFound
	};

</script>

<main>
	<Router {routes}/>
</main>