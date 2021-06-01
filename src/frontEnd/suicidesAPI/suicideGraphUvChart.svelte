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

    var BASE_API_PATH = "/api/v2/suicide-records";
    let suicides = [];

    let show=[];

    // La idea es devolver un array de datos con los suicidios totales agrupados por provincias.
    async function getData() {
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH);

        if (res.ok) {
            console.log("Ok.");
            suicides = await res.json();

            let provinciasTemp = [];


            // Tendré que guardar las provincias y un valor inicial de suicidios en el array temporal (sin repetir provincias).
            // Se guardarán bajo el nombre de name y value , pues así lo requiere esta visualización de la gráfica.
            suicides.forEach((element) => {
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


            // Recorro la BD inicial y voy sumando los suicidios totales según la provincia.
            suicides.forEach((element) => {
                for (let x of provinciasTemp) {
                    if (x.name == element.province) { // x.name es el nombre de la provincia en mi array temporal
                        x.value =
                            parseInt(x.value) + parseInt(element.suic_total);
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

    /*
    var chartObject = uv.chart(
        chartType,
        graphDefinition,
        optionalConfiguration
    );
    */
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
    <div style="margin-bottom: 15px">
        <figure class="highcharts-figure">
            <div id="container" />
            <p style="centrado">
                Gráfica que relaciona el presupuesto de cada provincia y año con
                la inversión que realiza cada una de estas en promoción social.
            </p>
        </figure>
    </div>

    

    <div id='uv-div'></div>
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
