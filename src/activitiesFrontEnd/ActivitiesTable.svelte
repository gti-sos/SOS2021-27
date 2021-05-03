<script>
    import { onMount } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";

    let activities = [];
    var BASE_API_PATH = "/api/v1";

    async function getActivity() {
        console.log("Fetching contacts...");
        const res = await fetch(BASE_API_PATH + "/azar-games-and-bet-activities");

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            activities = json;

            for(var x of activities){ // Traducción realizada.
                if(x.province=="SEVILLE"){
                    x.province="SEVILLA";
                }
            }
            
            console.log(`Received ${activities.length} records.`);
        } else {
            console.log("Error");
        }
    }

    onMount(getActivity);
</script>

<main>
    <br>
    <h2>Registro de juegos de azar por año y provincia.</h2>
    <Table bordered>
        <thead>

            <tr>
                <td>Provincia</td>
                <td>Año</td>
                <td>Maquinas de bingo activas</td>
                <td>Usuarios en la loteria</td>
                <td>locales de bingo</td>
                <td>Gastos en la loteria nacional</td>
            </tr>
        </thead>
        <tbody>
            {#each activities as activity}
                <tr>
                    <td> {activity.province}</td>
                    <td> {activity.year}</td>
                    <td> {activity.catering_bingo_machine}</td>
                    <td> {activity.lottery_engagement}</td>
                    <td> {activity.bingo_site}</td>
                    <td> {activity.national_lottery_expend}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
