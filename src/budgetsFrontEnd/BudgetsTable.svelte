<script>
    import { onMount } from "svelte";
    import { Button, Table, } from "sveltestrap"; 

    let budgets = [];
    let porcentaje = "";
    let newBudget = {
        province: "",
        year: "",
        budget: "",
        invest_promotion: "",
        liquid: "",
        percentage: porcentaje,
    };
    let iniData = false;
    var BASE_API_PATH = "/api/v1/province-budget-and-investment-in-social-promotion";

    async function getBudgets() {
        console.log("Fetching budgets...");
        const data = await fetch(BASE_API_PATH);
        if (data.ok) {
            console.log("OK");
            const json = await data.json();
            budgets = json;
            
            budgets.sort((a,b) => new String(a.province) > new String(b.province));
            budgets.sort((a,b) => new Integer(a.year) > new Integer(b.year));
            console.log(`Received ${budgets.length} budgets.`);
        } else {
            console.log("ERROR");
        }
    }
    
    async function initialBudgets() {
        console.log("Loading initial data...");
        const data = await fetch(BASE_API_PATH + "/loadInitialData").then(function (data) {
            if(data.ok) {
                console.log("OK");
                getBudgets();
            } else {
                error = 404;
                console.log("ERROR");
            }
        });
        iniData = true;
    }

    async function postBudget() {
        console.log("Posting budget...");
        const data = await fetch(BASE_API_PATH, {
            method: "POST",
            body: JSON.stringify(newBudget),
            headers: { "Content-Type": "application/json" },
        }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                getBudgets();
                porcentaje = newBudget.budget/newBudget.invest_promotion;
            } else {
                console.log("ERROR");
            }
        });
    }

    async function deleteBudgets() {
        console.log("Deleting budgets...");
        iniData = false;
        const  data = await fetch(BASE_API_PATH, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                budgets = [];
            } else if (data.status == 404) {
                console.log("DB is empty");
            } else {
                console.log("Error deleting DB stats");
            }
        });
    }

    async function deleteBudget(provincia, anyo) {
        console.log("Deleting budget from " + provincia + " " + anyo);
        const data = await fetch(BASE_API_PATH + "/" + provincia + "/" + anyo, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                getBudgets();
            } else {
                console.log("ERROR");
            }
        });
    }

    onMount(getBudgets);

</script>

<main>
    <br/>
    <div>
        {#if iniData}
            <td> <Button style="background-color: #FFB833;" disabled> Cargar tabla </Button> </td>
        {:else}
            <td> <Button style="background-color: #FFB833;" on:click={initialBudgets}> Cargar tabla </Button> </td>
        {/if}
            <td> <Button style="background-color: #CD1C1C" on:click={deleteBudgets}> Borrar tabla </Button> </td>
    </div>

    <Table bordered style="text-align: center;">
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
                <td><input bind:value="{newBudget.province}"/></td>
                <td><input bind:value="{newBudget.year}"/></td>
                <td><input bind:value="{newBudget.budget}"/></td>
                <td><input bind:value="{newBudget.invest_promotion}"/></td>
                <td><input bind:value="{newBudget.liquid}"/></td>
                <td>- - -</td>
                <td><Button style="background-color: #FFB833" on:click={postBudget}> Guardar </Button></td>
            </tr>
            {#each budgets as budgetSvelte}
                <tr>
                    <td><a href="#/province-budget-and-investment-in-social-promotion/{budgetSvelte.province}/{budgetSvelte.year}">{budgetSvelte.province}</a></td>
                    <td><a href="#/province-budget-and-investment-in-social-promotion/{budgetSvelte.province}/{budgetSvelte.year}">{budgetSvelte.year}</a></td>
                    <td>{budgetSvelte.budget}</td>
                    <td>{budgetSvelte.invest_promotion}</td>
                    <td>{budgetSvelte.liquid}</td>
                    <td>{budgetSvelte.percentage}</td>
                    <td><Button style="background-color: #CD1C1C" on:click={deleteBudget(budgetSvelte.province, budgetSvelte.year)}> Borrar </Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>

<style>
    .color {
        color: #FFB833;
    }

    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
    }
</style>