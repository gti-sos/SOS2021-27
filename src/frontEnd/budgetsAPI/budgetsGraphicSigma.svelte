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

    async function loadGraph() {
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
    
    sigma.parsers.json('data.json', {
    container: 'container',
    settings: {
      defaultNodeColor: '#ec5148'
    }
    "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 3,
      "y": 1,
      "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 1,
      "y": 3,
      "size": 1
    }
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
  ]
  });
</script>

<svelte:head>
  <script src="sigma.min.js" on:load={loadGraph}></script>
  <script src="sigma.parsers.json.min.js"></script>
</svelte:head>

<main>
    <body>
    <Jumbotron class="p-3" style="background-color: #FFB833">
        <h1 class="titulo; mainDiv" style="color: white">Presupuesto por provincia y año, e inversión en promoción social</h1>
    </Jumbotron>
        <Navbar style="background-color: #FFB833; color:white;" light expand="lg" >
            <NavbarBrand href="#/">INICIO</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="#/suicide-records">Registro de suicidios</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/province-budget-and-investment-in-social-promotion">Presupuesto/Inversión</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/azar-games-and-bet-activities">Actividad en loteria</NavLink>
              </NavItem>
              <Dropdown nav {isOpen} toggle="{() => isOpen = !isOpen}">
                <DropdownToggle nav caret> Gráficas </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="#/graphics/suicide-records">Registro de suicidios</DropdownItem>
                  <DropdownItem href="#/graphics/province-budget-and-investment-in-social-promotion">Presupuesto/Inversión</DropdownItem>
                  <DropdownItem href="#/graphics/azar-games-and-bet-activities">Actividad en loteria</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem href="#/graphics">Conjunto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
        </Navbar>
    </body>
    <br>
    <h1 class="titulo2"> Gráfica de datos </h1>
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