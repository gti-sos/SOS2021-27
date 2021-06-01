<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    var BASE_API_PATH = "/api/v2/suicide-records";
    
    let suicides=[];
    let suicKeys=[];
    let suicMan=[];
    let suicWoman=[];
    let suicTotal=[];
    let suicRate=[];

    
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH);
        if(res.ok){
            console.log("Ok.");
            suicides = await res.json();

            
            suicides.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
            suicides.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

            suicides.forEach(element => {
                suicKeys.push(element.province+","+element.year);
                suicMan.push(parseInt(element.suic_man));
                suicWoman.push(parseInt(element.suic_woman));
                suicTotal.push(parseInt(element.suic_total));
                suicRate.push(parseInt(element.suic_rate_mw));

                
            });

            console.log(suicWoman);


            console.log(`We have received ${suicides.length} data points.`);
        }else{
            console.log("Error!");
        }
    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{

    
    Highcharts.chart('container', {
      chart:{
        type: 'column',
      },
      title: {
        text: "Gráfica de Suicidios",
      },
      yAxis: {
        title: {
          text: "Número de Personas",
        },
      },
      xAxis: {
        title: {
          text: "Provincia,Año",
        },
        categories: suicKeys,
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
          name: "Hombres",
          data: suicMan,
        },
        {
          name: "Mujeres",
          data: suicWoman,
        },
        {
          name: "Total",
          data: suicTotal,
        },
        {
          name: "Ratio",
          data: suicRate,
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
      <h1 class="titulo; mainDiv" style="color: white">Presupuesto por provincia y año, e inversión en promoción social</h1>
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
        <p style="centrado"> Gráfica que relaciona el presupuesto de cada provincia y año con la inversión que realiza cada una de estas en promoción social. </p>
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