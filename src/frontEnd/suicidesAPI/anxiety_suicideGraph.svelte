<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    
    var europe=[]
    var europe_deaths=[];
    
    async function getData(){

        const anxiety=await fetch("http://sos2021-11.herokuapp.com/api/integration/anxiety_stats");
        let anxietyJsons=[];
        anxietyJsons=await anxiety.json();
        
        console.log(anxietyJsons);

    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{
        

  });
}


    
</script>



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
            <NavItem>
                <NavLink href="#/integrations">Integraciones</NavLink>
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
  <div style="width:800px; margin:0 auto;">
      <figure class="highcharts-figure">
        <div id="container" />

      </figure>
      <div id='uv-div' ></div>
    </div>
</main>



<svelte:head>
    


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"  ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js" on:load={loadGraph}></script>
</svelte:head>



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