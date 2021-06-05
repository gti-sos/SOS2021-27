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

  var marketCap = [];

  async function getData() {
    // Especificamos el ID de la película en la consulta, en este caso corresponde a RESERVOIR DOGS
    const allData = await fetch(
      "https://coinranking1.p.rapidapi.com/coins?limit=10",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "b8725c41c3msh1a6b8216d9f4f17p1fa8dcjsn85cd61011197",
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          useQueryString: true,
        },
      }
    );

    let criptos = [];
    criptos = await allData.json();


    for (let coin of criptos.data.coins) {
      console.log(coin)
      let obj = {};
      obj["name"] = coin.name;
      obj["value"] = coin.marketCap;
      marketCap.push(obj);
    }
    console.log(marketCap)
  }

  //  onMount(getData);
  async function loadGraph() {
    getData().then(() => {
      var graphdef = {
        categories: ["uvCharts"], //La categoria uvChart procesará los 2 parámetros que acabamos de tratar en la función anterior.
        dataset: {
          uvCharts: marketCap,
        },
      };
      var chart = uv.chart("PolarArea", graphdef);
    });
  }
</script>

<main>
  <body>
    <Jumbotron class="p-3" style="background-color: #FFB833">
      <h1 class="titulo; mainDiv" style="color: white">Datos Criptomonedas</h1>
    </Jumbotron>
    <Navbar style="background-color: #FFB833; color:white;" light expand="lg">
      <NavbarBrand href="#/">INICIO</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink href="#/suicide-records">Registro de suicidios</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#/province-budget-and-investment-in-social-promotion"
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
            <DropdownItem href="#/graphics/azar-games-and-bet-activities"
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
  <h1 class="titulo2">Capitalización de mercado de las 10 principales criptomonedas.</h1>
  <div style="width:800px; margin:0 auto;">
    <figure class="highcharts-figure">
      <div id="container" />
    </figure>


    <div id='uv-div' ></div>

    <br />
    <p style="centrado">
      Gráfica que muestra las top 10 criptomonedas actuales con su
      capitalización de mercado correspondiente.
    </p>
    <br />
  </div>
</main>

<svelte:head>
  <script
    type="text/javascript"
    src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js"
    on:load={loadGraph}></script>
</svelte:head>

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
