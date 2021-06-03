<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    
    let activities=[];
    let activitieskeys=[];
    let catering_bingo_machine=[];
    let lottery_engagement=[];
    let bingo_site=[];
    let national_lottery_expend=[];

  
     
      
      async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch(BASE_API_PATH);
      if (res.ok) {
            console.log("Ok.");
            activities = await res.json();

            
            activities.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
            activities.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

            activities.forEach(element => {
                activitieskeys.push(element.province+","+element.year);
                catering_bingo_machine.push(parseInt(element.catering_bingo_machine));
                lottery_engagement.push(parseInt(element.lottery_engagement));
                bingo_site.push(parseInt(element.bingo_site));
                national_lottery_expend.push(parseInt(element.national_lottery_expend));

                
            });}
              var myConfig = {
                  type: 'bar',
                  'legend':{},
                  'scale-x': {
                      labels: activitieskeys
                  },
                  series: [
                      { text : "Numero de locales de bingo",
                      values: bingo_site
                      },
                      { text : "Numero de personas jugando",
                      values: catering_bingo_machine
                      }
                  ]
                  };
                  
      zingchart.render({
          id: 'myChart',
          data: myConfig,
          
      });
}
  
</script>


<svelte:head>

<script>
  src="https://cdn.zingchart.com/zingchart.min.js"
  on:load={loadChart}></script>
</svelte:head>
<main>
<body>
  <Jumbotron class="p-3" style="background-color: #FFB833">
      <h1 class="titulo; mainDiv" style="color: white">Actividad en juegos de azar por  provincia y año</h1>
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
        <p style="centrado"> Gráfica que relaciona la actividad en loteria de cada provincia y  año  </p>
      </figure>
    </div>
    <div id="myChart"></div>

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
