<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    var povertyData = [];
    var activitiesData = [];
    var msg = "";
     /**
     * Carga los datos de la API SOS
     */
    async function loadApi() {
      console.log("Loading data...");
      const res = await fetch(
        "https://endpoint-poverty-risks.herokuapp.com/api/v1/loadInitialData"
      ).then(function (res) {
        if (res.ok) {
          msg = "";
          console.log("OK");
        } else {
          if (res.status === 500) {
            msg = "No se ha podido acceder a la base de datos";
          }
          console.log("ERROR!" + msg);
        }
      });
    }
     /**
     * Carga los datos de nuestra API
     */
    async function loadStats() {
      console.log("Loading data...");
      const res = await fetch(
        BASE_API_PATH 
      ).then(function (res) {
        if (res.ok) {
          msg = "";
          console.log("OK");
        } else {
          if (res.status === 500) {
            msg = "No se ha podido acceder a la base de datos";
          }
          console.log("ERROR!" + msg);
        }
      });
    }
    /**
     * Obtiene los datos de nuestra API
     */
    async function getStats() {
      console.log("Fetching data...");
      await loadStats();
      const res = await fetch(BASE_API_PATH );
      if (res.ok) {
        console.log("OK");
        activitiesData = await res.json();
        msg = "";
        console.log(`We have received ${activitiesData.length} activities.`);
      } else {
        console.log("Error");
        msg = "Error al cargar los datos de la API";
      }
    }
   /**
     * Obtiene los datos de la API SOS
     */
    async function getPovertyData() {
      console.log("Fetching data...");
      await loadApi();
      const res = await fetch(
        "https://endpoint-poverty-risks.herokuapp.com/api/v1/"
      );
      if (res.ok) {
        const json = await res.json();
        povertyData = json;
        console.log(`We have received ${povertyData.length} poverty-stats.`);
        console.log("Ok");
      } else {
        msg = "Error recuperando datos de poverty-risks";
        console.log("ERROR!" + errorMsg);
      }
    }
   /**
     * Parsea un JSON a Map
     * @param j json
     * @param k propiedad 1 como clave
     * @param v propiedad 2 como valor
     */
    function jsonToMap(j, k, v) {
      var res = new Map();
      j.forEach((element) => {
        var key = element[k];
        var value = element[v];
        if (res.has(key)) {
          var newValue = res.get(key) + value;
          res.set(key, newValue);
        } else {
          res.set(key, value);
        }
      });
      return res;
    }
   /**
     * Carga los datos en la grafica
     */
    async function loadChart() {
      await getStats();
      await getPovertyData();
      var years = [];
      var data = [];
      //-------------------poverty-risks
      console.log("Calculating poverty-risks...");
      var result = jsonToMap(povertyData, "year", "people_in_risk_of_poverty");
      years.push("Personas en riesgo de pobreza");
      var total = 0;
      for (let [key, value] of result) {
        total += parseFloat(value);
      }
      data.push(total);
      console.log("Calculating activities stats...");
      var result1 = jsonToMap(activitiesData, "year", "bingo_site");
      var total1 = 0;
      years.push("locales de bingo");
      for (let [key, value] of result1) {
        total1 += parseFloat(value);
      }
      data.push(total1);
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: years,
          datasets: [
            {
              label: "ratio de probeza",
              data: data,
              backgroundColor: ["rgb(240, 162, 2)", "rgb(123, 158, 137)"],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              title: {
                  display: true,
                  text: 'Comparativa del ratio de pobreza y del ratio de natalidad'
              }
          },
        },
      });
    }
  </script>
  
  <svelte:head>
    <script
      src="https://cdn.jsdelivr.net/npm/chart.js"
      on:load={loadChart}></script>
  </svelte:head>
  
  <main>
   
  
    <div>
      <h2>Integración API SOS poverty-risks</h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <div>
        <canvas id="myChart" />
      </div>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div {
      margin-bottom: 15px;
    }
    #myChart{
      width: 400px;
      height: 500px;
    }
  </style>