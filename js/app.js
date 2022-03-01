const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // load data
    fetch(url)
        .then( res => res.json())
        .then( data => mobileSearchResult(data.data));
        
}

// search & display mobile
const mobileSearchResult = mobiles => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    mobiles.forEach ( mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-0 rounded-5 shadow-lg w-75 mx-auto text-center py-3">
            <img class="w-75 mx-auto" src="${mobile.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title fw-bold text-color">${mobile.phone_name}</h3>
            <p class="brand-name text-color fw-bold fs-5">Brand: <span class="fw-normal">${mobile.brand}</span></p>
            <button class="btn py-2 px-4 fw-bold text-white rounded-5">See More</button>
        </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}