<script>
  import { onMount } from "svelte";

  import {
      Jumbotron,
      Navbar,
      Nav,
      NavItem,
      NavLink,
      NavbarBrand,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
  } from "sveltestrap";
  let isOpen = false;

  var sintechos = [];
  var bingomaqs = [];
  async function getData() {
     
      const pobres = await fetch(
          "/api/v1/unemployment-stats"
      );
      let pobresJsons = [];
      pobresJsons = await pobres.json();

      const activities = await fetch(
          "https://sos2021-27.herokuapp.com/api/v2/azar-games-and-bet-activities/"
      );
      let activitiesJsons = [];
      activitiesJsons = await activities.json();
for (let pobreza of pobresJsons) {
            for (let ludopatia of activitiesJsons) {
                if (pobreza.year != ludopatia.year) {
                    if (
                        (pobreza.country == "Spain" &&
                            ludopatia.province == "Seville" && ludopatia.year == "2018")
                    ) {


                        sintechos.push(parseInt(pobreza.knoperc));
                        bingomaqs.push(parseInt(ludopatia.bingo_site));

                       
                    }
                }
            }
      
    
          }
        
 
  console.log(sintechos);
      console.log(bingomaqs);
        
        }





  

  //  onMount(getData);
  async function loadGraph() {
    getData().then(() => {
      ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // CHART CONFIG

      let chartConfig = {
  type: 'pie',
  title: {
    text: 'Casinos en barcelona vs desempleo en españa',
    align: 'left',
    fontColor: '#fff',
    fontFamily: 'Open Sans',
    fontSize: '25px',
    offsetX: '10px',
  },

  plot: {
    tooltip: {
      text: '%npv%',
      padding: '5 10',
      fontFamily: 'Open Sans',
      fontSize: '18px'
    },
    valueBox: {
      text: '%t\n%npv%',
      fontFamily: 'Open Sans',
      placement: 'out'
    },
    animation: {
      effect: 'ANIMATION_EXPAND_VERTICAL',
      method: 'ANIMATION_REGULAR_EASE_OUT',
      sequence: 'ANIMATION_BY_PLOT',
      speed: 500
    },
    borderColor: '#2B313B',
    borderWidth: '5px'
  },
  plotarea: {
    margin: '20 0 0 0'
  },
  source: {
    text: 'Source: gs.statcounter.com',
    fontColor: '#8e99a9',
    fontFamily: 'Open Sans',
    textAlign: 'left'
  },
  series: [
    {
      text: 'Indice de desempleo',
      values: sintechos,
      backgroundColor: '#50ADF5'
    },
    {
      text: 'Numero de maquinas de bingo',
      values: bingomaqs,
      backgroundColor: '#FF7965'
    }
    
  ]
};

// RENDER CHARTS
// -----------------------------
zingchart.render({
  id: 'myChart',
  data: chartConfig,
  height: '100%',
  width: '100%',
});
}); 
        
  }
</script>

<svelte:head>

 <script
    src="https://cdn.zingchart.com/zingchart.min.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
  <body>
      <Jumbotron class="p-3" style="background-color: #FFB833">
          <h1 class="titulo; mainDiv" style="color: white">
              Integración Api Desempleo
          </h1>
      </Jumbotron>
      <Navbar
          style="background-color: #FFB833; color:white;"
          light
          expand="lg"
      >
          <NavbarBrand href="#/">INICIO</NavbarBrand>
          <Nav navbar>
              <NavItem>
                  <NavLink href="#/suicide-records"
                      >Registro de suicidios</NavLink
                  >
              </NavItem>
              <NavItem>
                  <NavLink
                      href="#/province-budget-and-investment-in-social-promotion"
                      >Presupuesto/Inversión</NavLink
                  >
              </NavItem>
              <NavItem>
                  <NavLink href="#/azar-games-and-bet-activities"
                      >Actividad en loteria</NavLink
                  >
              </NavItem>
              <NavItem>
                  <NavLink href="#/integrations">Integraciones</NavLink>
              </NavItem>
              <Dropdown nav {isOpen} toggle={() => (isOpen = !isOpen)}>
                  <DropdownToggle nav caret>Gráficas</DropdownToggle>
                  <DropdownMenu end>
                      <DropdownItem href="#/graphics/suicide-records"
                          >Registro de suicidios</DropdownItem
                      >
                      <DropdownItem
                          href="#/graphics/province-budget-and-investment-in-social-promotion"
                          >Presupuesto/Inversión</DropdownItem
                      >
                      <DropdownItem
                          href="#/graphics/azar-games-and-bet-activities"
                          >Actividad en loteria</DropdownItem
                      >
                      <DropdownItem divider />
                      <DropdownItem href="#/graphics">Conjunto</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </Nav>
      </Navbar>
  </body>
  <br />
  <h1 class="titulo2">Desempleo relacionado con la actividad en juegos de azar</h1>
 
  <div id="myChart" class="chart--container"></div>>
</main>

<style>
  @import 'https://fonts.googleapis.com/css?family=Open+Sans';
  .zc-body {
    background-color: #2B313B;
  }

  .chart--container {
    height: 100%;
    width: 100%;
    min-height: 530px;
  }

  .zc-ref {
    display: none;
  }
</style>