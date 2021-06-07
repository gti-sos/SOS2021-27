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

    
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH);
        if(res.ok){
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

                
            });

            console.log(catering_bingo_machine);


            console.log(`We have received ${activities.length} data points.`);
        }else{
            console.log("Error!");
        }
    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{

    
    Highcharts.chart('container', {
      title: {
        text: "Gráfica de Actividad en loteria",
      },
      yAxis: {
        title: {
          text: "Actividad en juegos de azar",
        },
      },
      xAxis: {
        title: {
          text: "Provincia,Año",
        },
        categories: activitieskeys,
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
          name: "Maquinas de bingo",
          data: catering_bingo_machine,
        },
        {
          name: "Participacion en loteria",
          data: lottery_engagement,
        },
        {
          name: "Locales de bingo",
          data: bingo_site,
        },
        {
          name: "Gastos en loteria nacional",
          data: national_lottery_expend,
        }
        
      ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
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
      <h1 class="titulo; mainDiv" style="color: white">Actividad en juegos de azar por  provincia y año</h1>
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
  <h1 class="titulo2"> Gráfica de datos </h1>
  <div style="margin-bottom: 15px">
      <figure class="highcharts-figure">
        <div id="container" />
        <p style="centrado"> Gráfica que relaciona la actividad en loteria de cada provincia y  año  </p>
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