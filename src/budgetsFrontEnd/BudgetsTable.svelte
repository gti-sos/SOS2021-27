<script>
    import { onMount } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";

    let budgets = [];
    var BASE_API_PATH = "/api/v1/province-budget-and-investment-in-social-promotion";

    async function getBudget() {
        console.log("Fetching contacts...");
        const res = await fetch(BASE_API_PATH);

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            budgets = json;
            for(var x of budgets){
                array_multisort(x.province, SORT_ASC, budgets);
                if(x.province=="SEVILLE"){
                    x.province="SEVILLA";
                }
            }
            console.log(`Received ${budgets.length} records.`);
        } else {
            console.log("Error");
        }
    }
    onMount(getBudget);
</script>

<main>
    <br>
    <h2>Presupuesto por provincia e inversión en promoción social por provincia y año.</h2>
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
