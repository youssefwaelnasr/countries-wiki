// VARIABLES
const search = document.getElementById("search-bar");
const results = document.getElementById("results");

// SEARCH AND FILTER COUNTRIES
search.addEventListener("input", searchCountries);
async function searchCountries() {
    const searchText = search.value,
        response = await fetch("data/countries.json"),
        countries = await response.json(),
        regex = new RegExp(`^${searchText}`, "gi");
    let matches;
    if (/[a-z]/gi.test(searchText)) {
        matches = countries.filter(
            (country) =>
                regex.test(country.name) ||
                regex.test(country.abbr) ||
                regex.test(country["official-name"]),
        );
    } else {
        matches = [];
    }
    showResults(matches);
}
function showResults(matches) {
    if (matches.length > 0) {
        const resultsList = [];
        matches.forEach((match) => {
            if (match.hasOwnProperty("official-name")) {
                resultsList.push(
                    `<div class="result-item">
                    <h2>${match.name} (${match.abbr}) | ${match["official-name"]}</h2><br>
                    <h4>
                    <div class="misc"><i class="fas fa-university"></i> ${match.capital}</div>
                    <div class="misc"><i class="far fa-money-bill-alt"></i> ${match.currency}</div>
                    <div class="misc"><i class="fas fa-language"></i> ${match.languages}</div>
                    <div class="misc"><i class="fas fa-pray"></i> ${match.religion}</div>
                    </h4>
                    </div>`,
                );
            } else {
                resultsList.push(
                    `<div class="result-item">
                    <h2>${match.name} (${match.abbr})</h2><br>
                    <h4>
                    <div class="misc"><i class="fas fa-university"></i> ${match.capital}</div>
                    <div class="misc"><i class="far fa-money-bill-alt"></i> ${match.currency}</div>
                    <div class="misc"><i class="fas fa-language"></i> ${match.languages}</div>
                    <div class="misc"><i class="fas fa-pray"></i> ${match.religion}</div>
                    </h4>
                    </div>`,
                );
            }
        });

        results.innerHTML = resultsList.join("");
    } else {
        results.innerHTML = "";
    }
}
