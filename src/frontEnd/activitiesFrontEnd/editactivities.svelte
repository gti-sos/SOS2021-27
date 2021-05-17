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

    let errorPrint = "";
    let okPrint = "";
    let infoPrint = "";

    onMount(getactivitie);

    async function getactivitie(){
        console.log("Fetching contact...")
        const res=await fetch("api/v2/azar-games-and-bet-activities/"+params.province+"/"+params.year);

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
        const res=await fetch("/api/v2/azar-games-and-bet-activities/"+params.province+"/"+params.year,{
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
            if (res.status == 200) {

                okPrint = "El recurso se ha actualizado correctamente."
                errorPrint = "";
                infoPrint="";
                getSuicide();

            } else if (res.status == 404) {

                errorPrint = "No hay ningún registro a eliminar con dichas claves";
                okPrint="";
                infoPrint="";
            } else if (res.status == 500) {

                errorPrint = "Error interno del servidor al actualizar recurso.";
                okPrint="";
                infoPrint="";
            }
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


        <div>
            {#if okPrint}
            <div class = "alertOK" id="hideMe" style="background-color:darkseagreen">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                <strong>OK! </strong><p> </p> {okPrint}
            </div>
            {/if}
            {#if errorPrint}
            <div class = "alertERROR" id="hideMe" style="background-color:salmon">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                <strong>ERROR! </strong><p> </p> {errorPrint}
            </div>
            {/if}
            {#if infoPrint}
            <div class = "alertINFO" id="hideMe" style="background-color:cyan">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                <strong>INFO! </strong><p> </p> {infoPrint}
            </div>
            {/if}
        </div>
        <Button outline color="primary" on:click="{pop}">Volver</Button>


        

        
</main>


<style>

    .alertOK {
            margin: 0 auto;
            display: table;
            padding: 20px;
            background-color: #4ab984;
            color: white;
        }
    
        .alertERROR {
            margin: 0 auto;
            display: table;
            padding: 20px;
            background-color: #f44336;
            color: white;
        }
        
        .alertINFO {
            margin: 0 auto;
            display: table;
            padding: 20px;
            background-color: #59a9f8;
            color: white;
        }
    
    
    </style>








