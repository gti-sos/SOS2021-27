<script>
    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    
    let activities=[];
    let activitieskeys=[];
    let catering_bingo_machine=[];
    let lottery_engagement=[];
    let bingo_site=[];
    let national_lottery_expend=[];

      let pData = [];
  
     
      
      async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch(BASE_API_PATH);
      pData = await res.json();
      if (res.ok) {
            

            
            activities.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
            activities.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

            activities.forEach(element => {
                activitieskeys.push(element.province+","+element.year);
                catering_bingo_machine.push(parseInt(element.catering_bingo_machine));
                lottery_engagement.push(parseInt(element.lottery_engagement));
                bingo_site.push(parseInt(element.bingo_site));
                national_lottery_expend.push(parseInt(element.national_lottery_expend));

                
            });}
              var myConfig = {
                  type: 'bar',
                  'legend':{},
                  'scale-x': {
                      labels: activitieskeys
                  },
                  series: [
                      { text : "Numero de locales de bingo",
                      values: bingo_site
                      },
                      { text : "Numero de personas jugando",
                      values: catering_bingo_machine
                      }
                  ]
                  };
                  
      zingchart.render({
          id: 'myChart',
          data: myConfig,
          
      });
}
  
</script>


<svelte:head>

<script
  src="https://cdn.zingchart.com/zingchart.min.js"
  on:load={loadChart}></script>
</svelte:head>
<main>
  <h1> Grafica bingo </h1>
  <div id="myChart"></div>
</main>