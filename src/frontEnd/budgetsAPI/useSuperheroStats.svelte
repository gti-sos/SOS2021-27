<script>
    import { onMount } from "svelte";
    import {Button,Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    let powerStats = [];
    let heroStats = [];
    let dataGraph = [];

    let id = 346;
    let nameHero = "";
    let url = "";
    let fetchUrl = "";
    let errorPrint = "";

    async function checkHero(idHero){
      if(idHero < 1 || idHero > 731){
      errorPrint = "La ID debe ser un número entre el 1 y el 731.";
      }
    }

   
    async function loadGraphHeroPowerStats(idButton) {

      console.log(idButton);
      checkHero(idButton);
      if(idButton != 346){
        idButton = id;
      }
      
      url = "https://www.superheroapi.com/api.php/10223504096584818/" + idButton + "/powerstats";

      console.log(url);

      const data = await fetch(url);
        powerStats = await data.json();

        heroStats = [];

        heroStats.push(powerStats);

        console.log(powerStats);

        nameHero = heroStats[0].name;

        delete heroStats[0].response;
        delete heroStats[0].id;
        delete heroStats[0].name;

        console.log(heroStats);

        dataGraph = [
          ['Combate', parseInt(heroStats[0].combat)],
          ['Durabilidad', parseInt(heroStats[0].durability)],
          ['Inteligencia', parseInt(heroStats[0].intelligence)],
          ['Poder', parseInt(heroStats[0].power)],
          ['Velocidad', parseInt(heroStats[0].speed)],
          ['Fuerza', parseInt(heroStats[0].strength)]
        ]

        console.log(dataGraph);
        
    Highcharts.chart('container', {
      chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
      },
      title: {
          text: ''
      },
      subtitle: {
          text: '3D donut in Highcharts'
      },
      plotOptions: {
          pie: {
              innerSize: 100,
              depth: 45
          }
      },
      series: [{
          name: 'Estadística de poder',
          data: dataGraph
      }]
  });
}


</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraphHeroPowerStats}></script>
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
    <h1 class="titulo2"> Gráfica de Uso</h1>
    <div style="margin-bottom: 15px">
    <p class="centrado" style="font-size:130%">
    <label for="id">Seleciona la ID del superhéroe de esta <a href="https://superheroapi.com/ids.html" style="color:red">LISTA IDs</a> e introducela aquí:</label>
    <input type="number" id="id" name="idHero" maxlength="4" size="4" bind:value={id}>
    <Button color="info" on:click="{loadGraphHeroPowerStats(id)}" type="button" class="btn btn-primary btn-lg" style ="position:relative; top:-4px"> Buscar </Button>
    </p>
    
    <figure class="highcharts-figure">
          <div id="container"></div>
          <p class="centrado"> Gráfica que muestra las estadísticas del superhéroe {nameHero} </p>
          <p class="centrado"><a href="https://superheroapi.com/index.html"> www.superheroapi.com </a></p>
          </figure>
      </div>
      <div>
      {#if errorPrint}
        <div class = "hideMe">
            <span class = "alertERROR">
            <strong style="align:center">ERROR! </strong><p></p> {errorPrint}
            </span>
        </div>
        {/if}
        </div>

    <br><br>
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

    #container {
  height: 400px; 
    }

    .highcharts-figure, .highcharts-data-table table {
      min-width: 310px; 
      max-width: 800px;
      margin: 1em auto;
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