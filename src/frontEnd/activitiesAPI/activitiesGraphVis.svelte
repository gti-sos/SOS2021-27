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

    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    let activities = [];

    let show=[];

    async function getData() {
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH);

        if (res.ok) {
            console.log("Ok.");
            activities = await res.json();

            let provinciasTemp = [];


            
            activities.forEach((element) => {
                let obj = {};
                obj["name"] = element.province;
                obj["value"] = 0;

                let checker = 0;
                for (let x of provinciasTemp) {
                    if (x.name == element.province) {
                        checker = checker + 1;
                    }
                }

                if (checker == 0) {
                    provinciasTemp.push(obj);
                }
            });

            console.log(provinciasTemp)


            activities.forEach((element) => {
                for (let x of provinciasTemp) {
                    if (x.name == element.province) { // x.name es el nombre de la provincia en mi array temporal
                        x.value =
                            parseInt(x.value) + parseInt(element.bingo_site);
                    }
                }
            });
            

            show=provinciasTemp;
            

            
        } else {
            console.log("Error!");
        }
    }

    async function loadGraph() {
        getData().then(() => {
            console.log(show)
            var graphdef = {
                categories: ["uvCharts"],
                dataset: {
                    uvCharts:show
                },
            };

            var chart = uv.chart('Donut', graphdef);
        });
    }

</script>

<svelte:head>
    


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"  ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js" on:load={loadGraph}></script>
</svelte:head>

<main>
    <body>
        <Jumbotron class="p-3" style="background-color: #FFB833">
            <h1 class="titulo; mainDiv" style="color: white">
                Presupuesto por provincia y año, e inversión en promoción social
            </h1>
        </Jumbotron>
        <Navbar
            style="background-color: #FFB833; color:white;"
            light
            expand="lg"
        >
            <NavbarBrand href="#/">INICIO</NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink href="#/suicide-records"
                        >Registro de suicidios</NavLink
                    >
                </NavItem>
                <NavItem>
                    <NavLink
                        href="#/province-budget-and-investment-in-social-promotion"
                        >Presupuesto/Inversión</NavLink
                    >
                </NavItem>
                <NavItem>
                    <NavLink href="#/azar-games-and-bet-activities"
                        >Actividad en loteria</NavLink
                    >
                </NavItem>
                <Dropdown nav {isOpen} toggle={() => (isOpen = !isOpen)}>
                    <DropdownToggle nav caret>Gráficas</DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem href="#/graphics/suicide-records"
                            >Registro de suicidios</DropdownItem
                        >
                        <DropdownItem
                            href="#/graphics/province-budget-and-investment-in-social-promotion"
                            >Presupuesto/Inversión</DropdownItem
                        >
                        <DropdownItem
                            href="#/graphics/azar-games-and-bet-activities"
                            >Actividad en loteria</DropdownItem
                        >
                        <DropdownItem divider />
                        <DropdownItem href="#/graphics">Conjunto</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        </Navbar>
    </body>
    <br />
    <h1 class="titulo2">Gráfica de datos</h1>
    <div style="width:800px; margin:0 auto;">
        <figure class="highcharts-figure">
            <div id="container" />
            <p style="centrado">
                Gráfica que nos muestra el total de suicidios según las provincias en los años registrados en la base de datos.
            </p>
        </figure>

        <div id='uv-div' ></div>
    </div>

    

    
</main>

<style>
    .titulo2 {
        color: #000000;
        text-align: center;
        font-size: 150%;
    }
    .mainDiv {
        text-align: center;
        margin: 20px;
    }
</style>
