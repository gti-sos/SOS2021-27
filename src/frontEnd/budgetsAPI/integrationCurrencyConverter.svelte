<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";

    let dataGraph = [];

    async function getInternalData(){

      let budgetData = [];
      let budgetGraphX = [];
      let budgetEuros = [];

      const internalData = await fetch(BASE_API_PATH);
        budgetData = await internalData.json();

        console.log(budgetData);

        if(internalData.ok){
            budgetData.forEach(budgetSvelte => {
              budgetGraphX.push(budgetSvelte.province + "/" + budgetSvelte.year);
              budgetEuros.push(budgetSvelte.budget);
            })
        }
    }

    async function getExternalData(euros){

        let currencyData = [];
        let currencyConverted = [];
  
        const externalData = fetch("https://currency-exchange.p.rapidapi.com/exchange?to=USD&from=EUR&q=" + euros, {
	        "method": "GET",
	          "headers": {
		          "x-rapidapi-key": "b92358230bmshe53cee188c483ecp147ff1jsn450fa502bd55",
		            "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
            }
      });
        currencyData = await externalData.json();

        if(externalData.ok){
            currencyConverted.push(currencyData);
        }
       
    }
    
    async function loadGraphCurrencyConverter() {
      getInternalData().then(() => {
          var dataEuros = {
            EUROS: [
              [budgetGraphX, budgetEuros]
            ]
          }
      });
      getExternalData().then(() => {
          var dataDolares = {
            DOLARES: [
              [budgetGraphX, currencyConverted]
            ]
          }
      });
  
    
    var chart = Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
        pointFormat: '<span>\u25CF</span> {series.name}: <b>{point.y} </b><br/>'
    },
    xAxis: {
        type: 'category',
        max: 4,
        labels: {
            useHTML: true,
            animate: true,
            name: getInternalData().budgetGraphX
        }
    },
    yAxis: [{
        title: {
            text: 'Presupuesto'
        },
        showFirstLabel: false
    }],
    series: [{
        color: 'rgb(158, 159, 163)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: dataDolares.slice(),
        name: 'USD'
    }, {
        name: '€',
        id: 'main',
        dataSorting: {
            enabled: true,
            matchByName: true
        },
        dataLabels: [{
            enabled: true,
            inside: true,
            style: {
                fontSize: '16px'
            }
        }],
        data: dataEuros.slice()
    }],
    exporting: {
        allowHTML: true
    }
  });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraphCurrencyConverter}></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
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
        <div class='buttons'>
            <button id='EUROS' class='active'>
              €
            </button>
            <button id='DOLARES'>
              USD
            </button>
          </div>
          <div id="container"></div>
          <p class="centrado"> Gráfica que muestra los presupuestos de varias provincias en euros y dólares respectivamente. </p>
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

    #container {
      min-width: 310px;
      max-width: 800px;
      height: 400px;
      margin: 0 auto
    }

    .buttons {
      min-width: 310px;
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 0;
    }

    .buttons button {
      cursor: pointer;
      border: 1px solid silver;
      border-right-width: 0;
      background-color: #f8f8f8;
      font-size: 1rem;
      padding: 0.5rem;
      outline: none;
      transition-duration: 0.3s;
      margin: 0;
    }

    .buttons button:first-child {
      border-top-left-radius: 0.3em;
      border-bottom-left-radius: 0.3em;
    }

    .buttons button:last-child {
      border-top-right-radius: 0.3em;
      border-bottom-right-radius: 0.3em;
      border-right-width: 1px;
    }

    .buttons button:hover {
      color: white;
      background-color: rgb(158, 159, 163);
      outline: none;
    }

    .buttons button.active {
      background-color: #0051B4;
      color: white;
    }

</style>