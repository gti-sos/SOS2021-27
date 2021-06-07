<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";

    let budgetGraph = [];
    let dataGraph = [];
    let serie = [];

    async function loadGraphAmChart() {
        const data = await fetch(BASE_API_PATH);
        budgetGraph = await data.json();
        console.log(budgetGraph);
        if (data.ok) {
            budgetGraph.forEach(budgetSvelte => {
              serie = {
                name: budgetSvelte.province + "/" + budgetSvelte.year,
                value: budgetSvelte.budget
              }
            dataGraph.push(serie);
        });
    }

    console.log(dataGraph);
  
        am4core.ready(function() {
            var chart = am4core.create("chartdiv", am4charts.SlicedChart);
            chart.data = dataGraph;
            chart.colors.step = 2;
            let series = chart.series.push(new am4charts.FunnelSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "name";
            series.alignLabels = true;
            series.orientation = "horizontal"; 
        }); 
	}

</script>

<svelte:head>
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
    <h1 class="titulo2"> Gráfica de datos librería amCharts </h1>
    <div id="chartdiv">
          <p class="centrado"> Gráfica que relaciona el presupuesto de cada provincia y año con la inversión que realiza cada una de estas en promoción social. </p>
      </div>
      <br><br>
      <div class="centrado">
      <a href="#/graphics/line/province-budget-and-investment-in-social-promotion" class="fakeButton">TIPO LINE</a>
      <a href="#/graphics/area/province-budget-and-investment-in-social-promotion" class="fakeButton">TIPO ÁREA</a>
      </div>
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
    #chartdiv {
      width: 100%;
      height: 500px;
    }
</style>