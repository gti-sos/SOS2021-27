<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    async function getData(){

// Especificamos el ID de la película en la consulta, en este caso corresponde a RESERVOIR DOGS
const allData= await fetch("https://free-nba.p.rapidapi.com/teams", { 
        "method":"GET",
        "headers":{
            "x-rapidapi-key": "94963b1181msh9874230d2ebb059p1cd8dcjsn49656282a733",
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            "useQueryString": true

        },
});
var lugar=[];
var equipos = [];
let data=[];
data=await allData.json();
console.log(data)
let city = {}

    city = data.division;
    lugar.push(city);
    
    let division = {}
    division= data.division;
    equipos.push(division);
    }

    async function loadGraph(){  
    getData().then(()=>{
        var myConfig = {
                  type: 'bar',
                  'legend':{},
                  'scale-x': {
                      labels: activitieskeys
                  },
                  series: [
                      { text : "equipos",
                      values: equipos
                      },
                      { text : "region",
                      values: lugar
                      }
                  ]
                  };
                  
      zingchart.render({
          id: 'myChart',
          data: myConfig,
          
      });
    });
}
 </script>
 
 
 
 <svelte:head>
 <script
    src="https://cdn.zingchart.com/zingchart.min.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
    <div id="myChart"></div>


</main>
