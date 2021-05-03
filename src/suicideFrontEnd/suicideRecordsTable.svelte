<script>
    import { onMount } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    let suicides = [];

    let newSuicide = {
        province: "",
        year: "",
        suic_man: "",
        suic_woman: "",
        suic_total: "",
        suic_rate_mw: "",
    };

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

    async function insertSuicide() {
        console.log("Inserting contact " + JSON.stringify(newSuicide));
        const res = await fetch(BASE_API_PATH + "/suicide-records", {
            method: "POST",
            body: JSON.stringify(newSuicide),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            getSuicide();
        });
    }

    async function deleteSuicide(provincia, anyo) {
        console.log(
            "Deleting contact with keys: " + provincia + "," + anyo + "."
        );
        const res = await fetch(
            BASE_API_PATH + "/suicide-records/" + provincia + "/" + anyo,
            {
                method: "DELETE",
            }
        ).then((res) => {
            getSuicide();
        });
    }

    async function deleteAll() {
        const res = await fetch(BASE_API_PATH + "/suicide-records", {
            method: "DELETE",
        });

        if (res.ok) {
            getSuicide();
        } else {
            console.log("Error");
        }
    }

    async function generateAll() {
        const res = await fetch(
            BASE_API_PATH + "/suicide-records/loadInitialData"
        );

        if (res.ok) {
            getSuicide();
        } else {
            console.log("Error");
        }
    }

    onMount(getSuicide);
</script>

<main>
    <br />
    <h2>Registro de suicidios por año y provincia.</h2>

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
                <td>Suicidios Hombres</td>
                <td>Suicidios Mujeres</td>
                <td>Suicidios Totales</td>
                <td>Ratio suicidios Hombre/Mujer</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newSuicide.province} /></td>
                <td><input bind:value={newSuicide.year} /></td>
                <td><input bind:value={newSuicide.suic_man} /></td>
                <td><input bind:value={newSuicide.suic_woman} /></td>
                <td><input bind:value={newSuicide.suic_total} /></td>
                <td><input bind:value={newSuicide.suic_rate_mw} /></td>
                <td
                    ><Button on:click={insertSuicide}>Insertar Registro</Button
                    ></td
                >
            </tr>
            {#each suicides as suicide}
                <tr>
                    <td
                        ><a
                            href="#/suicide-records/{suicide.province}/{suicide.year}"
                        >
                            {suicide.province}</a
                        ></td
                    >
                    <td
                        ><a
                            href="#/suicide-records/{suicide.province}/{suicide.year}"
                        >
                            {suicide.year}</a
                        ></td
                    >
                    <td> {suicide.suic_man}</td>
                    <td> {suicide.suic_woman}</td>
                    <td> {suicide.suic_total}</td>
                    <td> {suicide.suic_rate_mw}</td>

                    <td
                        ><Button
                            on:click={deleteSuicide(
                                suicide.province,
                                suicide.year
                            )}>Borrar Recurso</Button
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
