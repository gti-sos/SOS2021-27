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
        text: 'Temperature vs Rainfall'
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value} °C',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],

    tooltip: {
        shared: true
    },

    series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: bingomaq,
        tooltip: {
            pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} mm</b> '
        }
    }, {
        name: 'Rainfall error',
        type: 'errorbar',
        yAxis: 1,
        data: [[48, 51], [68, 73], [92, 110], [128, 136], [140, 150], [171, 179], [135, 143], [142, 149], [204, 220], [189, 199], [95, 110], [52, 56]],
        tooltip: {
            pointFormat: '(error range: {point.low}-{point.high} mm)<br/>'
        }
    }, {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
            pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> '
        }
    }, {
        name: 'Temperature error',
        type: 'errorbar',
        data: [[6, 8], [5.9, 7.6], [9.4, 10.4], [14.1, 15.9], [18.0, 20.1], [21.0, 24.0], [23.2, 25.3], [26.1, 27.8], [23.2, 23.9], [18.0, 21.1], [12.9, 14.0], [7.6, 10.0]],
        tooltip: {
            pointFormat: '(error range: {point.low}-{point.high}°C)<br/>'
        }
    }]
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
