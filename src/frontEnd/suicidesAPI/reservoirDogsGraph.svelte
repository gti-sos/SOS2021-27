<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    
    var ratings=[]
    
    
    async function getData(){

        // Especificamos el ID de la película en la consulta, en este caso corresponde a RESERVOIR DOGS
        const allData= await fetch("https://imdb8.p.rapidapi.com/title/get-ratings?tconst=tt0105236", { 
                "method":"GET",
                "headers":{
                    "x-rapidapi-key": "b8725c41c3msh1a6b8216d9f4f17p1fa8dcjsn85cd61011197",
	                "x-rapidapi-host": "imdb8.p.rapidapi.com",
	                "useQueryString": true

                },
        });

        let data=[];
        data=await allData.json();
        console.log(data)



        // La API NO nos devuelve un array de objetos con las votaciones, por lo que añado las categorias que quiero manualmente.

        let obj_under18={}
        obj_under18["name"]=data.ratingsHistograms["Aged under 18"].demographic;
        obj_under18["value"]=data.ratingsHistograms["Aged under 18"].aggregateRating;
        ratings.push(obj_under18);


        let obj_female={}
        obj_female["name"]=data.ratingsHistograms.Females.demographic;
        obj_female["value"]=data.ratingsHistograms.Females.aggregateRating;
        ratings.push(obj_female);

        let obj_male={}
        obj_male["name"]=data.ratingsHistograms.Males.demographic;
        obj_male["value"]=data.ratingsHistograms.Males.aggregateRating;
        ratings.push(obj_male);

        let obj_staff={}
        obj_staff["name"]=data.ratingsHistograms["IMDb Staff"].demographic;
        obj_staff["value"]=data.ratingsHistograms["IMDb Staff"].aggregateRating;
        ratings.push(obj_staff);

        let obj_users={}
        obj_users["name"]=data.ratingsHistograms["IMDb Users"].demographic;
        obj_users["value"]=data.ratingsHistograms["IMDb Users"].aggregateRating;
        ratings.push(obj_users);
        
        console.log(ratings)

    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{

        var graphdef={
            categories: ['Nota'],
            dataset:{
                'Nota': ratings
            }
        }

        var chart = uv.chart ('StackedArea', graphdef,{
            meta:{
                caption:'Nota media según el tipo de usuario para la película Reservoir Dogs.',

            }
        });

        

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