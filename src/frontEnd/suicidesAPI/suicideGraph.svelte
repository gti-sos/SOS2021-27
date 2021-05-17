<script>
    import {
        onMount
    } from "svelte";

    var BASE_API_PATH = "/api/v2/suicide-records";
    
    let suicides=[];
    let suicKeys=[];
    let suicMan=[];
    let suicWoman=[];
    let suicTotal=[];
    let suicRate=[];

    
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH);
        if(res.ok){
            console.log("Ok.");
            suicides = await res.json();
            
            suicides.forEach(element => {
                suicKeys.push(element.province+","+element.year);
                suicMan.push(element.suic_man);
                suicWoman.push(element.suic_woman);
                suicTotal.push(element.suic_total);
                suicRate.push(element.suic_rate_mw);

                
            });



            console.log(`We have received ${suicides.length} data points.`);
        }else{
            console.log("Error!");
        }
    }   
    
  //  onMount(getData);
  async function loadGraph(){  
    getData().then(()=>{

    
    Highcharts.chart('container', {
        title: {
            text: 'My data'
        },
        yAxis: {
            title: {
                text: 'Quantity'
            }
        },
      xAxis: {
        title: {
          text: "Provincia,Año",
        },
        categories: suicKeys,
      },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
        series: [
        {
          name: "Hombres",
          data: suicMan,
        },
        {
          name: "Mujeres",
          data: suicWoman,
        },
        {
          name: "Total",
          data: suicTotal,
        },
        {
          name: "Ratio",
          data: suicRate,
        }
        
      ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
  });
}
    
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Basic line chart showing trends in a dataset. This chart includes the
            <code>series-label</code> module, which adds a label to each line for
            enhanced readability.
        </p>
    </figure>  
</main>