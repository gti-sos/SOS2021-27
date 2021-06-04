<script>
    async function loadGraph(){
    let covid = []
    let covidConfirmado = []
    let covidDeath = []
    let covidRecovered = []
    
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
        });
    }
    let chartConfig = {
        gui: {
    contextMenu: {
      backgroundColor: '#306EAA', 
      button: {
        backgroundColor: '#2D66A4',
        lineColor: '#2D66A4',
        visible: true
      },
      docked: true,
      gear: {
        alpha: 1,
        backgroundColor: '#2D66A4'
      },
      item: {
        backgroundColor: '#306EAA',
        borderColor: '#306EAA',
        borderWidth: '0px',
        color: '#fff',
        fontFamily: 'Lato'
      },
      position: 'right'
    }
  },
  graphset: [
    {
      type: 'ring',
      backgroundColor: '#FBFCFE',
      title: {
        text: 'Covid España',
        padding: '15px',
        fontColor: '#1E5D9E',
        fontFamily: 'Lato',
        fontSize: '14px'
      },
      subtitle: {
        text: '2020',
        padding: '5px',
        fontColor: '#777',
        fontFamily: 'Lato',
        fontSize: '12px'
      },
      legend: {
        adjustLayout: true,
        align: 'center',
        backgroundColor: '#FBFCFE',
        borderWidth: '0px',
        item: {
          cursor: 'pointer',
          fontColor: '#777',
          fontSize: '12px',
          offsetX: '-6px'
        },
        marker: {
          type: 'circle',
          borderWidth: '0px',
          cursor: 'pointer',
          size: 5
        },
        mediaRules: [
          {
            maxWidth: '500px',
            visible: false
          }
        ],
        toggleAction: 'remove',
        verticalAlign: 'bottom'
      },
      plot: {
        valueBox: [
          {
            type: 'all',
            text: '%t',
            placement: 'out'
          },
          {
            type: 'all',
            text: '%npv%',
            placement: 'in'
          }
        ],
        animation: {
          effect: 'ANIMATION_EXPAND_VERTICAL',
          sequence: 'ANIMATION_BY_PLOT_AND_NODE'
        },
        backgroundColor: '#FBFCFE',
        borderWidth: '0px',
        hoverState: {
        	cursor: 'hand',
        },
        slice: '60%'
      },
      plotarea: {
        margin: '70px 0px 10px 0px',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        borderWidth: '0px'
      },
      scaleR: {
        refAngle: 270
      },
      tooltip: {
        text: '<span style="color:%color">Estado: %t</span><br><span style="color:%color">Valor: %v</span>',
        anchor: 'c',
        backgroundColor: 'none',
        borderWidth: '0px',
        fontSize: '16px',
        mediaRules: [
          {
            maxWidth: '500px',
            y: '54%'
          }
        ],
        sticky: true,
        thousandsSeparator: ',',
        x: '50%',
        y: '50%'
      },
      noData: {
        text: 'No Selection',
        alpha: .6,
        backgroundColor: '#20b2db',
        bold: true,
        fontSize: '18px',
        textAlpha: .9
      },
      series: [
        {
          text: 'Positivo',
          values: covidConfirmado,
          backgroundColor: '#00BAF2',

          marker: {
            backgroundColor: '#00BAF2'
          }
        },
        {
          text: 'Muertos',
          values: covidDeath,
          backgroundColor: '#E80C60',
          marker: {
            backgroundColor: '#E80C60'
          }
        },
        {
          text: 'Recuperados',
          values: covidRecovered,
          backgroundColor: '#9B26AF',
          marker: {
            backgroundColor: '#9B26AF'
          }
        }
      ]
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
    <h1>cOVID</h1>
    <div id="myChart"></div>
</main>