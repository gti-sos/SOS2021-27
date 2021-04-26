<script>
    import { onMount } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";

    let suicides = [];
    var BASE_API_PATH = "/api/v1";

    async function getSuicide() {
        console.log("Fetching contacts...");
        const res = await fetch(BASE_API_PATH + "/suicide-records");

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            suicides = json;
            console.log(`Received ${suicides.length} records.`);
        } else {
            console.log("Error");
        }
    }

    onMount(getSuicide);
</script>

<main>
    <br>
    <h2>Registro de suicidios por año y provincia.</h2>
    <Table bordered>
        <thead>

            <tr>
                <td>Provincia</td>
                <td>Año</td>
                <td>Suicidios Hombres</td>
                <td>Suicidios Mujeres</td>
                <td>Suicidios Totales</td>
                <td>Ratio suicidios Hombre/Mujer</td>
            </tr>
        </thead>
        <tbody>
            {#each suicides as suicide}
                <tr>
                    <td> {suicide.province}</td>
                    <td> {suicide.year}</td>
                    <td> {suicide.suic_man}</td>
                    <td> {suicide.suic_woman}</td>
                    <td> {suicide.suic_total}</td>
                    <td> {suicide.suic_rate_mw}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
