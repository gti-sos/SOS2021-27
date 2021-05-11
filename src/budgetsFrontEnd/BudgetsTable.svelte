<script>
    import { onMount } from "svelte";
    import { Button, Table, Pagination, PaginationItem, PaginationLink, } from "sveltestrap";

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";
    var url = "";

    let budgets = [];
    let newBudget = {
        province: "",
        year: "",
        budget: "",
        invest_promotion: "",
    };

    let iniData = false;
    let searchedProvince = "";
    let searchedYear = "";

    var listaProvincias = document.getElementById("listadoProvincias");
    var list = document.createElement("select");
    list.setAttribute("id", "mySelect");
    listaProvincias.appendChild(list);
    var provincias = [];
    
    let errorPrint = "";
    let okPrint = "";
    let infoPrint = "";

    let c_offset = 0;
    let offset = 0;
    let limit = 10;
    let c_page = 1;
    let lastPage = 1;
    let total = 0;

    onMount(getBudgets);

    async function initialBudgets() {
        console.log("Loading initial data...");
        const data = await fetch(BASE_API_PATH + "/loadInitialData").then(function (data) {
            if(data.ok) {
                console.log("OK");
                okPrint = "Base de datos inicial cargada.";
                getBudgets();
            } else {
                error = 404;
                console.log("ERROR");
                errorPrint = "La base de datos incial no ha podido cargarse.";
            }
        });
        iniData = true;
    }
    
    async function getBudgets() {
        console.log("Fetching budgets...");
        const data = await fetch(BASE_API_PATH + "?offset=" + c_offset + "&limit=" + limit);
        if (data.status == 200) {
            console.log("OK");
            const json = await data.json();
            budgets = json;
            pagination();
            for(x of budgets){
                provincias = x.province;
            }
            for(var i = 0; i < provincias.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", provincias[i]);
                option.text = provincias[i];
                list.appendChild(option);
            }
            budgets.sort((a,b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0))
            budgets.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0))
            console.log(`Received ${budgets.length} budgets.`);
        } else {
            console.log("ERROR");
        }
    }

    async function postBudget() {
        console.log("Posting budget...");
        const data = await fetch(BASE_API_PATH, {
            method: "POST",
            body: JSON.stringify(newBudget),
            headers: { "Content-Type": "application/json" },
        }).then(function (data) {
            if (data.status == 201) {
                console.log("OK");
                okPrint = "Nuevo dato introducido correctamente."
                budgets.push(newBudget);
                setTimeout(getBudgets(),10000);
            } else if (data.status == 400) {
                console.log("Body is wrong");
                errorPrint = "Algún dato debe estar mal introducido.";
            } else if (data.status == 409) {
                console.log("This budget already exists");
                infoPrint = "Estos datos ya existen en la base de datos.";
            }
        });
    }

    async function deleteBudgets() {
        console.log("Deleting budgets...");
        iniData = false;
        const  data = await fetch(BASE_API_PATH, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                okPrint = "Base de datos borrada con éxito.";
                budgets = [];
            } else if (data.status == 404) {
                console.log("DB is empty");
                infoPrint = "La base de datos está vacía.";
            } else {
                console.log("Error deleting DB stats");
                errorPrint = "La base de datos no ha podido ser borrada.";
            }
        });
    }

    async function deleteBudget(provincia, anyo) {
        console.log("Deleting budget from " + provincia + " " + anyo);
        const data = await fetch(BASE_API_PATH + "/" + provincia + "/" + anyo, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                okPrint = "Dato borrado correctamente.";
                getBudgets();
            } else {
                console.log("ERROR");
                errorPrint = "El dato no ha sido borrado.";
            }
        });
    }

    async function searchBudgets(province, year){
        url = BASE_API_PATH;
		if (province != "" && year != "") {
			url = url + "?province=" + province + "?year=" + year; 
		} else if (province != "" && year == "") {
			url = url + "?province=" + province;
		} else if (province == "" && year != "") {
			url = url + "?year=" + year;
		}
		const data = await fetch(url);
		if (data.status == 200) {
			console.log("OK");
			const json = await data.json();
			budgets = json;
            if (province == "" && year == ""){
                infoPrint = "Debe introducir una provincia o un año.";
            } else if (budgets.length == 0){
                infoPrint = "No se ha encontrado ningún dato con esos parámetros de búsqueda.";
            } else {
                okPrint = `Se han encontrado ${budgets.length} datos`;
            }	
			console.log("Showing " + budgets.length + " data");
		} else {
			console.log("ERROR");
            errorPrint = "No se ha encontrado ningún dato con esos parámetros de búsqueda.";
		}
    }

    async function pagination() {
      const data = await fetch(BASE_API_PATH);
      if (data.status == 200) {
        const json = await data.json();
        total = json.length;
        changePage(c_page, c_offset);
      } else {
        errorPrint = "Base de datos vacía.";
      }
    }

    function range(size, start = 0) {
      return [...Array(size).keys()].map((i) => i + start);
    }

    function changePage(page, offset) {
      console.log("Changing page to " + page + " with " + offset + " offset.");
      lastPage = Math.ceil(total / 10);
      console.log("Last page = " + lastPage);
      if (page !== c_page) {
        c_offset = offset;
        c_page = page;
        getBudgets();
      }
    }
</script>

<main>
    <br/>
    <div>
        {#if iniData}
            <td> <Button color="warning" style="color:white;" disabled> Cargar tabla </Button> </td>
        {:else}
            <td> <Button color="warning" style="color:white;" on:click={initialBudgets}> Cargar tabla </Button> </td>
        {/if}
            <td style="padding-left:20px"> <Button outline color="danger" on:click={deleteBudgets}> Borrar tabla </Button> </td>
    </div>
    <br/>
     <Table bordered>
        <thead>
            <tr>
                <td>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> Búsqueda por provincia: </span>
                    </div>
                    <select id="listadoProvincias" value.bind="searchedProvince">
                    </select>
                    <div class="input-group-prepend" style="padding-left:30px">
                        <span class="input-group-text"> Búsqueda por año: </span>
                    </div>
                    <input bind:value={searchedYear} type="number" min="1900" max="2099" step="1" class="form-control" id="anyo" placeholder="Año">
                </div>
                </td>
                <td>
                    <div>
                    <a style="padding-left:20px"><Button color="info" on:click="{searchBudgets(searchedProvince,searchedYear)}"> Buscar </Button></a>
                    <a style="padding-left:30px"><Button outline color="success" href="javascript:location.reload()"> Refrescar </Button></a>
                    </div>
                </td>
            </tr>
        </thead>
    </Table>
    <Table bordered style="text-align: center;">
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
             <tr>
                <td><input bind:value="{newBudget.province}"/></td>
                <td><input bind:value="{newBudget.year}"/></td>
                <td><input bind:value="{newBudget.budget}"/></td>
                <td><input bind:value="{newBudget.invest_promotion}"/></td>
                <td> - - - </td>
                <td> - - - </td>
                <td colspan="2"><Button color="warning" style="color:white;" on:click={postBudget}> Guardar </Button></td>
            </tr>
            {#each budgets as budgetSvelte}
                <tr>
                    <td>{budgetSvelte.province}</td>
                    <td>{budgetSvelte.year}</td>
                    <td>{budgetSvelte.budget}</td>
                    <td>{budgetSvelte.invest_promotion}</td>
                    <td>{budgetSvelte.liquid}</td>
                    <td>{budgetSvelte.percentage}</td>
                    <td><Button outline color="primary" href="#/province-budget-and-investment-in-social-promotion/{budgetSvelte.province}/{budgetSvelte.year}"> Editar </Button></td>
                    <td><Button outline color="danger" on:click={deleteBudget(budgetSvelte.province, budgetSvelte.year)}> Borrar </Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <br/>
    <div>
        {#if okPrint}
        <div class = "hideMe">
            <span class = "alertOK">
            <strong style="align:center">OK! </strong><p></p> {okPrint}
            </span>
        </div>
        {/if}
        {#if errorPrint}
        <div class = "hideMe">
            <span class = "alertERROR">
            <strong style="align:center">ERROR! </strong><p></p> {errorPrint}
            </span>
        </div>
        {/if}
        {#if infoPrint}
        <div class = "hideMe">
            <span class = "alertINFO">
            <strong style="align:center">INFO! </strong><p></p> {infoPrint}
            </span>
        </div>
        {/if}
    </div>

    <div>
    <td  style="float: right;">
      <Pagination>
        <PaginationItem class = {c_page === 1 ? "disabled" : ""}>
          <PaginationLink previous href="#/province-budget-and-investment-in-social-promotion" on:click={() => changePage(c_page - 1, c_offset - 10)}/>
        </PaginationItem>
        {#each range(lastPage, 1) as page}
          <PaginationItem class = {c_page === page ? "active" : ""}>
            <PaginationLink previous href="#/province-budget-and-investment-in-social-promotion" on:click={() => changePage(page, (page - 1) * 10)}>
            {page}
            </PaginationLink>
          </PaginationItem>
        {/each}
        <PaginationItem class = {c_page === lastPage ? "disabled" : ""}>
          <PaginationLink next href="#/province-budget-and-investment-in-social-promotion" on:click={() => changePage(c_page + 1, c_offset + 10)}/>
        </PaginationItem>
      </Pagination>
    </td>
    <td align="left"> <Button outline color="info" href="https://sos2021-27.herokuapp.com/#/info"> Página principal </Button> </td>
    </div>

</main>

<style>
    .color {
        color: #FFB833;
    }

    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
    }

    .fakeButton {
        background-color: #FFB833;
        border: none;
        color: white;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        transition-duration: 0.4s;
        cursor: pointer;
        margin-right: 20px;
        border-radius: 12px;
    }

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

    html, body {
        height:100%;
        width:100%;
        margin:0;
        padding:0;
    }

    .hideMe {
        -moz-animation: cssAnimation 0s ease-in 5s forwards;
    /* Firefox */
        -webkit-animation: cssAnimation 0s ease-in 5s forwards;
    /* Safari and Chrome */
        -o-animation: cssAnimation 0s ease-in 5s forwards;
    /* Opera */
        animation: cssAnimation 0s ease-in 5s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    @keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            left: -9999px; 
            position: absolute;   
        }
    }

    @-webkit-keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            left: -9999px; 
            position: absolute;   
        }
    }

    .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

    .closebtn:hover {
    color: black;
    }
</style>