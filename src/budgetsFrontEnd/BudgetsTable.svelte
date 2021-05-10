<script>
    import { onMount } from "svelte";
    import { Button, Table, Pagination, PaginationItem, PaginationLink, } from "sveltestrap";

    var BASE_API_PATH = "/api/v1/province-budget-and-investment-in-social-promotion";
    var url = BASE_API_PATH;

    let budgets = [];
    let newBudget = {
        province: "",
        year: "",
        budget: "",
        invest_promotion: "",
    };

    let iniData = false;

    let errorPrint = "";
    let okPrint = "";
    let infoPrint = "";

    let offset = 0;
    let limit = 9;
    let page = 1;
    let lastPage = 1;
    let total = 0;
    

    async function initialBudgets() {
        console.log("Loading initial data...");
        const data = await fetch(BASE_API_PATH + "/loadInitialData").then(function (data) {
            if(data.ok) {
                console.log("OK");
                okPrint = "Base de datos inicial cargada";
                getBudgets();
            } else {
                error = 404;
                console.log("ERROR");
                errorPrint = "La base de datos incial no ha podido cargarse";
            }
        });
        iniData = true;
    }

    async function getBudgets() {
        console.log("Fetching budgets...");
        const data = await fetch(BASE_API_PATH + "?offset=" + offset + "&limit" + limit);
        if (data.ok) {
            console.log("OK");
            const json = await data.json();
            budgets = json;
            
            budgets.sort((a,b) => new String(a.province) > new String(b.province));
            budgets.sort((a,b) => new Integer(a.year) > new Integer(b.year));
            console.log(`Received ${budgets.length} budgets.`);
        } else {
            console.log("ERROR");
        }
        pagination();
    }
    
    onMount(getBudgets);

    async function postBudget() {
        console.log("Posting budget...");
        const data = await fetch(BASE_API_PATH, {
            method: "POST",
            body: JSON.stringify(newBudget),
            headers: { "Content-Type": "application/json" },
        }).then(function (data) {
            if (data.stats == 201) {
                console.log("OK");
                budgets.push(newBudget);
                okPrint = "Nuevo dato introducido correctamente;"
                getBudgets();
            } else if (data.status == 400) {
                console.log("Body is wrong");
                errorPrint = "Algún dato debe estar mal introducido";
            } else if (data.status == 409) {
                console.log("This budget already exists");
                infoPrint = "Estos datos ya existen en la base de datos";
            }
        });
    }

    async function deleteBudgets() {
        console.log("Deleting budgets...");
        iniData = false;
        const  data = await fetch(BASE_API_PATH, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                okPrint = "Base de datos borrada con éxito";
                budgets = [];
            } else if (data.status == 404) {
                console.log("DB is empty");
                infoPrint = "La base de datos está vacía";
            } else {
                console.log("Error deleting DB stats");
                errorPrint = "La base de datos no ha podido ser borrada";
            }
        });
    }

    async function deleteBudget(provincia, anyo) {
        console.log("Deleting budget from " + provincia + " " + anyo);
        const data = await fetch(BASE_API_PATH + "/" + provincia + "/" + anyo, { method: "DELETE", }).then(function (data) {
            if (data.ok) {
                console.log("OK");
                okPrint = "Dato borrado correctamente";
                getBudgets();
            } else {
                console.log("ERROR");
                errorPrint = "El dato no ha sido borrado";
            }
        });
    }

    async function searchBudgets(province, year){
        console.log("Searching budget: " + province + ", "+ year);
	
		if (province != "" && year != "") {
			url = url + "?province=" + province + "&year=" + year; 
		} else if (province != "" && year == "") {
			url = url + "?province=" + province;
		} else if (province == "" && year != "") {
			url = url + "?year=" + year;
		}
		const data = await fetch(url);
		if (data.ok) {
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
        getBudgets();
      }
    }
</script>

<main>
    <br/>
    <div>
        {#if errorPrint}
            <p style="color: red">ERROR: {errorPrint}</p>
        {/if}
        {#if okPrint}
            <p style="color: green">{okPrint}</p>
        {/if}
        {#if infoPrint}
            <p style="color: blue">{infoPrint}</p>
        {/if}
    </div>
    <br/>
    <div>
        {#if iniData}
            <td> <Button color="warning" style="color:white;" disabled> Cargar tabla </Button> </td>
        {:else}
            <td> <Button color="warning" style="color:white;" on:click={initialBudgets}> Cargar tabla </Button> </td>
        {/if}
            <td style="padding-right:20px"> <Button outline color="danger" on:click={deleteBudgets}> Borrar tabla </Button> </td>
    </div>
     <Table bordered>
        <thead>
            <tr>
                <td>
                    Búsqueda por provincia:
                    <input bind:value="{searchedProvince}">
                </td>
                <td>
                    Búsqueda por año:
                    <input bind:value="{searchedYear}">
                </td>
                <td>
                    <Button color="info" on:click="{searchBudgets(searchedProvince,searchedYear)}">Buscar</Button>
                    <Button outline color="success" href="javascript:location.reload()">Refrescar</Button>
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
    <Button outline color="info" href="https://sos2021-27.herokuapp.com/#/info"> Página principal </Button>
    <Pagination>
        <PaginationItem class={page === 1 ? "disabled" : ""}>
          <PaginationLink previous href="#/province-budget-and-investment-in-social-promotion" on:click={() => changePage(page - 1, offset - 10)}/>
        </PaginationItem>
        {#each range(lastPage, 1) as pages}
          <PaginationItem class={page === pages ? "active" : ""}>
            <PaginationLink previous href="#/province-budget-and-investment-in-social-promotion" on:click={() => changePage(pages, (pages - 1) * 10)}>{pages}</PaginationLink>
          </PaginationItem>
        {/each}
        <PaginationItem class={page === lastPage ? "disabled" : ""}>
          <PaginationLink next href="#/province-budget-and-investment-in-social-promotion" on:click={() => changePage(page + 1, offset + 10)}/>
        </PaginationItem>
      </Pagination>
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
</style>