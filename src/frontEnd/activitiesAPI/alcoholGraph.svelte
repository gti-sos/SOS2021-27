<script>
    async function loadGraph(){
    let covid = []
    let covidConfirmado = []
    let covidDeath = []
    let covidRecovered = []
    let covidProvince = []
    
    const data = await fetch("https://covid-19-statistics.p.rapidapi.com/reports?region_name=Spain", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "94963b1181msh9874230d2ebb059p1cd8dcjsn49656282a733",
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
	}
    });
    if(data.ok){
        covid = await data.json();
        console.log(covid)
        covid.data.forEach(e => {
            covidConfirmado.push(e.confirmed)
            covidDeath.push(e.deaths)
            covidRecovered.push(e.recovered)
            covidProvince.push(e.region.province)
        });
    }
    let chartConfig = {
        type: 'hbullet',
      title: {
        text: 'Analisis covid España',
        fontColor: '#212121'
      },
      plot: {
        tooltip: {
          text: '%t: %v of ' + covidProvince,
          borderRadius: '3px',
          borderWidth: '0px',
          fontSize: '12px'
        },
        barSpace: '8px',
        goal: {
          alpha: 0.9,
          borderWidth: '0px'
        }
      },
      plotarea: {
        margin: '50 50 90 120'
      },
      scaleX: {
        guide: {
          lineStyle: 'solid',
          lineWidth: '1px',
          visible: true
        },
        item: {
          visible: false
        },
        label: {
          text:"provincias",
          offsetX: '-70px',
          values:covidProvince
        }
      },
      scaleY: {
        guide: {
          visible: false
        },
        label: {
          text: 'Numero de casos'
        }
      },
      labels: [{
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar11.png',
          hook: 'scale:name=scale-x,index=0',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        },
        {
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar22.png',
          hook: 'scale:name=scale-x,index=1',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        },
        {
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar33.png',
          hook: 'scale:name=scale-x,index=2',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        },
        {
          text: '',
          backgroundImage: '//demos.zingchart.com/view/6FW4FFOV/avitar44.png',
          hook: 'scale:name=scale-x,index=3',
          offsetX: '-50px',
          width: '50px',
          height: '50px'
        }
      ],
      series: [{
          text: 'Casos positivos',
          values: covidConfirmado,
          backgroundColor: '#009688',
          
        },
        {
          text: 'Recuperados',
          values:covidRecovered,
          backgroundColor: '#ffc107',
          
        },
        {
          text: 'Muertos',
          values: covidDeath,
          backgroundColor: '#9c27b0',
          
        }
      ]
    };
    zingchart.render({
    id: 'myChart',
    data: chartConfig,
    });
    
}
</script>
<svelte:head>

  <script
    src="https://cdn.zingchart.com/zingchart.min.js"
    on:load={loadGraph}></script>
</svelte:head>


<main>
    <h1> Grafica de la API Awards </h1>
    <div id="myChart"></div>
</main>