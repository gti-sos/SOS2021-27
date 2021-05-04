<main>
    <div class="mainDiv">
    <h1 class="titulo"><b>SOS2021-27</b></h1>
    <p>
      <br><br>
      En nuestro grupo analizaremos la situación económica de los habitantes en diferentes provincias españolas con el objetivo de poder relacionar este factor con la 		evolución en la actividad de juegos de azar y apuestas ¿aumentan o disminuyen según el nivel económico, se apuesta más cantidad o menos? y con el nivel de suicidios, 
      donde la participación en las apuestas puede ser un factor clave para estos.  </p>

    <p> <b class="color">Repository:</b><a href="https://github.com/gti-sos/SOS2021-27"> https://github.com/gti-sos/SOS2021-27</a> </p>
    <p> <b class="color">URL:</b><a href="http://sos2021-27.herokuapp.com"> http://sos2021-27.herokuapp.com</a> </p>
    </div>  
    <br>
    <div class="box">
        <slot>
            <div>
                <h3 class="titulo"><b>Javier García Herrera </b></h3>
                <p><b>Fuente: </b><a href="http://sos2021-27.herokuapp.com/api/v1/suicide-records">suicide-records</a></p>
            </div>
            <br>
            <div>
            <p> <b class="color">GitHub:</b> <a href="https://github.com/Jota0Garcia"> https://github.com/Jota0Garcia</a></p>
            <p> <b class="color">API URL:</b> <a href="http://sos2021-27.herokuapp.com/api/v1/suicide-records"> http://sos2021-27.herokuapp.com/api/v1/suicide-records</a></p>
            <p> <b class="color">API Documentation:</b> <a href="https://documenter.getpostman.com/view/14951327/TzJsfdhf"> https://documenter.getpostman.com/view/14951327/TzJsfdhf</a></p>
            <p> <b class="color">Front End URL:</b> <a href="http://sos2021-27.herokuapp.com/#/suicide-records"> http://sos2021-27.herokuapp.com/#/suicide-records</a></p>
            </div>
        </slot>
    </div>
    <br><br>
    <div class="box">
        <slot> 
            <h3 class="titulo"><b>Fernando Nuevo Jiménez</b></h3>
        <br>
            <p> <b class="color">GitHub:</b> <a href="https://github.com/FerNueJim"> https://github.com/FerNueJim</a></p>
            <p> <b class="color">API URL:</b> <a href="https://sos2021-27.herokuapp.com/api/v1/province-budget-and-investment-in-social-promotion"> https://sos2021-27.herokuapp.com/api/v1/province-budget-and-investment-in-social-promotion</a></p>
            <p> <b class="color">API Documentation:</b> <a href="https://documenter.getpostman.com/view/14982196/TzJu8cTr"> https://documenter.getpostman.com/view/14982196/TzJu8cTr</a></p>
            <p> <b class="color">Front End URL:</b> <a href="http://sos2021-27.herokuapp.com/#/province-budget-and-investment-in-social-promotion"> http://sos2021-27.herokuapp.com/#/province-budget-and-investment-in-social-promotion</a></p>
        </slot>
    </div>
    <br><br>
    <div class="box">
        <slot>
            <div>
                <h3 class="titulo"><b>Humberto Garcia Martinez</b></h3>
                <p><b>Fuente: </b><a href="http://sos2021-27.herokuapp.com/api/v1/azar-games-and-bet-activities">azar-games-and-bet-activities</a></p>

                <br>
                <p><b class="color">GitHub:</b> <a href ="https://github.com/humgarmar"> https://github.com/humgarmar</a></p>
                <p><b class="color">API URL:</b><a href = "https://sos2021-27.herokuapp.com/api/v1/azar-games-and-bet-activities"> https://sos2021-27.herokuapp.com/api/v1/azar-games-and-bet-activities </a></p>
                <p><b class="color">API Documentation:</b><a  href = "https://documenter.getpostman.com/view/14949428/TzJu8cYA" > https://documenter.getpostman.com/view/14949428/TzJu8cYA </a></p>
                <a href="http://sos2021-27.herokuapp.com/#/azar-games-and-bet-activities"><p><b class="color">Front End URL:</b> http://sos2021-27.herokuapp.com/#/azar-games-and-bet-activities</p></a>
            </div>
        </slot>
    </div>
</main>

<style>
	.box {
		width: 50%;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		margin-left: auto;
        margin-right: auto;
	}

    .mainDiv {
        text-align: center;
        margin: 20px;

    }

    .color {
        color: #FFB833;
    }

    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
        text-align: center;
    }
</style>

