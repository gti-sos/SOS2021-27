<script>
    import { onMount } from "svelte";

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

    var pieKeys = [];

    async function getData() {
        const porsiacaso = await fetch(
            "/api/integration/depression_stats/loadInitialData"
        ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.

        const anxiety = await fetch("/api/integration/depression_stats");
        let depressionJsons = [];
        depressionJsons = await anxiety.json();

        const suicide = await fetch(
            "https://sos2021-27.herokuapp.com/api/v2/suicide-records/"
        );
        let suicideJsons = [];
        suicideJsons = await suicide.json();

        // La idea es obtener la depresió acumulada en el país por año (Juntando todas las provincias)

        let anyos2 = [];
        for (let depYear of depressionJsons) {
            anyos2.push(depYear.year);
        }
        let anyosSet2 = new Set(anyos2);


        console.log(suicideJsons);

        for (let anyo of anyosSet2) {
            let anyoActual=anyo;
            let obj = {};
            let obj2 = {};
            let depManAcum=0.;
            let depWomanAcum=0.;

            for (let depLog of depressionJsons) {
                if(depLog.year==anyoActual){
                    depManAcum+=depLog.depression_men;
                    
                    depWomanAcum+=depLog.depression_women;
                }

            }

            obj["name"]="Depresión acumulada en el País (Hombres) - "+ anyo;
            obj["value"]=Math.round(depManAcum);

            obj2["name"]="Depresión acumulada en el País (Mujeres) - "+ anyo;
            obj2["value"]=Math.round(depWomanAcum);

            pieKeys.push(obj);
            pieKeys.push(obj2);
        }

        console.log(pieKeys)

        // -----------------------------------------------------------------------

        // La idea es acumular el total de suicidio por año (Juntando todas las provincias)

        let anyos = [];
        for (let suicYear of suicideJsons) {
            anyos.push(suicYear.year);
        }
        let anyosSet = new Set(anyos);

        for (let anyo of anyosSet) {
            let anyoActual=anyo;
            let obj = {};
            let obj2 = {};
            let suicManAcum=0;
            let suicWomanAcum=0;

            for (let suicideLog of suicideJsons) {
                if(suicideLog.year==anyoActual){
                    suicManAcum+=parseInt(suicideLog.suic_man);
                    suicWomanAcum+=parseInt(suicideLog.suic_woman);
                }

            }

            obj["name"]="Suicidios Totales en el País (Hombres) - "+ anyo ;
            obj["value"]=suicManAcum;

            obj2["name"]="Suicidios Totales en el País (Mujeres) - " + anyo;
            obj2["value"]=suicWomanAcum;

            pieKeys.push(obj);
            pieKeys.push(obj2);




            
        }

    }

    //  onMount(getData);
    async function loadGraph() {
        getData().then(() => {
            var graphdef = {
                categories: [""], // Esta vez no usaré categoria ya que viene implicita en el name.
                dataset: {
                    "": pieKeys,
                },
            };

            var chart = uv.chart("Pie", graphdef, {
                meta: {
                    caption:
                        "Salud mental en provincias y regiones de españa en diferentes años.",
                },
            });

            console.log("fin");
        });
    }
</script>

<svelte:head>
    <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <body>
        <Jumbotron class="p-3" style="background-color: #FFB833">
            <h1 class="titulo; mainDiv" style="color: white">
                Integración Api Depresión
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
                <NavItem>
                    <NavLink href="#/integrations">Integraciones</NavLink>
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
    <h1 class="titulo2">Depresión y suicidios acumulados en el país por año. </h1>
    <div style="width:800px; margin:0 auto;">
        <figure class="highcharts-figure">
            <div id="container" />
        </figure>
        <div id="uv-div" />
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
