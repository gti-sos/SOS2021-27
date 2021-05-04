<script>
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    let activities = [];
    let newActivity = {
        province: "",
        year: "",
        catering_bingo_machine: "",
        lottery_engagement: "",
        bingo_site: "",
        national_lottery_expend: "",
    };
    var BASE_API_PATH = "/api/v1";

    async function getActivity() {
        console.log("Fetching contacts...");
        const res = await fetch(BASE_API_PATH + "/azar-games-and-bet-activities");

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            activities = json;
            
            console.log(`Received ${activities.length} records.`);
        } else {
            console.log("Error");
        }
    }
    async function insertActivity() {
        console.log("Inserting contact " + JSON.stringify(newActivity));
        const res = await fetch(BASE_API_PATH + "/azar-games-and-bet-activities", {
            method: "POST",
            body: JSON.stringify(newActivity),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            getActivity();
        });
    }

    async function deleteActivity(provincia, anyo) {
        console.log(
            "Deleting contact with keys: " + provincia + "," + anyo + "."
        );
        const res = await fetch(
            BASE_API_PATH + "/azar-games-and-bet-activities/" + provincia + "/" + anyo,
            {
                method: "DELETE",
            }
        ).then((res) => {
            getActivity();
        });
    }

    async function deleteAll() {
        const res = await fetch(BASE_API_PATH + "/azar-games-and-bet-activities", {
            method: "DELETE",
        });

        if (res.ok) {
            getActivity();
        } else {
            console.log("Error");
        }
    }

    async function generateAll() {
        const res = await fetch(
            BASE_API_PATH + "/azar-games-and-bet-activities/loadInitialData"
        );

        if (res.ok) {
            getActivity();
        } else {
            console.log("Error");
        }
    }


    onMount(getActivity);
</script>

<main>
    <br>
    <h2>Registro de juegos de azar por año y provincia.</h2>
    <td
    ><Button on:click={generateAll} color="primary">Generar Lista</Button
    ></td
>

<td
    ><Button on:click={deleteAll} color="secondary">Limpiar Lista</Button
    ></td
>


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
            <tr>

                <td><input bind:value={newActivity.province} /></td>
                <td><input bind:value={newActivity.year} /></td>
                <td><input bind:value={newActivity.catering_bingo_machine} /></td>
                <td><input bind:value={newActivity.lottery_engagement} /></td>
                <td><input bind:value={newActivity.bingo_site} /></td>
                <td><input bind:value={newActivity.national_lottery_expend} /></td>
                <td
                    ><Button on:click={insertActivity}>Insertar Registro</Button
                    ></td
                >
            </tr>
            {#each activities as activitie}
                <tr>
                    <td
                        ><a
                            href="#/azar-games-and-bet-activities/{activitie.province}/{activitie.year}"
                        >
                            {activitie.province}</a
                        ></td
                    >
                    <td
                        ><a
                            href="#/azar-games-and-bet-activities/{activitie.province}/{activitie.year}"
                        >
                            {activitie.year}</a
                        ></td
                    >
                    <td> {activitie.catering_bingo_machine}</td>
                    <td> {activitie.lottery_engagement}</td>
                    <td> {activitie.bingo_site}</td>
                    <td> {activitie.national_lottery_expend}</td>

                    <td
                        ><Button
                            on:click={deleteActivity(
                                activitie.province,
                                activitie.year
                            )}>Borrar Recurso</Button
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </Table>
                    
</main>
