<script>
    import {Button, Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "sveltestrap";


    let isOpen = false;

    var BASE_API_PATH = "/api/v2";


    let budgets = [];
    let budgetsGraph = [];
    let suicides = [];
    let suicidesGraph = [];
    let activities = [];
    let activitiesGraph = [];

  
    var years = [];

    let errorPrint = "";

    function ordenaAnyo(x, y) {
      return x.filter((object, position, array) => {
        return array.map((mapObj) => mapObj[y]).indexOf(object[y]) === position;
      });
    }

    async function loadGraph() {
      const dataA = await fetch(BASE_API_PATH + "/suicide-records");
      const dataB = await fetch(BASE_API_PATH + "/province-budget-and-investment-in-social-promotion");
      const dataC = await fetch(BASE_API_PATH + "/azar-games-and-bet-activities");
      if (dataA.ok || dataB.ok || dataC.ok) {
        if (dataB.ok) {
          budgets = await dataB.json();
          console.log("OK");
        
          var anyos = ordenaAnyo(budgets, "year");
          anyos.sort(function (a, b) {
            return a.year - b.year;
          });

          anyos.forEach((x) => {
            years.push(x.year);
          });
         
          years.forEach((x) => {
            var yAxis = budgets.filter((f) => f.year === x).map((y) => y.percentage).reduce((sum, y) => y + sum);
            budgetsGraph.push(Math.round(yAxis));
          });
          errorPrint = "";
        }

        if (dataA.ok) {
          suicides = await dataB.json();
          console.log("OK");
        
          var anyos = ordenaAnyo(suicides, "year");
          anyos.sort(function (a, b) {
            return a.year - b.year;
          });

          anyos.forEach((x) => {
            years.push(x.year);
          });
         
          years.forEach((x) => {
            var yAxis = suicides.filter((f) => f.year === x).map((y) => y["suic_rate_mw"]).reduce((sum, y) => y + sum);
            suicidesGraph.push(Math.round(yAxis));
          });
          errorPrint = "";
        }

        if (dataC.ok) {
          activities = await dataC.json();
          console.log("OK");
        
          var anyos = ordenaAnyo(activities, "year");
          anyos.sort(function (a, b) {
            return a.year - b.year;
          });

          anyos.forEach((x) => {
            years.push(x.year);
          });
         
          years.forEach((x) => {
            var yAxis = activities.filter((f) => f.year === x).map((y) => y["national_lottery_expend"]).reduce((sum, y) => y + sum);
            activitiesGraph.push(Math.round(yAxis));
          });
          errorPrint = "";
        }

      } else {
        console.log("ERROR");
        errorPrint = "Todas las bases de datos están vacías.";
      }
     

      Highcharts.chart("container", {
        title: {
          text: "Registro de suicidios | Inversion promoción social | Actividad en loteria",
        },
        yAxis: {
          title: {
            text: "Ratios",
          },
        },
        xAxis: {
          title: {
            text: "Años",
          },
          categories: years,
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
                point: "year",
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
            name: "Ratio suicidios Hombre/Mujer",
            data: suicidesGraph,
          },
          {
            name: "Porcentage sobre presupuesto/inversión",
            data: budgetsGraph,
          },
          {
            name: "Gastos en la loteria nacional",
            data: activitiesGraph,
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
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
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
              <Dropdown nav {isOpen} toggle="{() => isOpen = !isOpen}">
                <DropdownToggle nav caret> Gráficas </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="#/graphics/suicide-records">Registro de suicidios</DropdownItem>
                  <DropdownItem href="#/graphics/province-budget-and-investment-in-social-promotion">Inversion promoción social</DropdownItem>
                  <DropdownItem href="#/graphics/azar-games-and-bet-activities">Actividad en loteria</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem href="#/graphics">Conjunto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
        </Navbar>
    </body>
    <br>
    <div>
       <h1 class="titulo2"> Gráfica de datos </h1>
    </div>

    {#if errorPrint}
        <div class = "hideMe">
            <span class = "alertERROR">
            <strong style="align:center">ERROR! </strong><p></p> {errorPrint}
            </span>
        </div>
    {:else}
        <div style="margin-bottom: 15px">
        <figure class="highcharts-figure">
        <div id="container"/>
        <p class="centrado">
          <strong>Gráfica en la que se muestran:</strong><br> 
          · EL ratio de suicidios entre hombres y mujeres<br>
          · El porcentage de presupuesto que se invierte en promoción social<br> 
          · Los gastos totales en loteria nacional
        </p>
        </figure>
        </div>
    {/if}
  </main>
  
  <style>

    .alertERROR {
        margin: 0 auto;
        display: table;
        padding: 20px;
        background-color: #f44336;
        color: white;
    }

    .hideMe {
        -moz-animation: cssAnimation 0s ease-in 5s forwards;
    /* Firefox */
        -webkit-animation: cssAnimation 0s ease-in 5s forwards;
    /* Safari and Chrome */
        -o-animation: cssAnimation 0s ease-in 5s forwards;
    /* Opera */
        animation: cssAnimation 0s ease-in 5s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }

    @keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            left: -9999px; 
            position: absolute;   
        }
    }

    @-webkit-keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            left: -9999px; 
            position: absolute;   
        }
    }

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