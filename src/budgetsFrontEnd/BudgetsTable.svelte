<script>
    import { onMount } from "svelte";
    import { Button, Table } from "sveltestrap"; 

    let budgets = [];
    let iniData = false;
    var BASE_API_PATH = "/api/v1/province-budget-and-investment-in-social-promotion";

    async function getBudget() {
        console.log("Loading data...");
        const data = await fetch(BASE_API_PATH + "/loadInitialData");
        iniData = true;

        if (data.ok) {
            console.log("Ok.");
            const json = await data.json();
            budgets = json;
            for(var x of budgets){
                if(x.province=="SEVILLE"){
                    x.province="SEVILLA";
                }
            }
            budgets.sort((a,b) => new String(a.province) > new String(b.province));
            budgets.sort((a,b) => new Integer(a.year) > new Integer(b.year));
            console.log(`Received ${budgets.length} budgets.`);
        } else {
            console.log("Error");
        }
    }

    async function deleteBudgets() {
        console.log("Deleting budgets...");
        iniData = false;
        const  data = await fetch(ABASE_API_PATH, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("Ok.");
                budgets = [];
            } else if (data.status == 404) {
                console.log("DB is empty");
            } else {
                console.log("Error deleting DB stats");
            }
        });
    }
    onMount(getBudget);
</script>

<main>
    <br>
    <h2>Presupuesto por provincia e inversión en promoción social por provincia y año.</h2>
    <div>
        {#if iniData}
            <Button style="background-color: yellow;" disabled> Cargar tabla </Button>
        {:else}
            <Button style="background-color: yellow;" on:click={getBudgets}> Cargar tabla </Button>
        {/if}
        <Button style="background-color: red" on:click={deleteBudgets}> Borrar tabla </Button>
    </div>

    {#if budgets.length != 0}
        <br />
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
            {#each budgets as budgetSvelte}
                <tr>
                    <td> {budgetSvelte.province}</td>
                    <td> {budgetSvelte.year}</td>
                    <td> {budgetSvelte.budget}</td>
                    <td> {budgetSvelte.invest_promotion}</td>
                    <td> {budgetSvelte.liquid}</td>
                    <td> {budgetSvelte.percentage}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
