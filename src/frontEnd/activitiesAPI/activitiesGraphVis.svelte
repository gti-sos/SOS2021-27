<script>
    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    
    let activities=[];
    let provinces=[];
    let years=[];
    let catering_bingo_machines=[];
    let lottery_engagements=[];
    let bingo_sites=[];
    let national_lottery_expends=[];

      let pData = [];
  
     
      
      async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch(BASE_API_PATH);
      pData = await res.json();
      if (res.ok) {
        pData.forEach(stat => {
            provinces.push(stat.province);
            national_lottery_expends.push(stat.national_lottery_expend);
            years.push(stat.year)
            lottery_engagements.push(stat.lottery_engagement);
            bingo_sites.push(stat["bingo_site"]);
            catering_bingo_machines.push(stat["catering_bingo_machine"]);
            
            });

            
          }
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