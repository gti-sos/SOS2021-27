<script>

    import{
        onMount
    }from "svelte";

    import {
        pop
    }from "svelte-spa-router"

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params={};

    let activitie={}
    let updatedBingoMachine=0;
    let updatedLottery=0;

    let updatedBingosite=0;
    let updatedLotteryExpend=0;

    let errorMsg="";

    onMount(getactivitie);

    async function getactivitie(){
        console.log("Fetching contact...")
        const res=await fetch("api/v1/azar-games-and-bet-activities/"+params.province+"/"+params.year);

        if(res.ok){
            console.log("Ok: ");
            const json=await res.json();
            actividad=json;
            updatedBingoMachine=actividad.catering_bingo_machine;
            updatedLottery=actividad.lottery_engagement;
            updatedBingosite=actividad.bingo_site;
            updatedLotteryExpend=actividad.national_lottery_expend;
            console.log("Received Record")
        }else{
            errorMsg=res.status+ ": "+res.statusText;
            console.log("ERROR! "+errorMsg);
        }
    }



    async function updateactivitie(){
        console.log("Updating record... " + JSON.stringify(params.province + ","+params.year));
        const res=await fetch("/api/v1/azar-games-and-bet-activities/"+params.province+"/"+params.year,{
            method: "PUT",
            body: JSON.stringify({
                province:params.province,
                year:params.year,
                catering_bingo_machine:updatedBingoMachine,
                lottery_engagement:updatedLottery,
                bingo_site:updatedBingosite,
                national_lottery_expend:updatedLotteryExpend


            }),
            headers:{
                "Content-Type":"application/json"
            }

        }).then(function(res){
            getactivitie()
        });
    }

</script>


<main>
    <h3>Editar el registro de actividades ludicas con claves: <strong>{params.province} , {params.year}</strong></h3>
        <Table bordered>
            <thead>
                <tr>
                    <td>Provincia</td>
                    <td>Año</td>
                    <td>Maquinas de bingo activas</td>
                    <td>Actividad en la loteria</td>
                    <td>Locales de bingo</td>
                    <td>Gasto anual en loteria nacional</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{params.province}</td>
                    <td>{params.year}</td>
                    <td><input bind:value="{updatedBingoMachine}"></td>
                    <td><input bind:value="{updatedLottery}"></td>
                    <td><input bind:value="{updatedBingosite}"></td>
                    <td><input bind:value="{updatedLotteryExpend}"></td>
                    <td><Button outline color="primary" on:click={updateactivitie}>Actualizar</Button></td>
                    
                </tr>
            </tbody>
        </Table>

        {#if errorMsg}
            <p style="color: red">ERROR: {errorMsg}</p>
        {/if}
        <Button outline color="primary" on:click="{pop}">Volver</Button>
</main>
