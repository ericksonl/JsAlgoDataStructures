var data
var content = 'invisible'
var matchingType
const type_url = 'https://pokemon.fandom.com/wiki/'
const colorTypes = [
    { type: 'normal', color: '#A8A77A', background: './backgrounds/normal.png' },
    { type: 'fire', color: '#EE8130', background: './backgrounds/fire.png' },
    { type: 'water', color: '#6390F0', background: './backgrounds/water.png' },
    { type: 'electric', color: '#F7D02C', background: './backgrounds/electric.png' },
    { type: 'grass', color: '#7AC74C', background: './backgrounds/grass&bug.png' },
    { type: 'ice', color: '#96D9D6', background: './backgrounds/ice.png' },
    { type: 'fighting', color: '#C22E28', background: './backgrounds/fighting.png' },
    { type: 'poison', color: '#A33EA1', background: './backgrounds/poison.png' },
    { type: 'ground', color: '#E2BF65', background: './backgrounds/ground.png' },
    { type: 'flying', color: '#A98FF3', background: './backgrounds/flying.png' },
    { type: 'psychic', color: '#F95587', background: './backgrounds/psychic.png' },
    { type: 'bug', color: '#B6A136', background: './backgrounds/grass&bug.png' },
    { type: 'rock', color: '#B6A136', background: './backgrounds/rock.png' },
    { type: 'ghost', color: '#735797', background: './backgrounds/ghost.png' },
    { type: 'dragon', color: '#6F35FC', background: './backgrounds/dragon.png' },
    { type: 'dark', color: '#705746', background: './backgrounds/dark.png' },
    { type: 'steel', color: '#B7B7CE', background: './backgrounds/steel.png' },
    { type: 'fairy', color: '#D685AD', background: './backgrounds/fairy.png' }
];

document.addEventListener('DOMContentLoaded', function () {
    //populate with random pokemon on load
    var randomInt = Math.floor(Math.random() * 1025) + 1
    document.getElementById("search-input").value = randomInt
    search()
})

async function search() {
    let input = document.getElementById("search-input").value
    document.getElementById("search-input").value = ''

    if (!input) {
        console.log("no input")
        displayError("no input")
    } else {
        let value = removePunctuation(input)
        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${value}`
        )
        //if 404 throw error
        if (!response.ok) {
            displayError("Pokémon not found")
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        //if error text exists, remove it
        if (document.getElementById('error')) {
            d3.select("#error")
                .remove()
        }
        data = await response.json();
        console.log(data)
        if (content === 'visible') {
            updatePage()
        } else {
            buildPage()
        }
    }
}

function buildPage() {
    content = 'visible'

    d3.select('.pokemon-name')
        .append('h3')
        .attr('id', 'pokemon-name')
        .text(data.name)

    d3.select('.pokemon-id')
        .append('h3')
        .attr('id', 'pokemon-id')
        .text(data.id)

    d3.select('#sprite')
        .attr('src', data.sprites.front_default)

    //find pokemon type(s)
    typeSelector()

    d3.select('#hp')
        .text(data.stats[0].base_stat)
    d3.select('#attack')
        .text(data.stats[1].base_stat)
    d3.select('#defense')
        .text(data.stats[2].base_stat)
    d3.select('#special-attack')
        .text(data.stats[3].base_stat)
    d3.select('#special-defense')
        .text(data.stats[4].base_stat)
    d3.select('#speed')
        .text(data.stats[5].base_stat)

    calcStats(data.stats)

    d3.select('#height')
        .text(formatHeight(data.height))
    d3.select('#weight')
        .text(formatWeight(data.weight))

}


function updatePage() {
    d3.select('#pokemon-name')
        .text(data.name)

    d3.select('#pokemon-id')
        .text(data.id)

    d3.select('#sprite')
        .attr('src', data.sprites.front_default)

    d3.select("#types").selectAll("span").remove()

    typeSelector()

    d3.select('#hp')
        .text(data.stats[0].base_stat)
    d3.select('#attack')
        .text(data.stats[1].base_stat)
    d3.select('#defense')
        .text(data.stats[2].base_stat)
    d3.select('#special-attack')
        .text(data.stats[3].base_stat)
    d3.select('#special-defense')
        .text(data.stats[4].base_stat)
    d3.select('#speed')
        .text(data.stats[5].base_stat)
    d3.select('#height')
        .text(formatHeight(data.height))
    d3.select('#weight')
        .text(formatWeight(data.weight))

    d3.select("#hp-bars").selectAll("hr").remove()
    d3.select("#attack-bars").selectAll("hr").remove()
    d3.select("#defense-bars").selectAll("hr").remove()
    d3.select("#special-attack-bars").selectAll("hr").remove()
    d3.select("#special-defense-bars").selectAll("hr").remove()
    d3.select("#speed-bars").selectAll("hr").remove()

    calcStats(data.stats)
}


function typeSelector() {
    types.innerHTML = data.types
        .map(obj => {
            matchingType = colorTypes.find(colorType => colorType.type === obj.type.name);
            return `<a class="type ${obj.type.name}" style="background-color: ${matchingType.color}" href='${type_url}${obj.type.name}_type'>${obj.type.name}</a> `
        })
        .join('');

    if (matchingType.type === 'ghost' || matchingType.type === 'psychic' || matchingType.type === 'dark' || matchingType.type === 'steel') {
        d3.select('#image-container').style('color', 'white')
    } else {
        d3.select('#image-container').style('color', 'black')
    }

    d3.select('#image-container')
        .style('background-image', `url('${matchingType.background}')`)
        .style('background-size', 'cover')
}


function calcStats(array) {
    let interval = 17
    let maxBars = 15
    for (let i = 0; i < 6; i++) {
        console.log(`generating bars for ${array[i].stat.name}`)
        let statNum = Math.ceil(array[i].base_stat / interval)
        barGenerator(maxBars - statNum, d3.select(`#${array[i].stat.name}-bars`), 'blank')
        barGenerator(statNum, d3.select(`#${array[i].stat.name}-bars`), 'filled')
    }
}

function barGenerator(num, target, filled) {
    for (let i = 0; i < num; i++) {
        target.append("hr")
            .attr('class', `${filled}-bar`)
    }
}

function formatHeight(number) {
    const imperialNum = ((number / 3.084) * 10) / 10
    const feet = Math.floor(imperialNum);
    const inches = Math.round((imperialNum - feet) * 12);
    return `${feet}' ${inches}"`;
}

function formatWeight(number) {
    const imperialNum = ((number / 4.545) * 10) / 10
    const pounds = Math.floor(imperialNum);
    const ounces = Math.round((imperialNum - pounds) * 16);
    return `${pounds}.${ounces} lbs`;
}

function removePunctuation(text) {
    let punctuation = /[\-.,?!_)()/\\:]/g;
    let newText = text.replace(punctuation, "").replace(/ /g, "-").toLowerCase()
    return newText;
}

function displayError(errorText) {
    if (!document.getElementById('error')) {
        console.log(errorText)
        d3.select("#searcher")
            .append('h4')
            .attr('id', 'error')
            .text(errorText)
    } else {
        //change error text if it does exist
        d3.select("#error")
            .text(errorText)
    }
    document.getElementById("search-input").value = ''
}