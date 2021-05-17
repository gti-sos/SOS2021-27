<script>
    import { onMount } from "svelte";

    import { Button, Table, Pagination, PaginationItem, PaginationLink, } from "sveltestrap";

    let paramsBusqueda="";
    

    let suicides = [];

    let newSuicide = {
        province: "",
        year: "",
        suic_man: "",
        suic_woman: "",
        suic_total: "",
        suic_rate_mw: "",
    };

    let estructuraBusqueda=newSuicide;

    let iniData = false;


    let errorPrint = "";
    let okPrint = "";
    let infoPrint = "";

    let offset = 0;
    let limit = 10;
    let page = 1;
    let lastPage = 1;
    let total = 0;

    var BASE_API_PATH = "/api/v2/suicide-records";

    onMount(getSuicide);

    async function getSuicide() {
        console.log("Fetching contacts...");
        const res = await fetch(BASE_API_PATH + "?offset=" + offset + "&limit=" + limit+paramsBusqueda);

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            suicides = json;
            okPrint = "Se han encontrado " + suicides.length +" recursos.";
            errorPrint = "";
            infoPrint="";
            suicides.sort((a,b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0))
            suicides.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0))
            
            console.log(`Received ${suicides.length} records.`);
        } else if (res.status==404){
            okPrint = "";
            errorPrint = "No se han encontrado registros con dichos parámetros.";
            infoPrint="";
        } else{
            okPrint = "";
            errorPrint = "Error interno del servidor al buscar el recurso.";
            infoPrint="";
        }
        pagination();
    }


    async function initialSuicide() {
        console.log("Loading initial data...");
        const data = await fetch(BASE_API_PATH + "/loadInitialData").then(function (data) {

            if(data.ok) {
                console.log("OK");
                okPrint = "Base de datos inicial cargada";
                errorPrint = "";
                infoPrint="";

                getSuicide();
            } else if(data.status==409){
                console.log("status mal")
                errorPrint="Limpie la base de datos antes de cargarla de nuevo.";
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



    async function insertSuicide() {
        console.log("Inserting contact " + JSON.stringify(newSuicide));
        const res = await fetch(BASE_API_PATH, {
            method: "POST",
            body: JSON.stringify(newSuicide),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status == 201) {
                suicides.push(newSuicide);
                okPrint = "Nuevo dato introducido correctamente;"
                errorPrint = "";
                infoPrint="";
                getSuicide();
            } else if (res.status == 400) {
                errorPrint = "Se ha introducido un formato erróneo";
                okPrint="";
                infoPrint="";
            } else if (res.status == 409) {
                console.log("This suicide record already exists");
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

    async function deleteSuicide(provincia, anyo) {
        console.log(
            "Deleting suicide with keys: " + provincia + "," + anyo + "."
        );
        const res = await fetch(
            BASE_API_PATH+"/"+ provincia + "/" + anyo,
            {
                method: "DELETE",
            }
        ).then((res) => {
            if (res.status == 200) {
                suicides.push(newSuicide);

                alert("Registro Borrado Correctamente");
                okPrint = "Registro eliminado correctamente;"
                errorPrint = "";
                infoPrint="";
                getSuicide();

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
                suicides = [];
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
        getSuicide();
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
        if(estructuraBusqueda.suic_man.length!=0){
            paramsBusqueda=paramsBusqueda+"&suic_man="+estructuraBusqueda.suic_man;
        }
        if(estructuraBusqueda.suic_woman.length!=0){
            paramsBusqueda=paramsBusqueda+"&suic_woman="+estructuraBusqueda.suic_woman;
        }
        if(estructuraBusqueda.suic_total.length!=0){
            paramsBusqueda=paramsBusqueda+"&suic_total="+estructuraBusqueda.suic_total;
        }
        if(estructuraBusqueda.suic_rate_mw.length!=0){
            paramsBusqueda=paramsBusqueda+"&suic_rate_mw="+estructuraBusqueda.suic_rate_mw;
        }

        console.log(paramsBusqueda);
        getSuicide();


        paramsBusqueda="";

    }

    
    
</script>

<main>
    <br />
    
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
                <td><input bind:value={estructuraBusqueda.province} /></td>
                <td><input bind:value={estructuraBusqueda.year} /></td>
                <td><input bind:value={estructuraBusqueda.suic_man} /></td>
                <td><input bind:value={estructuraBusqueda.suic_woman} /></td>
                <td><input bind:value={estructuraBusqueda.suic_total} /></td>
                <td><input bind:value={estructuraBusqueda.suic_rate_mw} /></td>
                
                <Button color="primary" on:click={creaParametros} style="margin:10px;">Buscar</Button>
            </tr>

        </tbody>
    </Table>


    <tr>
        <td
            ><Button on:click={initialSuicide} color="primary" style="margin:5px">Generar Lista</Button
            ></td
        >

        <td
            ><Button on:click={deleteAll} style="background-color:red; margin:5px">Limpiar Lista</Button
            ></td
        >

        <td
            ><Button style="background-color:orange"><a href="https://localhost:10000/#/suicide-records/suicideGraph">Gráfico</a></Button
            ></td
        >
        
    </tr>


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
                    ><Button style="background-color:#32D524;" on:click={insertSuicide}>Insertar Registro</Button
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
                        ><Button color="danger"
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

    <div>
        {#if okPrint}
        <div class = "bocadilloOk"  style="background-color:darkseagreen">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            <strong>OK! </strong><p> </p> {okPrint}
        </div>
        {/if}
        {#if errorPrint}
        <div class = "bocadilloError" style="background-color:salmon">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            <strong>ERROR! </strong><p> </p> {errorPrint}
        </div>
        {/if}
        {#if infoPrint}
        <div class = "bocadilloInfo" style="background-color:cyan">
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
          <PaginationLink previous href="#/suicide-records" on:click={() => changePage(page - 1, offset - 10)}/>
        </PaginationItem>
        {#each range(lastPage, 1) as pages}
          <PaginationItem class={page === pages ? "active" : ""}>
            <PaginationLink previous href="#/suicide-records" on:click={() => changePage(pages, (pages - 1) * 10)}>{pages}</PaginationLink>
          </PaginationItem>
        {/each}
        <PaginationItem class = {page === lastPage ? "disabled" : ""}>
          <PaginationLink next href="#/suicide-records" on:click={() => changePage(page + 1, offset + 10)}/>
        </PaginationItem>
      </Pagination>
    </td>
    </div>
</main>

<style>

.bocadilloOk {
        margin: 0 auto;
        display: table;
        padding: 20px;
        background-color: #4ab984;
        color: white;
    }

    .bocadilloError {
        margin: 0 auto;
        display: table;
        padding: 20px;
        background-color: #f44336;
        color: white;
    }
    
    .bocadilloInfo {
        margin: 0 auto;
        display: table;
        padding: 20px;
        background-color: #59a9f8;
        color: white;
    }


</style>