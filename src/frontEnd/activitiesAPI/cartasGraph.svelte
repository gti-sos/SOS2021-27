<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
async function loadGraph(){
   
    var cards={};
    var cardTypes = [];
    const resData = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const cardData = await resData.json();  
    console.log(cardData);
    
    cardData.data.forEach((v) =>{
         if(v.type in cards){
                cards[v.type] += 1;
            }
            else{
                cards[v.type]= 1;
            }
        });
    
    for (var key in cards){
        cardTypes.push([key,cards[key]]);
    }
    
    let chartConfig = {
    type: 'pie',
    backgroundColor: '#2B313B',
    title: {
      text: 'Cartas segun tipo',
      align: 'left',
      fontColor: '#fff',
      fontFamily: 'Open Sans',
      fontSize: '25px',
      offsetX: '10px',
    },
    
    plot: {
      tooltip: {
        text: '%npv%',
        padding: '5 10',
        fontFamily: 'Open Sans',
        fontSize: '18px'
      },
      valueBox: {
        text: '%t\n%npv%',
        fontFamily: 'Open Sans',
        placement: 'out'
      },
      animation: {
        effect: 'ANIMATION_EXPAND_VERTICAL',
        method: 'ANIMATION_REGULAR_EASE_OUT',
        sequence: 'ANIMATION_BY_PLOT',
        speed: 500
      },
      borderColor: '#2B313B',
      borderWidth: '5px'
    },
    plotarea: {
      margin: '20 0 0 0'
    },
    source: {
      text: 'Source: gs.statcounter.com',
      fontColor: '#8e99a9',
      fontFamily: 'Open Sans',
      textAlign: 'left'
    },
    series: [
      {
        text: 'IE and Edge',
        values: cardTypes
      }]};
      
  zingchart.render({
    id: 'myChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
}
</script>
<svelte:head>

  <script
    src="https://cdn.zingchart.com/zingchart.min.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
    <div id="myChart"></div>
    <h1>funciona</h1>
</main>

<style>
#container {
    height: 600px;
    width: 900px;
}
.highcharts-figure {
    min-width: 350px;
    max-width: 900px;
    margin: 1em auto;
}
</style>