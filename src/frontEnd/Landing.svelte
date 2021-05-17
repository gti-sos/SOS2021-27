<script>
  import {Jumbotron, Navbar, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';
  let list = false;
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
                <NavLink href="#/province-budget-and-investment-in-social-promotion">Presupuesto/Inversión</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/azar-games-and-bet-activities">Actividad en loteria</NavLink>
              </NavItem>
              <Dropdown  nav {list} toggle="{() => list = !list}" >
                <DropdownToggle nav caret> Gráficas </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#/graphics/suicide-records">Registro de suicidios</DropdownItem>
                  <DropdownItem href="#/graphics/province-budget-and-investment-in-social-promotion">Presupuesto/Inversión</DropdownItem>
                  <DropdownItem href="#/graphics/azar-games-and-bet-activities">Actividad en loteria</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#/graphics">Conjunto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
        </Navbar>
    </body>

    <br>

    <div class="mainDiv">
    <p>En nuestro grupo analizaremos la situación económica de los habitantes en diferentes provincias españolas con el objetivo de poder relacionar este factor con la evolución en la actividad de juegos de azar y apuestas 
    ¿aumentan o disminuyen según el nivel económico, se apuesta más cantidad o menos? y con el nivel de suicidios, donde la participación en las apuestas puede ser un factor clave para estos.</p>
    <br><br>

    <a href="https://github.com/gti-sos/SOS2021-27" class="fakeButton">REPOSITORIO</a>
    <a href="http://sos2021-27.herokuapp.com" class="fakeButton">URL</a>
    <a href="#/info" class="fakeButton">INFO</a>
    </div> 

</main>

<style>
    .fakeButton {
        background-color: #FFB833;
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

    .mainDiv{
        text-align: center;
        margin: 20px;

    }

    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
    }
</style>