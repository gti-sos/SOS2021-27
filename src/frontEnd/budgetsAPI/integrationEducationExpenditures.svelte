<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";


    async function loadGraphIntegrationEducationExpenditures() {

      var budgetData = [];
      var educationData = [];
      var budgetDataGraph = [];
      var educationDataGraph = [];
      var integrationGraph = [];

        const data = await fetch(BASE_API_PATH);
        budgetData = await data.json();

        const data2 = await fetch("https://education-expenditures.herokuapp.com/api/v1/reduced");
        educationData = await data2.json();

    
            budgetData.forEach(budgetSvelte => {
              let serie = {
                x: budgetSvelte.budget,
                y: budgetSvelte.invest_promotion,
                z: budgetSvelte.percentage,
                name: budgetSvelte.province + "/" + budgetSvelte.year
              }
              serie = serie.slice(0, 10);
              budgetDataGraph.push(serie);
            });
        

        
            educationData.forEach(educationSvelte => {
              let serie = {
                x: educationSvelte.education_expenditure_per_millions,
                y: educationSvelte.education_expenditure_per_capita,
                z: educationSvelte.education_expenditure_per_public_expenditure,
                name: educationSvelte.country + "/" + educationSvelte.year
              }
              serie = serie.slice(0, 10);
              educationDataGraph.push(serie);
            });
        

        integrationGraph.push(educationDataGraph);
        integrationGraph.push(budgetDataGraph);
    
    Highcharts.chart('container', {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        accessibility: {
          point: {
            valueDescriptionFormat: '{index}. {point.name}, Presupuesto: {point.x}€, Inversión: {point.y}€, Porcentaje: {point.z}%.'
          }
        },
        xAxis: {
          gridLineWidth: 1,
            title: {
              text: 'Presupuestos'
            },
            labels: {
              format: '{x} €'
            }, 
        },

        yAxis: {
          startOnTick: false,
          endOnTick: false,
            title: {
              text: 'Inversiones'
            },
          labels: {
            format: '{y} €'
          },  
        },

        tooltip: {
          useHTML: true,
          headerFormat: '<table>',
          pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>Presupuesto:</th><td>{point.x}€</td></tr>' +
            '<tr><th>Inversión:</th><td>{point.y}€</td></tr>' +
            '<tr><th>Porcentaje:</th><td>{point.z}%</td></tr>',
          footerFormat: '</table>',
          followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            data: integrationGraph
        }]

    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphIntegrationEducationExpenditures}"></script>
</svelte:head>

<main>
  <body>
      <Jumbotron class="p-3" style="background-color: #FFB833">
        <h1 class="titulo; mainDiv" style="color: white">SOS2021-27</h1>
      </Jumbotron>
        <Navbar style="background-color: #FFB833; color:white;" light expand="lg" >
            <NavbarBrand href="#/">INICIO</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="#/suicide-records">Registro de suicidios</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/province-budget-and-investment-in-social-promotion">Inversion promoción social</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/azar-games-and-bet-activities">Actividad en loteria</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/integrations">Integraciones</NavLink>
              </NavItem>
              <Dropdown nav {isOpen} toggle="{() => isOpen = !isOpen}">
                <DropdownToggle nav caret> Gráficas </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="#/graphics/suicide-records">Registro de suicidios</DropdownItem>
                  <DropdownItem href="#/graphics/line/province-budget-and-investment-in-social-promotion">Inversion promoción social</DropdownItem>
                  <DropdownItem href="#/graphics/azar-games-and-bet-activities">Actividad en loteria</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem href="#/analytics">Conjunto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink style="float:right; color:white; margin:left;" href="#/about">Acerca de</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    </body>
    <br>
    <h1 class="titulo2"> Gráfica de Integración</h1>
    <div style="margin-bottom: 15px">
        <figure class="highcharts-figure">
          <div id="container"/>
          <p class="centrado"> Gráfica que relaciona la inversión en promoción social con la inversión en educación en millones de euros, indicando el presupuesto inicial, así como la inversión en educación per capita, y los porcentajes de inversión. </p>
        </figure>
      </div>
      <br><br>
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
     .fakeButton {
        background-color: #FFB833;
        border: none;
        color: white;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
        margin-right: 60px;
        border-radius: 12px;
    }

    .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
    }

    #container {
        height: 400px;
    }

    .highcharts-tooltip h3 {
        margin: 0.3em 0;
    }

    .highcharts-data-table table {
      font-family: Verdana, sans-serif;
      border-collapse: collapse;
      border: 1px solid #EBEBEB;
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
      font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }

</style>