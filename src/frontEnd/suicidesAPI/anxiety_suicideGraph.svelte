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

    var ansHombres = [];
    var suiHombres = [];

    var ansMujeres = [];
    var suiMujeres = [];

    var keys = [];

    async function getData() {
        const porsiacaso = await fetch(
            "/api/integration/anxiety_stats/loadInitialData"
        ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.

        const anxiety = await fetch(
            "/api/integration/anxiety_stats"
        );
        let anxietyJsons = [];
        anxietyJsons = await anxiety.json();

        const suicide = await fetch(
            "https://sos2021-27.herokuapp.com/api/v2/suicide-records/"
        );
        let suicideJsons = [];
        suicideJsons = await suicide.json();

        for (let ansiedad of anxietyJsons) {
            for (let suicidio of suicideJsons) {
                if (ansiedad.year == suicidio.year) {
                    if (
                        (ansiedad.country == "Spain_Andalucia" &&
                            suicidio.province == "SEVILLE") ||
                        (ansiedad.country == "Spain_CValenciana" &&
                            suicidio.province == "VALENCIA") ||
                        (ansiedad.country == "Spain_Madrid" &&
                            suicidio.province == "MADRID") ||
                        (ansiedad.country == "Spain_Cataluña" &&
                            suicidio.province == "BARCELONA")
                    ) {

                        keys.push(ansiedad.country + " - " + suicidio.province + "("+suicidio.year+")");

                        ansHombres.push(ansiedad.anxiety_men);
                        suiHombres.push(parseInt(suicidio.suic_man));

                        ansMujeres.push(ansiedad.anxiety_women);
                        suiMujeres.push(parseInt(suicidio.suic_woman));
                    }
                }
            }
        }

        console.log(ansHombres);
        console.log(suiHombres);

        console.log(ansMujeres);
        console.log(suiMujeres);
    }

    //  onMount(getData);
    async function loadGraph() {
        getData().then(() => {

            
            Highcharts.chart("container", {
                title: {
                    text: "",
                },
                xAxis: {
                    categories: keys,
                },
                labels: {
                    items: [
                        {

                            style: {
                                left: "50px",
                                top: "18px",
                                color:
                                    // theme
                                    (Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style
                                            .color) ||
                                    "black",
                            },
                        },
                    ],
                },
                series: [
                    {
                        type: "spline",
                        name: "Ansiedad en la región, Hombres.",
                        data: ansHombres,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    },
                    {
                        type: "spline",
                        name: "Suicidio en la capital, Hombres.",
                        data: suiHombres,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    },
                    {
                        type: "spline",
                        name: "Ansiedad en la región, Mujeres.",
                        data: ansMujeres,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    },
                    {
                        type: "spline",
                        name: "Suicidios en la capital, Mujeres.",
                        data: suiMujeres,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    }
                ]
            });
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <body>
        <Jumbotron class="p-3" style="background-color: #FFB833">
            <h1 class="titulo; mainDiv" style="color: white">
                Integración Api Ansiedad
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
    <h1 class="titulo2">Ansiedad en regiones y suicidios en la capital.</h1>
    <div style="width:800px; margin:0 auto;">
        <figure class="highcharts-figure">
            <div id="container" />
        </figure>
        <div id="uv-div" />
        <p style="centrado">
            Gráfica que muestra la ansiedad por sexos de una región Española en un año determinado y los suicidios por sexo de su correspondiente capital, en el mismo año.
        </p>
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
