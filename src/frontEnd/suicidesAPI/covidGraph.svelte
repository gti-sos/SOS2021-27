<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    

    
    async function getData(){

    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{

  });
}
    
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>


<main>
  <body>
  <Jumbotron class="p-3" style="background-color: #FFB833">
      <h1 class="titulo; mainDiv" style="color: white">Datos Covid</h1>
  </Jumbotron>
      <Navbar style="background-color: #FFB833; color:white;" light expand="lg" >
          <NavbarBrand href="#/">INICIO</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink href="#/suicide-records">Registro de suicidios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/province-budget-and-investment-in-social-promotion">Presupuesto/Inversión</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/azar-games-and-bet-activities">Actividad en loteria</NavLink>
            </NavItem>
            <Dropdown nav {isOpen} toggle="{() => isOpen = !isOpen}">
              <DropdownToggle nav caret> Gráficas </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="#/graphics/suicide-records">Registro de suicidios</DropdownItem>
                <DropdownItem href="#/graphics/province-budget-and-investment-in-social-promotion">Presupuesto/Inversión</DropdownItem>
                <DropdownItem href="#/graphics/azar-games-and-bet-activities">Actividad en loteria</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem href="#/graphics">Conjunto</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
      </Navbar>
  </body>
  <br>
  <h1 class="titulo2"> Gráfica de datos </h1>
  <div style="margin-bottom: 15px">
      <figure class="highcharts-figure">
        <div id="container" />
        <p style="centrado"> Datos sobre el covid-19. </p>
      </figure>
    </div>
</main>

<style>

  
  .titulo2 {
      color: #000000;
      text-align: center;
      font-size: 150%;
  }
  .mainDiv{
      text-align: center;
      margin: 20px;
  }

</style>