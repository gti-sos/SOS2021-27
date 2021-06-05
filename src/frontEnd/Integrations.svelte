<script>
    import {
      Jumbotron,
      Navbar,
      Nav,
      NavItem,
      NavLink,
      NavbarBrand,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
      Button,
    } from "sveltestrap";
  
    let isOpen = false;
  </script>
  
  <main>
    <body>
      <Jumbotron class="p-3" style="background-color: #FFB833">
        <h1 class="titulo; mainDiv" style="color: white">SOS2021-27</h1>
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
                  <DropdownItem href="#/graphics">Conjunto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink style="float:right; color:white; margin:left;" href="#/about">Acerca de</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    </body>
  
    <br />
  
    <div class="box">
      <slot>
        <div>
          <h3 class="titulo"><b>Integraciones de Javier García</b></h3>
          <br>
          <div class="titulo">
          <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/covid" class="fakeButton">covid19 (Externa)</a>
          <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/dogs" class="fakeButton">Reservoir Dogs (Externa)</a>
          <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/criptos" class="fakeButton">Criptomonedas (Externa)</a>
          <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/anxiety" class="fakeButton">anxiety</a>
          <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/depression" class="fakeButton">depression</a>
          <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/stress" class="fakeButton">stress</a>
          <a href="https://sos2021-27.herokuapp.com/#/info" class="fakeButton" style="background-color:#80ced6">Vistas de la API personal.</a>
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
          <h3 class="titulo"><b>Integraciones de Fernando Nuevo</b></h3>
           <br>
           <div class="titulo">
            <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/educationExpenditures" class="fakeButton">Gastos en educación (G04)</a>
            <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/lifeStats" class="fakeButton">Índice calidad de vida (G01)</a>
          </div>
          <div class="titulo">
            <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/educationExpenditures" class="fakeButton">Gastos en educación (G04)</a>
            <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/lifeStats" class="fakeButton">Índice calidad de vida (G01)</a>
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
        <h3 class="titulo"><b>Integraciones de Humberto Garcia</b></h3>
         <br>
          <div class="titulo">
         <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/alcohol" class="fakeButton">Covid2 (Externa)</a>
         <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/cards" class="fakeButton">cartas (Externa)</a>
         <a href="https://sos2021-27.herokuapp.com/#/graphics/integrations/poverty" class="fakeButton">Pobreza (G04)</a>

          
          </div>
        </div>
      </slot>
    </div>
  </main>
  
  <style>
    .fakeButton {
      background-color: #ffb833;
      border: none;
      color: white;
      padding: 16px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      transition-duration: 0.4s;
      cursor: pointer;
      margin-right: 60px;
      border-radius: 12px;
    }
  
    .mainDiv {
      text-align: center;
      margin: 20px;
    }
  
    .box {
      width: 50%;
      border: 1px solid #aaa;
      border-radius: 2px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1em;
      margin-left: auto;
      margin-right: auto;
    }
  
    .mainDiv {
      text-align: center;
      margin: 20px;
    }
    .color {
        color: #FFB833;
    }

    .titulo {
        text-align: center;
    }
  </style>
  