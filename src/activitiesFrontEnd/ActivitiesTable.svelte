<script>
    import { onMount } from "svelte";
    import { Button, Table, Pagination, PaginationItem, PaginationLink, } from "sveltestrap";


    let activities = [];
    let newActivity = {
        province: "",
        year: "",
        catering_bingo_machine: "",
        lottery_engagement : "",
        bingo_site: "",
        national_lottery_expend: "",
    };
    let paramsBusqueda="";

    
    let iniData = false;
    
    let errorPrint = "";
    let okPrint = "";
    let infoPrint = "";

    let offset = 0;
    let limit = 10;
    let page = 1;
    let lastPage = 1;
    let total = 0;

    let estructuraBusqueda=newActivity;


    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    onMount(getActivity);



    async function getActivity() {
        console.log("Fetching contacts...");
        const res = await fetch(BASE_API_PATH + "?offset=" + offset + "&limit=" + limit+paramsBusqueda);

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            activities = json;


            activities.sort((a,b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0))
            activities.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0))
            
            console.log(`Received ${activities.length} records.`);
        } else {
            console.log("Error");
        }
        pagination();
    }
    async function initialActivity() {
        console.log("Loading initial data...");
        const data = await fetch(BASE_API_PATH + "/loadInitialData").then(function (data) {

            if(data.ok) {
                console.log("OK");
                okPrint = "Base de datos inicial cargada";
                errorPrint = "";
                infoPrint="";

                getActivity();
            } else if(data.status==409){
                console.log("status mal")
                errorPrint="La base de datos inicial ya ha sido cargada.";
                okPrint = "";
                infoPrint="";

            }else {
                console.log("ERROR");
                errorPrint = "No se ha cargado la base de datos inicial.";
                okPrint = "";
                infoPrint="";
            }
        });
        iniData = true;
    }
    async function insertActivity() {
        console.log("Inserting contact " + JSON.stringify(newActivity));
        const res = await fetch(BASE_API_PATH, {
            method: "POST",
            body: JSON.stringify(newActivity),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status == 201) {
                activities.push(newActivity);
                okPrint = "Nuevo dato introducido correctamente;"
                errorPrint = "";
                infoPrint="";
                getActivity();
            } else if (res.status == 400) {
                errorPrint = "Se ha introducido un formato erróneo";
                okPrint="";
                infoPrint="";
            } else if (res.status == 409) {
                console.log("This activity  already exists");
                errorPrint = "Un registro con las mismas claves primarias ya existe en la base de datos.";
                okPrint="";
                infoPrint="";
            }else if(res.status==500){
                errorPrint = "Error del servidor al intentar guardar un registro.";
                okPrint="";
                infoPrint="";
    
            }
        });
    }

    async function deleteActivity(provincia, anyo) {
        console.log(
            "Deleting activity with keys: " + provincia + "," + anyo + "."
        );
        const res = await fetch(
            BASE_API_PATH + "/azar-games-and-bet-activities/" + provincia + "/" + anyo,
            {
                method: "DELETE",
            }
        ).then((res) => {
            if (res.status == 200) {
                activities.push(newActivity);

                okPrint = "Registro eliminado correctamente;"
                errorPrint = "";
                infoPrint="";
                getActivity();

            } else if (res.status == 404) {

                errorPrint = "No hay ningún registro a eliminar con dichas claves.";
                okPrint="";
                infoPrint="";
            } else if (res.status == 500) {

                errorPrint = "Error interno del servidor al eliminar el recurso.";
                okPrint="";
                infoPrint="";
            }
        });
    }


   
    async function deleteAll() {
        iniData = false;
        const res = await fetch(BASE_API_PATH, {
            method: "DELETE",
        }).then((res)=>{
            if (res.ok) {
                console.log("OK");
                okPrint = "La base de datos ya no contiene registros.";
                infoPrint="";
                errorPrint="";
                activities = [];
            } else {
                console.log("Error deleting DB stats");
                errorPrint = "La base de datos no ha podido ser borrada";
            }
        });


    }

    async function pagination() {
      const data = await fetch(BASE_API_PATH);
      if (data.ok) {
        const json = await data.json();
        total = json.length;
        changePage(page, offset);
      } else {
        errorPrint = "Base de datos vacía.";
      }
    }
    function range(size, start = 0) {
      return [...Array(size).keys()].map((i) => i + start);
    }

    function changePage(pageX, offsetX) {
      console.log("Changing page to " + pageX + " with " + offsetX + " offset.");
      lastPage = Math.ceil(total / 10);
      console.log("Last page = " + lastPage);
      if (pageX !== page) {
        offset = offsetX;
        page = pageX;
        getActivity();
      }
    }

    const creaParametros=()=>{

        if(estructuraBusqueda.province.length!=0){
    console.log("TIENE0")
    paramsBusqueda=paramsBusqueda+"&province="+estructuraBusqueda.province;
}
if(estructuraBusqueda.year.length!=0){
    console.log("TIENE")
    paramsBusqueda=paramsBusqueda+"&year="+estructuraBusqueda.year;
}
if(estructuraBusqueda.catering_bingo_machine.length!=0){
    paramsBusqueda=paramsBusqueda+"&catering_bingo_machine="+estructuraBusqueda.catering_bingo_machine;
}
if(estructuraBusqueda.lottery_engagement .length!=0){
    paramsBusqueda=paramsBusqueda+"&lottery_engagement ="+estructuraBusqueda.lottery_engagement ;
}
if(estructuraBusqueda.bingo_site.length!=0){
    paramsBusqueda=paramsBusqueda+"bingo_site="+estructuraBusqueda.bingo_site;
}
if(estructuraBusqueda.national_lottery_expend.length!=0){
    paramsBusqueda=paramsBusqueda+"&national_lottery_expend="+estructuraBusqueda.national_lottery_expend;
}

console.log(paramsBusqueda);
getActivity();
paramsBusqueda="";

    }
</script>

<main>
    <br>
    <h2>Registro de juegos de azar por año y provincia.</h2>
    <td
    ><Button on:click={initialActivity} color="primary">Generar Lista</Button
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

                <td><input bind:value={estructuraBusqueda.province} /></td>
                <td><input bind:value={estructuraBusqueda.year} /></td>
                <td><input bind:value={estructuraBusqueda.catering_bingo_machine} /></td>
                <td><input bind:value={estructuraBusqueda.lottery_engagement } /></td>
                <td><input bind:value={estructuraBusqueda.bingo_site} /></td>
                <td><input bind:value={estructuraBusqueda.national_lottery_expend} /></td>
                
                <Button color="primary" on:click={creaParametros} style="margin:10px;">Buscar</Button>

                   
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
                    <td> {activitie.lottery_engagement }</td>
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


    <br/>
    <div>
    <td align="left"> <Button outline color="info" href="https://sos2021-27.herokuapp.com/#/info"> Página principal </Button> </td>
    <td  style="float: right;">
      <Pagination>
        <PaginationItem class = {page === 1 ? "disabled" : ""}>
          <PaginationLink previous href="#/azar-games-and-bet-activities" on:click={() => changePage(page - 1, offset - 10)}/>
        </PaginationItem>
        {#each range(lastPage, 1) as pages}
          <PaginationItem class={page === pages ? "active" : ""}>
            <PaginationLink previous href="#/azar-games-and-bet-activities" on:click={() => changePage(pages, (pages - 1) * 10)}>{pages}</PaginationLink>
          </PaginationItem>
        {/each}
        <PaginationItem class = {page === lastPage ? "disabled" : ""}>
          <PaginationLink next href="#/azar-games-and-bet-activities" on:click={() => changePage(page + 1, offset + 10)}/>
        </PaginationItem>
      </Pagination>
    </td>
    </div>

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
</main>
