
const baseAPI = 'https://pokeapi.co/api/v2/';
const $results = document.getElementById("results");
const $btnPaginatorPrev = document.getElementById('btnPrev')
const $btnPaginatorNext = document.getElementById('btnNext')
let dataNameUrl;

$btnPaginatorPrev.addEventListener('click',async() => {
    $results.textContent = '';
    await getDataPokemonsByPage(dataNameUrl.previous);
})
$btnPaginatorNext.addEventListener('click',async() => {
    $results.textContent = '';
    await getDataPokemonsByPage(dataNameUrl.next);
})

const getDataPokemons = async(query = 'pokemon')=>{
    dataNameUrl = await (await fetch(baseAPI+query)).json()
    setStateButtonsNavigator($btnPaginatorPrev,$btnPaginatorNext)
    await setInfoPokemon();
}
const getDataPokemonsByPage = async (query) => {
    dataNameUrl = await (await fetch(query)).json()
    setStateButtonsNavigator($btnPaginatorPrev,$btnPaginatorNext)
    await setInfoPokemon();
}
const setInfoPokemon = async() =>{
    if ('content' in document.createElement('template')) {
        dataNameUrl.results.forEach(async(pokemon) => {
            const infoPokemon = await (await fetch(pokemon.url)).json()
            const cardTemplate = document.querySelector('#cardPokemon');
            const $card = cardTemplate.content.querySelector(".cardPokemon");
            const $title = cardTemplate.content.querySelector("h6");
            const $types = cardTemplate.content.querySelector(".cardPokemon__types");
            const $img = cardTemplate.content.querySelector(".cardPokemon__img");

            $title.textContent = pokemon.name;

            $types.textContent = ''
            clearClassBG($card)
            infoPokemon.types.forEach(type => {
                const classBackground = classBackgroundByTypePokemon(type.type.name)
                $card.classList.add(classBackground)

                const $typeSpan = document.createElement('span');
                $typeSpan.textContent = type.type.name
                $types.appendChild($typeSpan)
            })

            $img.alt = pokemon.name;
            $img.src = infoPokemon.sprites.other['official-artwork'].front_default

            $results.appendChild(document.importNode(cardTemplate.content, true));
        });
    }
}
const classBackgroundByTypePokemon = (type) => {
    switch (type) {
        case 'grass': return 'bg-green';
        case 'poison': return 'bg-purple';
        case 'fire': return 'bg-red';
        case 'water': return 'bg-cyan';
        case 'flying': return 'bg-white';
        case 'bug': return 'bg-green-dark';
        case 'normal': return 'bg-brown-white';
        case 'ground': return 'bg-brown';
        case 'electric': return 'bg-yellow';
        case 'fighting': return 'bg-fighting';
        case 'fairy': return 'bg-fairy';
        case 'psychic': return 'bg-psychic';
        case 'dragon': return 'bg-dragon';
        default: return 'bg-default';
    }
}
const setStateButtonsNavigator = (btnPrev,btnNext) => {
    if(dataNameUrl.previous){
        btnPrev.style.display = 'inline';
    }else{
        btnPrev.style.display = 'none'
    }
    if(dataNameUrl.next){
        btnNext.style.display = 'inline';
    }else{
        btnNext.style.display = 'none'
    }
}
const clearClassBG = ($card) =>{
    $card.classList.remove('bg-default')
    $card.classList.remove('bg-green')
    $card.classList.remove('bg-purple')
    $card.classList.remove('bg-red')
    $card.classList.remove('bg-cyan')
    $card.classList.remove('bg-white')
    $card.classList.remove('bg-green-dark')
    $card.classList.remove('bg-brown-white')
    $card.classList.remove('bg-brown')
    $card.classList.remove('bg-yellow')
    $card.classList.remove('bg-fighting')
    $card.classList.remove('bg-fairy')
    $card.classList.remove('bg-psychic')
    $card.classList.remove('bg-dragon')
}

(async()=>{
    await getDataPokemons();
})()