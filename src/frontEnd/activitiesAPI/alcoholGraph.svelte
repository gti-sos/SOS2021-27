<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    let isOpen = false;

    async function getData(){

// Especificamos el ID de la película en la consulta, en este caso corresponde a RESERVOIR DOGS
const allData= await fetch("https://the-cocktail-db.p.rapidapi.com/search.php", { 
        "method":"GET",
        "headers":{
            "x-rapidapi-key": "94963b1181msh9874230d2ebb059p1cd8dcjsn49656282a733",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            "useQueryString": true

        },
});

let data=[];
data=await allData.json();
console.log(data)
}   
    
     onMount(getData);
     </script>