<script>
    import { onMount } from "svelte";
    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';

    let isOpen = false;

    var BASE_API_PATH = "/api/v2/province-budget-and-investment-in-social-promotion";

    let budgetGraph = [];
    let budgetGraphX = [];
    let budgetGraphBudget = [];
    let budgetGraphInvest = [];
    let budgetGraphLiquid = [];
    let budgetGraphPercentage = [];

    async function loadGraphArea() {
        const data = await fetch(BASE_API_PATH);
        budgetGraph = await data.json();
        if (data.ok) {
            budgetGraph.forEach(budgetSvelte => {
            budgetGraphX.push(budgetSvelte.province + "/" + budgetSvelte.year);
            budgetGraphBudget.push(budgetSvelte.budget);
            budgetGraphInvest.push(budgetSvelte.invest_promotion);
            budgetGraphLiquid.push(budgetSvelte.liquid);
            budgetGraphPercentage.push(budgetSvelte.percentage);   
        });
        budgetGraphX.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
        budgetGraphX.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
    }
    
    Highcharts.chart("container", {
      chart: {
        type: 'area'
      },
      title: {
        text: "",
      },
      yAxis: {
        title: {
          text: "Presupuesto en euros",
        },
      },
      xAxis: {
        title: {
          text: "Provincia/Año",
        },
        categories: budgetGraphX,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      annotations: [
        {
          labels: [
            {
              point: "date",
              text: "",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "white",
            },
          ],
        },
      ],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
      },
      series: [
        {
          name: "Presupuesto",
          data: budgetGraphBudget,
        },
        {
          name: "Inversión",
          data: budgetGraphInvest,
        },
        {
          name: "Líquido",
          data: budgetGraphLiquid,
        },
        {
          name: "Porcentage",
          data: budgetGraphPercentage,
        }
        
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraphArea}></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <br>
    <h1 class="titulo2"> Gráfica de datos tipo Área</h1>
    <div style="margin-bottom: 15px">
        <figure class="highcharts-figure">
          <div id="container"/>
          <p class="centrado"> Gráfica que relaciona el presupuesto de cada provincia y año con la inversión que realiza cada una de estas en promoción social de tipo Área. </p>
        </figure>
      </div>
</main>

<style>
    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
        text-align: center;
    }
    
    .titulo2 {
        color: #000000;
        text-align: center;
        font-size: 150%;
    }
    .mainDiv{
        text-align: center;
        margin: 20px;
    }
    .centrado {
        text-align: center;
        padding: 1em;
        margin: 0;
    }
</style>