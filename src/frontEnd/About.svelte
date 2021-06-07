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
                  <DropdownItem href="#/analytics">Conjunto</DropdownItem>
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
          <h3 class="titulo"><b>Vídeo de Javier García</b></h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/ObN0b3M_fGI?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br>
          <div class="titulo">
         
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
          <h3 class="titulo"><b>Vídeo de Fernando Nuevo</b></h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/BFnAANVKiBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           <br>
           <div class="titulo">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/BFnAANVKiBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
        <h3 class="titulo"><b>Vídeo de Humberto Garcia</b></h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/MA7f7JfWNS8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         <br>
         <div class="titulo">
         
          </div>
        </div>
      </slot>
    </div>
</main>

<style>

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
  .titulo {
        text-align: center;
    }
</style>
