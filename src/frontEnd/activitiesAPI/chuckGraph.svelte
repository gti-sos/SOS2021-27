<script>


    import {
            onMount
        } from "svelte";
    
        import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
        let isOpen = false;
    
        async function loadGraph(){
        let frases = []
        let aleatorio =[]
        
        const data = await fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "94963b1181msh9874230d2ebb059p1cd8dcjsn49656282a733",
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com"
        }
        });
        if(data.ok){
            frases = await data.json();
            console.log(frases)
           aleatorio.push(frases.value);
           console.log(aleatorio);

        }
        ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // CHART CONFIG
        zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/";
     let palabra = aleatorio.toString();
     console.log(palabra);
        let chartConfig ={
      type: 'wordcloud',
      options: {
        text: palabra,
        aspect: 'spiral',
        colorType: 'palette',
        maxItems: 50,
        minLength: '4px',
        palette: ['#D32F2F', '#1976D2', '#9E9E9E', '#E53935', '#1E88E5', '#7E57C2', '#F44336', '#2196F3', '#A1887F'],
        rotate: true,
        style: {
          tooltip: {
            text: palabra,
            padding: '5px',
            alpha: 0.9,
            backgroundColor: '#D32F2F',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white',
            fontFamily: 'Georgia',
            textAlpha: 1,
            visible: true,
            width: '400px',
            wrapText: true
          },
          fontFamily: 'Merriweather',
          hoverState: {
            backgroundColor: '#1976D2',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white'
          }
        }
      }
    };

    // RENDER CHARTS
    // -----------------------------
    zingchart.render({
      id: 'myChart',
      data: chartConfig
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
            <h1 class="titulo2"> Gráfica de Frases aleatorias de chuck norris </h1>
           
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