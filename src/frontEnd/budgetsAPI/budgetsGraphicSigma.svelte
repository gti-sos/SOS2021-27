<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";

    let budgetGraph = [];
    let budgetGraphX = [];
    let budgetGraphBudget = [];
    let budgetGraphInvest = [];
    let budgetGraphLiquid = [];
    let budgetGraphPercentage = [];

    async function loadGraphSigma() {
        const data = await fetch(BASE_API_PATH);
        budgetGraph = await data.json();
        if (data.ok) {
            budgetGraph.forEach(budgetSvelte => {
            budgetGraphX.push(budgetSvelte.province + "/" + budgetSvelte.year);
            budgetGraphBudget.push(budgetSvelte.budget);
            budgetGraphInvest.push(budgetSvelte.invest_promotion);
            budgetGraphLiquid.push(budgetSvelte.liquid);
            budgetGraphPercentage.push(budgetSvelte.percentage);   
        });
        budgetGraphX.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
        budgetGraphX.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
    }

    var graphSigma = new sigma('container');

    graphSigma.graph.addNode({
      id: budgetGraphX1,
      label: budgetGraphX,
      x: 0,
      y: 0,
      size: 1,
      color: '#f00'
    }).addNode({
      id: budgetGraphX2,
      label: budgetGraphX,
      x: 1,
      y: 1,
      size: 1,
      color: '#00f'
    }).addEdge({
      id: budgetGraphBudget,
      source: budgetGraphX1,
      target: budgetGraphX2
    });

    graphSigma.refresh();
    
  }  
</script>

<svelte:head>
  <script src="sigma.min.js" on:load={loadGraphSigma}></script>
</svelte:head>

<main>
    <br>
    <h1 class="titulo2"> Gráfica de datos librería Sigma </h1>
    <div id="container">
          <p class="centrado"> Gráfica que relaciona el presupuesto de cada provincia y año con la inversión que realiza cada una de estas en promoción social de tipo Sigma. </p>
      </div>
</main>

<style>
    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
        text-align: center;
    }
    
    .titulo2 {
        color: #000000;
        text-align: center;
        font-size: 150%;
    }
    .mainDiv{
        text-align: center;
        margin: 20px;
    }
    .centrado {
        text-align: center;
        padding: 1em;
        margin: 0;
    }
    #container {
      max-width: 400px;
      height: 400px;
      margin: auto;
    }
</style>