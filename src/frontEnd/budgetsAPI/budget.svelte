<script>
    import BudgetsTable from './BudgetsTable.svelte'
    import {Jumbotron} from 'sveltestrap';
</script>

<main>
    <Jumbotron class="p-3" style="background-color: #FFB833">
        <h1 class="titulo; mainDiv" style="color: white">Presupuesto por provincia y año, e inversión en promoción social.</h1>
    </Jumbotron>
    <BudgetsTable></BudgetsTable>
</main>

<style>
    .titulo {
        background-color: #FFB833;
        color: #FFFFFF;
        text-align: center;
    }
    
     .mainDiv{
        text-align: center;
        margin: 20px;

    }
</style>
