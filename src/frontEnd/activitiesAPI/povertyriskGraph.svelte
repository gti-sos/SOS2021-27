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

    var sintecho = [];
    var bingomaq = [];

    var personaspobresjeres = [];
    var jugadoresjeres = [];

    var keys = [];

    async function getData() {
        const porsiacaso = await fetch(
            "/api/v2/poverty_risks/loadInitialData"
        ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.

        const pobres = await fetch(
            "/api/v2/poverty_risks"
        );
        let pobresJsons = [];
        pobresJsons = await pobres.json();

        const activities = await fetch(
            "https://sos2021-27.herokuapp.com/api/v2/azar-games-and-bet-activities/"
        );
        let activitiesJsons = [];
        activitiesJsons = await activities.json();

        for (let pobreza of pobresJsons) {
            for (let ludopatia of activitiesJsons) {
                if (pobreza.year != ludopatia.year) {
                    if (
                        (pobreza.country == "España" &&
                            ludopatia.province == "Seville") ||
                        (pobreza.country == "España" &&
                            ludopatia.province == "Valencia") ||
                        (pobreza.country == "España" &&
                            ludopatia.province == "Madrid") ||
                        (pobreza.country == "España" &&
                            ludopatia.province == "Barcelona")
                    ) {

                        keys.push(pobreza.country + " - " + ludopatia.province + "("+ludopatia.year+")");

                        sintecho.push(pobreza.home_poverty_line);
                        bingomaq.push(parseInt(ludopatia.bingo_site));

                        personaspobresjeres.push(pobreza.people_in_risk_of_poverty);
                        jugadoresjeres.push(parseInt(ludopatia.catering_bingo_machine));
                    }
                }
            }
        }

        console.log(sintecho);
        console.log(bingomaq);

        console.log(personaspobresjeres);
        console.log(jugadoresjeres);
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
                        type: "lollipop",
                        name: "pobreza en el hogar ",
                        data: sintecho,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    },
                    {
                        type: "lollipop",
                        name: "Locales de bingo",
                        data: bingomaq,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    },
                    {
                        type: "lollipop",
                        name: "numero de pobres",
                        data: personaspobresjeres,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: "white",
                        },
                    },
                    {
                        type: "lollipop",
                        name: "Jugadores activos.",
                        data: jugadoresjeres,
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
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/dumbbell.js"></script>
<script src="https://code.highcharts.com/modules/lollipop.js"></script>
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
    <h1 class="titulo2">Pobreza relacionada con la actividad en juegos</h1>
    <div style="width:800px; margin:0 auto;">
        <figure class="highcharts-figure">
            <div id="container" />
        </figure>
        <div id="uv-div" />
        <p style="centrado">
            Gráfica que muestra la pobreza en el hogar y el numero de pobres frente a los locales de bingo y jugadores activos.
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
