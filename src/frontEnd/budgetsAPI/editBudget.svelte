<script>

    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    import {Button, Table, Jumbotron, Navbar, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "sveltestrap";

    export let params = {};

    let newBudget = {};
    let updatedBudget = 0;
    let updatedInvest_promotion = 0;
    let updatedLiquid = 0;
    let updatedPercentage = 0;

    let errorPrint = "";
    let okPrint = "";

    onMount(getBudget);

    async function getBudget(){
        console.log("Fetching budget...")
        const data = await fetch("api/v2/province-budget-and-investment-in-social-promotion/"+ params.province + "/" + params.year);

        if(data.ok){
            console.log("OK: ");
            const json = await data.json();
            newBudget = json;
            updatedBudget = newBudget.budget;
            updatedInvest_promotion = newBudget.invest_promotion;
            updatedLiquid = newBudget.liquid;
            updatedPercentage = ((newBudget.budget)/(newBudget.invest_promotion));
            console.log("New budget")
        }else{
            errorPrint = data.status + ": " + data.statusText;
            console.log("ERROR! " + errorPrint);
        }
    }

    async function updateBudget(){
        console.log("Updating budget... " + JSON.stringify(params.province + "," + params.year));
        const data = await fetch("/api/v2/province-budget-and-investment-in-social-promotion/" + params.province + "/" + params.year,{
            method: "PUT",
            body: JSON.stringify({
                province:params.province,
                year:params.year,
                budget:updatedBudget,
                invest_promotion:updatedInvest_promotion,
                liquid:updatedLiquid,
                percentage:updatedPercentage
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(function(data){
            getBudget()
        });
    }

    async function actualiza(){
        updateBudget();
        okPrint = "Guardando...";
        await sleep(3000);
        window.location.href = "http://sos2021-27.herokuapp.com/#/province-budget-and-investment-in-social-promotion";
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>


<main>
    <body>
    <Jumbotron class="p-3" style="background-color: #FFB833">
        <h1 class="titulo; mainDiv" style="color: white">Presupuesto por provincia y año, e inversión en promoción social.</h1>
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
              <Dropdown>
                <DropdownToggle nav caret> Gráficas </DropdownToggle>
                <DropdownMenu>
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
        <Table hover bordered style="text-align: center;">
            <thead>
                <tr style="background-color: #FFB833; color: #FFFFFF; font-weight: bold;">
                    <td>Provincia</td>
                    <td>Año</td>
                    <td>Presupuesto</td>
                    <td>Inversión en promoción social</td>
                    <td>Saldo líquido final</td>
                    <td>Porcentage sobre presupuesto/inversión</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{params.province}</td>
                    <td>{params.year}</td>
                    <td><input bind:value="{updatedBudget}"></td>
                    <td><input bind:value="{updatedInvest_promotion}"></td>
                    <td> - - - </td>
                    <td> - - - </td>
                    <td><Button style="background-color: #FFB833" on:click="{actualiza}"> Actualizar </Button></td> 
                </tr>
            </tbody>
        </Table>

         <div>
        {#if okPrint}
        <div class = "hideMe">
            <span class = "alertOK">
            <strong style="align:center">OK! </strong><p></p> {okPrint}
            </span>
        </div>
        {/if}
        {#if errorPrint}
        <div class = "hideMe">
            <span class = "alertERROR">
            <strong style="align:center">ERROR! </strong><p></p> {errorPrint}
            </span>
        </div>
        {/if}
    </div>
        <Button outline color="primary" on:click="{pop}">Volver</Button>
</main>

<style>
    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
        text-align: center;
    }

    .mainDiv{
        text-align: center;
        margin: 20px;

    }

    .alertOK {
        margin: 0 auto;
        display: table;
        padding: 20px;
        background-color: #4ab984;
        color: white;
    }

    .alertERROR {
        margin: 0 auto;
        display: table;
        padding: 20px;
        background-color: #f44336;
        color: white;
    }

    .hideMe {
        -moz-animation: cssAnimation 0s ease-in 5s forwards;
    /* Firefox */
        -webkit-animation: cssAnimation 0s ease-in 5s forwards;
    /* Safari and Chrome */
        -o-animation: cssAnimation 0s ease-in 5s forwards;
    /* Opera */
        animation: cssAnimation 0s ease-in 5s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    @keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            left: -9999px; 
            position: absolute;   
        }
    }

    @-webkit-keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            left: -9999px; 
            position: absolute;   
        }
    }
</style>
