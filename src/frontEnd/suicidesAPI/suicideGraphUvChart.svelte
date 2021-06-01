<svelte:head>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
    <script type="text/javascript" src=path/to/uvCharts.js></script>
</svelte:head>


<script>
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    

</script>










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