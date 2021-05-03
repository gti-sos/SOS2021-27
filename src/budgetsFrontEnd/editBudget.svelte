<script>

    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    import {Button, Table} from "sveltestrap";

    export let params={};

    let budget={}
    let updatedBudget=0;
    let updatedInvest_promotion=0;
    let updatedLiquid=0;
    let updatedPercentage=0;

    let error="";

    onMount(getBudget);

    async function getBudget(){
        console.log("Fetching budget...")
        const data = await fetch("api/v1/province-budget-and-investment-in-social-promotion/"+ params.province + "/" + params.year);

        if(data.ok){
            console.log("OK: ");
            const json = await data.json();
            newBudget = json;
            updatedBudget = newBudget.budget;
            updatedInvest_promotion = newBudget.invest_promotion;
            updatedLiquid = newBudget.liquid;
            updatedPercentage = newBudget.percentage;
            console.log("New budget")
        }else{
            error = data.status + ": " + data.statusText;
            console.log("ERROR! " + error);
        }
    }

    async function updateBudget(){
        console.log("Updating budget... " + JSON.stringify(params.province + "," + params.year));
        const data = await fetch("/api/v1/province-budget-and-investment-in-social-promotion/" + params.province + "/" + params.year,{
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
</script>


<main>
    <h3 class="titulo">Editar el registro de presupuestos de <strong>{params.province} en el año {params.year}</strong></h3>
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
                    <td><input bind:value="{updatedLiquid}"></td>
                    <td><input bind:value="{updatedPercentage}"></td>
                    <td><Button style="background-color: #FFB833" on:click={updateBudget}> Actualizar </Button></td> 
                </tr>
            </tbody>
        </Table>

        {#if error}
            <p style="color: red">ERROR: {error}</p>
        {/if}
        <Button outline color="primary" on:click="{pop}">Volver</Button>
</main>

<style>
    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
    }
</style>
