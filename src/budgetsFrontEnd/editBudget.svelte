<script>

    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    import {Button, Table} from "sveltestrap";

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
    <h3 class="titulo">Editar el registro de presupuestos de <strong>{params.province}</strong> en el año <strong>{params.year}</strong></h3>
        <Table bordered>
            <thead>
                <tr>
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

    html, body {
        height:100%;
        width:100%;
        margin:0;
        padding:0;
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
