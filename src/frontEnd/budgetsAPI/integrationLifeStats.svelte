<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";

    let proxy = "/proxy/";

    async function loadGraphLifeStats() {
        var budgetDataGraph = {
          name : 'Presupuesto de varias provincias',
          data: []
        }

        var lifePowerDataGraph = {
          name : 'Índice de poder adquisitivo de varios países',
          data: []
        }

        var lifeQualityDataGraph = {
          name : 'Índice de calidad de vida de varios países',
          data: []
        }

        const data = await fetch(BASE_API_PATH);
        budgetData = await data.json();

        const data2 = await fetch(proxy + "/api/v2/life-stats");
        lifeData = await data2.json();

        if (data.ok) {
            budgetData.forEach(budgetSvelte => {
              budgetDataGraph['data'].push({
                name: budgetSvelte.province + "/" + budgetSvelte.year,
                value: budgetSvelte.budget
              });
            });
        }

        if (data2.ok) {
            lifeData.forEach(lifeSvelte => {
              lifePowerDataGraph['data'].push({
                name: lifeSvelte.country + "/" + lifeSvelte.date,
                value: lifeSvelte.purchasing_power_index
              });
            });
        }

        if (data2.ok) {
            lifeData.forEach(lifeSvelte => {
              lifeQualityDataGraph['data'].push({
                name: lifeSvelte.country + "/" + lifeSvelte.date,
                value: lifeSvelte.quality_life_index
              });
            });
        }

        
    
    Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '85%'
        },
        title: {
            text: ''
        },
        tooltip: {
            useHTML: true
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '70%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 200
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
         series:  [{
              name: 'Presupuestos',
              data: budgetDataGraph
          },
          {
              name: 'Índices de poder adquisitivo',
              data: lifePowerDataGraph
          },
          {
              name: 'Índices de calidad de vida',
              data: lifeQualityDataGraph
          }]
      });
  }        
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts.src.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"  on:load={loadGraphLifeStats}></script>
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
                  <DropdownItem href="#/graphics">Conjunto</DropdownItem>
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
          <p class="centrado"> Gráfica que relaciona el presupuesto de varias provincias con el índice de poder adquisitivo y calidad de vida de varios países. </p>
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
</style>