<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    
    var europe=[]
    var europe_deaths=[];
    
    async function getData(){

        const covidData= await fetch("https://covid-193.p.rapidapi.com/statistics", {
                "method":"GET",
                "headers":{
                    "x-rapidapi-key": "b8725c41c3msh1a6b8216d9f4f17p1fa8dcjsn85cd61011197",
	                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "useQueryString": true

                }

        });


        // Como la api no cuenta con un filtro por continentes lo haré yo.
        let covidJsons=[];
        covidJsons=await covidData.json();


    
        for(let x of covidJsons.response){
            let obj={}

            if(x.continent=="Europe"){

                if(x.country!="Europe" && x.population>10000000){ // Necesario porque considera a Europa como un país.
                    obj["name"]=x.country;
                    obj["value"]=x.cases.total;
                    europe.push(obj);
                }


                
                
            }
            
        }

        for(let x of covidJsons.response){
            let obj={}

            if(x.continent=="Europe"){

                if(x.country!="Europe" && x.population>10000000){ // Necesario porque considera a Europa como un país.
                    obj["name"]=x.country;
                    obj["value"]=x.deaths.total;
                    europe_deaths.push(obj);
                }


                
                
            }
            
        }

        console.log(europe);
        

    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{
        var graphdef={
            categories: ['Casos','Muertes'],
            dataset:{

                'Casos': europe,
                'Muertes':europe_deaths


            }
        }

        var chart = uv.chart ('Bar', graphdef,{
            meta:{
                caption:'Casos y Muertes en los principales paises europeos (más de 10M habitantes)',

            }
        });
	



        console.log("fin");

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
      <p style="centrado">
        Gráfica que muestra los contagios y muertes por covid-19 en las principales ciudades de Europa.
    </p>
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