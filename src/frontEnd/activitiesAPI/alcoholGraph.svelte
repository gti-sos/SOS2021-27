<script>


import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    async function loadGraph(){
    let covid = []
    let covidConfirmado = []
    let covidDeath = []
    let covidRecovered = []
    let covidProvince = []
    
    const data = await fetch("https://covid-19-statistics.p.rapidapi.com/reports?region_name=Spain", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "94963b1181msh9874230d2ebb059p1cd8dcjsn49656282a733",
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
	}
    });
    if(data.ok){
        covid = await data.json();
        console.log(covid)
        covid.data.forEach(e => {
            covidConfirmado.push(e.confirmed)
            covidDeath.push(e.deaths)
            covidRecovered.push(e.recovered)
            covidProvince.push(e.region.province)
        });
    }
    let chartConfig = {
        type: 'hbullet',
      title: {
        text: 'Analisis covid España',
        fontColor: '#212121'
      },
      plot: {
        tooltip: {
          text: '%t: %v  ',
          borderRadius: '3px',
          borderWidth: '0px',
          fontSize: '12px'
        },
        barSpace: '8px',
        goal: {
          alpha: 0.9,
          borderWidth: '0px'
        }
      },
      plotarea: {
        margin: '50 50 90 120'
      },
      scaleX: {
      values:covidProvince
      },
      scaleY: {
        guide: {
          visible: false
        },
        label: {
          text: 'Numero de casos'
        }
      },
      labels: [{
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar11.png',
          hook: 'scale:name=scale-x,index=0',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        },
        {
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar22.png',
          hook: 'scale:name=scale-x,index=1',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        },
        {
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar33.png',
          hook: 'scale:name=scale-x,index=2',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        },
        {
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar44.png',
          hook: 'scale:name=scale-x,index=3',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        }
      ],
      series: [{
          text: 'Casos positivos',
          values: covidConfirmado,
          backgroundColor: '#009688',
          goal: covidProvince
        },
        {
          text: 'Recuperados',
          values:covidRecovered,
          backgroundColor: '#ffc107',
          goal: covidProvince
        },
        {
          text: 'Muertos',
          values: covidDeath,
          backgroundColor: '#9c27b0',
          goal: covidProvince
        }
      ]
    };
    zingchart.render({
    id: 'myChart',
    data: chartConfig,
    });
    
}
</script>
<svelte:head>

  <script
    src="https://cdn.zingchart.com/zingchart.min.js"
    on:load={loadGraph}></script>
</svelte:head>


<main>
    <body>
        <Jumbotron class="p-3" style="background-color: #FFB833">
            <h1 class="titulo; mainDiv" style="color: white">Integracion covid</h1>
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