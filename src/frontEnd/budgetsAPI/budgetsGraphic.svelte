<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";

    let budgetGraph = [];
    let budgetGraphX = [];
    let budgetGraphBudget = [];
    let budgetGraphInvest = [];
    let budgetGraphPercentage = [];

    async function loadGraph() {
        const data = await fetch(BASE_API_PATH);
        budgetGraph = await data.json();
        if (data.ok) {
            budgetGraph.forEach(budgetSvelte => {
            budgetGraphX.push(budgetSvelte.percentage);
            budgetGraphBudget.push(budgetSvelte.budget);
            budgetGraphInvest.push(budgetSvelte.invest_promotion);
            budgetGraphPercentage.push(budgetSvelte.percentage);   
        });
    }
    
    Highcharts.chart("container", {
      title: {
        text: "",
      },
      yAxis: {
        title: {
          text: "Euros",
        },
      },
      xAxis: {
        title: {
          text: "Inversión en promoción social",
        },
        categories: budgetGraphX,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      annotations: [
        {
          labels: [
            {
              point: "date",
              text: "",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "white",
            },
          ],
        },
      ],
      series: [
        {
          name: "Presupuesto",
          data: budgetGraphBudget,
        },
        {
          name: "Inversión",
          data: budgetGraphInvest,
        },
        {
          name: "Porcentage",
          data: budgetGraphPercentage,
        }
        
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
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
              <Dropdown>
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
    </br>
    <h1 class="titulo2"> Gráfica de datos </h1>
    <div style="margin-bottom: 15px">
        <figure class="highcharts-figure">
          <div id="container" />
          <p style="display: inline; align:center;" class="highcharts-description"> Gráfica que relaciona el presupuesto de cada provincia y año con la inversión que realiza cada una de estas en promoción social. </p>
        </figure>
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
        margin: 0 auto;
    }
</style>
