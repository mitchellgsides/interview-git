'use strict';

//key value and searchURL
const api_Key = 'a4f5f321a1f042668f1a19f3c0f77dd3';
const searchURL = 'https://api.nps.gov/api/v1/parks'


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

// renderResults Function
function displayResults(responseJson) {
// if there are previous results, remove them
$('#results-list').empty();
//iterate through response array
for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">Website</a>
        </li>`
    )
    $('#results').removeClass('hidden');
    }
};

// getResults Function 
function getNationalParks(stateCode, limit=10) {
    const params = {
        key: api_Key,
        //limit - 1 accounts for data.length to return proper number of results
        limit: (limit - 1),
        stateCode: stateCode
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        console.log(responseJson.data);
        for(let i = 0; i < limit; i++) {
        console.log(responseJson.data[i])
        }
        displayResults(responseJson);
    })
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
};


//watchForm Function
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const limit = $('#js-max-results').val();
        getNationalParks(searchTerm, limit);
    })
}


$(watchForm);