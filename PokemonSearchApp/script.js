var data
var content = 'invisible'
var matchingType
const type_url = 'https://pokemon.fandom.com/wiki/'
const colorTypes = [
    { type: 'normal', color: '#A8A77A', background: 'https://www.dropbox.com/scl/fi/usi3z9o855acjgnxt73lg/normal.png?rlkey=jfatkkfh9v3e2l49c4qkjwfzs&raw=1' },
    { type: 'fire', color: '#EE8130', background: 'https://www.dropbox.com/scl/fi/js9wuvanspd8e78qv0vgi/fire.png?rlkey=b5tyykravvxyjqy59w519gkbz&raw=1' },
    { type: 'water', color: '#6390F0', background: 'https://www.dropbox.com/scl/fi/0b5xa1337xb7ue5wnj6kw/water.png?rlkey=dc6i05qr9adv4ti71pjna6n3h&raw=1' },
    { type: 'electric', color: '#F7D02C', background: 'https://www.dropbox.com/scl/fi/y0o0imimvophg8qy8e6lk/electric.png?rlkey=n524vtnzm0uojwxftved2uv44&raw=1' },
    { type: 'grass', color: '#7AC74C', background: 'https://www.dropbox.com/scl/fi/35yp5kqzhvp3ssp8olcnd/grass-bug.png?rlkey=7g1bcxwcyu5gwt7ktu5n1cz5b&raw=1' },
    { type: 'ice', color: '#96D9D6', background: 'https://www.dropbox.com/scl/fi/9n9hbc68z7tky5r18i4jd/ice.png?rlkey=46uqy2ks9x6odk8rkxeeravb2&raw=1' },
    { type: 'fighting', color: '#C22E28', background: 'https://www.dropbox.com/scl/fi/b11tl8kzbcozavi7elgps/fighting.png?rlkey=jrspvotuky5qzmk6n27po26py&raw=1' },
    { type: 'poison', color: '#A33EA1', background: 'https://www.dropbox.com/scl/fi/5yok3gtlh8yiqw7nn5bvx/poison.png?rlkey=emqq93zttfjqhwtngmvafnwx3&raw=1' },
    { type: 'ground', color: '#E2BF65', background: 'https://www.dropbox.com/scl/fi/j93h6i3v9t4901lzrkcem/ground.png?rlkey=eljz7w3mdm54swi3kyzsbaenn&raw=1' },
    { type: 'flying', color: '#A98FF3', background: 'https://www.dropbox.com/scl/fi/wt9d945qdfak1980qbrbx/flying.png?rlkey=i0lsx2b8zx1vkeljfeqqoytvd&raw=1' },
    { type: 'psychic', color: '#F95587', background: 'https://www.dropbox.com/scl/fi/x9ykg6vuluuupi1l12200/psychic.png?rlkey=4odehcpb1bk3akk0j715ho51y&raw=1' },
    { type: 'bug', color: '#B6A136', background: 'https://www.dropbox.com/scl/fi/35yp5kqzhvp3ssp8olcnd/grass-bug.png?rlkey=7g1bcxwcyu5gwt7ktu5n1cz5b&raw=1' },
    { type: 'rock', color: '#B6A136', background: 'https://www.dropbox.com/scl/fi/h2ue1e5a4d775g01qez8e/rock.png?rlkey=f2mg43ntdz5rf46wxms4zltvy&raw=1' },
    { type: 'ghost', color: '#735797', background: 'https://www.dropbox.com/scl/fi/ubdo9smqse7m4atg1ba6j/ghost.png?rlkey=3j5yw424bikdp40xeatm8a314&raw=1' },
    { type: 'dragon', color: '#6F35FC', background: 'https://www.dropbox.com/scl/fi/9dbj7zu24vbhylfxpswlz/dragon.png?rlkey=0cdiqqsgrpjiiafx1jb7upy2d&raw=1' },
    { type: 'dark', color: '#705746', background: 'https://www.dropbox.com/scl/fi/boottrhzki0wo9x2kw63v/dark.png?rlkey=47zenfjp49cpdv9dw31qxs9ad&raw=1' },
    { type: 'steel', color: '#B7B7CE', background: 'https://www.dropbox.com/scl/fi/0agxifybjc1xicdhp2eri/steel.png?rlkey=ccb1ubmd176aat5n6ojnrurxo&raw=1' },
    { type: 'fairy', color: '#D685AD', background: 'https://www.dropbox.com/scl/fi/5or1wrcyu9umc8zkizye9/fairy.png?rlkey=hpb93ok19ksq3qb22rqwymref&raw=1' }
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
        .text(data.height)
    d3.select('#weight')
        .text(data.weight)

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
        .text(data.height)
    d3.select('#weight')
        .text(data.weight)

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

    if (matchingType.type === 'ghost' || matchingType.type === 'psychic' || matchingType.type === 'dark') {
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
    const imperialNum = ((number / 3.084) * 10) / 10
    const feet = Math.floor(imperialNum);
    const inches = Math.round((imperialNum - feet) * 12);
    return `${feet}' ${inches}"`;
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
    alert(errorText) //Remove this after submission. Alert boxes are gross
    document.getElementById("search-input").value = ''
}