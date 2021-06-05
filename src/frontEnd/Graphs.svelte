<script>
  import {
    Button,
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

  var BASE_API_PATH = "/api/v2";

  // Array de Datos
  var suicides=[];
  var budgets=[];
  var activities=[];

  // Valores que se van a mostrar en la grafica
  var xKeys = [];
  var suicidesGraph=[];
  var budgetsGraph=[];
  var activitiesGraph=[];



  
  var int = 0;

  let errorPrint = "";

  async function getData() {
    const dataA = await fetch(BASE_API_PATH + "/suicide-records");
    const dataB = await fetch(BASE_API_PATH + "/province-budget-and-investment-in-social-promotion");
    const dataC = await fetch(BASE_API_PATH + "/azar-games-and-bet-activities");


    if (dataA.ok && dataB.ok && dataC.ok) { 
      suicides = await dataA.json();
      budgets = await dataB.json();
      activities= await dataC.json();



      // Se añaden las claves de cada banco de datos
      suicides.forEach(element=>{
        xKeys.push(element.province+","+parseInt(element.year));
      });

      budgets.forEach(element=>{
        xKeys.push(element.province+","+parseInt(element.year));
      });

      activities.forEach(element=>{
        xKeys.push(element.province+","+parseInt(element.year));
      })


      // Se añaden los valores de cada banco de datos que se van a mostrar

      // Suicidios
      suicides.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      suicides.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));


      suicides.forEach(element=>{
        suicidesGraph.push(parseInt(element.suic_total));
      });

      // Budgets

      budgets.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      budgets.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));

      budgets.forEach(element=>{
        budgetsGraph.push(element.percentage);
      });

      // Activities

      activities.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      activities.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));

      activities.forEach(element=>{
        activitiesGraph.push(parseInt(element.catering_bingo_machine));
      });

      
      

      // Eliminamos repetidos y ordenamos por provincia y año
      xKeys=new Set(xKeys);
      xKeys=Array.from(xKeys);
      xKeys.sort();
      
      
      
    } else {
      console.log("Error!");
    }
  }

  async function loadGraph() {
    getData().then(() => {
      Highcharts.chart("container", {
        chart:{
        type: 'scatter',
      },
        title: {
          text: "",
        },
        yAxis: {
          title: {
            text: "Unidades",
          },
        },
        xAxis: {
          title: {
            text: "Provincia,Año",
          },
          categories: xKeys,
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
            name: "Total Suicidios",
            data: suicidesGraph,
          },
          {
            name: "Porcentaje presupuesto/inversion",
            data: budgetsGraph,
          },
          
          {
            name: "Maquinas de bingo activas",
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
  <br />
  <div>
    <h1 class="titulo2">Gráfica conjunta</h1>
  </div>

  {#if errorPrint}
    <div class="hideMe">
      <span class="alertERROR">
        <strong style="align:center">ERROR! </strong>
        <p />
        {errorPrint}
      </span>
    </div>
  {:else}
    <div style="margin-bottom: 15px">
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="centrado">
          <strong>Gráfica en la que se muestran:</strong><br />
          · EL total de suicidios<br />
          · El porcentage de presupuesto que se invierte en promoción social<br />
          . Maquinas de bingo activas <br />
         

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



  .titulo2 {
    color: #000000;
    text-align: center;
    font-size: 150%;
  }

  .mainDiv {
    text-align: center;
    margin: 20px;
  }

  .centrado {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
