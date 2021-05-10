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

    let suicidio={}
    let updatedMan=0;
    let updatedWoman=0;

    let updatedTotal=0;
    let updated_ratio=0;



    let errorPrint = "";
    let okPrint = "";
    let infoPrint = "";

    onMount(getSuicide);

    async function getSuicide(){
        console.log("Fetching contact...")
        const res=await fetch("api/v1/suicide-records/"+params.province+"/"+params.year);

        if(res.ok){
            console.log("Ok: ");
            const json=await res.json();
            suicidio=json;
            updatedMan=suicidio.suic_man;
            updatedWoman=suicidio.suic_woman;
            updatedTotal=suicidio.suic_total;
            updated_ratio=suicidio.suic_rate_mw;
            console.log("Received Record")
        }else{
            errorMsg=res.status+ ": "+res.statusText;
            console.log("ERROR! "+errorMsg);
        }
    }



    async function updateSuicide(){
        console.log("Updating record... " + JSON.stringify(params.province + ","+params.year));
        const res=await fetch("/api/v1/suicide-records/"+params.province+"/"+params.year,{
            method: "PUT",
            body: JSON.stringify({
                province:params.province,
                year:params.year,
                suic_man:updatedMan,
                suic_woman:updatedWoman,
                suic_total:updatedTotal,
                suic_rate_mw:updated_ratio


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
    <h3>Editar el registro de suicidio con claves: <strong>{params.province} , {params.year}</strong></h3>
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
                <tr>
                    <td>{params.province}</td>
                    <td>{params.year}</td>
                    <td><input bind:value="{updatedMan}"></td>
                    <td><input bind:value="{updatedWoman}"></td>
                    <td><input bind:value="{updatedTotal}"></td>
                    <td><input bind:value="{updated_ratio}"></td>
                    <td><Button outline color="primary" on:click={updateSuicide}>Actualizar</Button></td>
                    
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