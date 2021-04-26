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
            console.log(`Received ${budgets.length} records.`);
        } else {
            console.log("Error");
        }
    }

    onMount(getBudget);
</script>

<main>
    <br>
    <h2>Presupuesto por provincia e inversión en promoción social.</h2>
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
            {#each budgets as budgets}
                <tr>
                    <td> {budgets.province}</td>
                    <td> {budgets.year}</td>
                    <td> {budgets.budget}</td>
                    <td> {budgets.invest_promotion}</td>
                    <td> {budgets.liquid}</td>
                    <td> {budgets.percentage}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
