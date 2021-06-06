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

  var sintecho = [];
  var bingomaq = [];

  var personaspobresjeres = [];
  var jugadoresjeres = [];

  var keys = [];

  async function getData() {
      const porsiacaso = await fetch(
          "/api/v1/unemployment-stats/loadInitialData"
      ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.

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
                          ludopatia.province == "Seville") ||
                      (pobreza.country == "Spain" &&
                          ludopatia.province == "Valencia") ||
                      (pobreza.country == "Spain" &&
                          ludopatia.province == "Madrid") ||
                      (pobreza.country == "Spain" &&
                          ludopatia.province == "Barcelona")
                  ) {

                      keys.push(pobreza.country + " - " + ludopatia.province + "("+ludopatia.year+")");

                      sintecho.push(parseInt(pobreza.knoperc));
                      bingomaq.push(parseInt(ludopatia.bingo_site));

                      personaspobresjeres.push(parseInt(pobreza.intperc));
                      jugadoresjeres.push(parseInt(ludopatia.catering_bingo_machine));
                  }
              }
          }
      }

      console.log(sintecho);
      console.log(bingomaq);

      console.log(personaspobresjeres);
      console.log(jugadoresjeres);
  }

  //  onMount(getData);
  async function loadGraph() {
      getData().then(() => {

          
        Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Desempleo frente a actividad ludica'
    },
    xAxis: [{
        categories: keys
    }],
    

    tooltip: {
        shared: true
    },

    series: [{
        name: 'Jugadores de bingo',
        type: 'column',
        yAxis: 1,
        data: bingomaq,
        tooltip: {
            pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} mm</b> '
        }
    }, {
        name: 'Ratio desempleo knoperc',
        type: 'errorbar',
        yAxis: 1,
        data: sintecho,
        tooltip: {
            pointFormat: '(error range: {point.low}-{point.high} mm)<br/>'
        }
    }, {
        name: 'ratio desempleo intperc ',
        type: 'errorbar',
        data: personaspobresjeres,
        tooltip: {
            pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> '
        }
    }, ]
});
      });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/dumbbell.js"></script>
<script src="https://code.highcharts.com/modules/lollipop.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
  <script
      src="https://code.highcharts.com/modules/accessibility.js"
      on:load={loadGraph}></script>
</svelte:head>

<main>
  <body>
      <Jumbotron class="p-3" style="background-color: #FFB833">
          <h1 class="titulo; mainDiv" style="color: white">
              Integración Api Ansiedad
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
  <h1 class="titulo2">Pobreza relacionada con la actividad en juegos</h1>
  <div style="width:800px; margin:0 auto;">
      <figure class="highcharts-figure">
          <div id="container" />
      </figure>
      <div id="uv-div" />
      <p style="centrado">
          Gráfica que muestra la pobreza en el hogar y el numero de pobres frente a los locales de bingo y jugadores activos.
      </p>
  </div>
</main>

<style>
  .titulo2 {
      color: #000000;
      text-align: center;
      font-size: 150%;
  }
  .mainDiv {
      text-align: center;
      margin: 20px;
  }
</style>
