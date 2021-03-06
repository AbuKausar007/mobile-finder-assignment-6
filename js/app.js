const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    
    if( searchText == ''){
        document.getElementById('empty-text-msg').style.display = 'block';
        // clearing old serach result when again click for empty text.
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        // clearing old not found message
        document.getElementById('not-found-msg').style.display = 'none';
        // clearing old mobile details data 
        const mobileDetails = document.getElementById('mobile-details');
        mobileDetails.textContent = '';
    }
    else{
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then( res => res.json())
        .then( data => mobileSearchResult(data.data));
        document.getElementById('empty-text-msg').style.display = 'none';
    }    
}

// all search result & display in UI
const mobileSearchResult = mobiles => {
    // showing only first 20 devices
    const mobilesAmount = mobiles.slice(0,20);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // old mobile details data clearing
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';
    if (mobilesAmount.length == 0){
        document.getElementById('not-found-msg').style.display = 'block';
    }
    else{
        mobilesAmount.forEach ( mobile => {
        console.log(mobile);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-0 rounded-5 shadow-lg w-75 mx-auto text-center py-3">
            <img class="w-75 mx-auto" src="${mobile.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title fw-bold blue-color">${mobile.phone_name}</h3>
            <p class="brand-name blue-color fw-bold fs-5">Brand: <span class="fw-bold orange-color">${mobile.brand}</span></p>
            <button onclick="loadMobileDetail('${mobile.slug}')" id="details-button" class="btn py-2 px-4 fw-bold text-white rounded-5">See More</button>
        </div>
        </div>
        `;
        searchResult.appendChild(div);
        document.getElementById('not-found-msg').style.display = 'none';
        // document.getElementById('see-all-device').style.display = 'block';
    })
    }
   
}

// search single details 
const loadMobileDetail = mobileId => {
    console.log(mobileId);
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    console.log(url);
    fetch (url)
        .then( res => res.json())
        .then( data => displayMobileDetail(data.data));
}

// display single details
const displayMobileDetail = mobile => {
    console.log(mobile);
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="row rounded-3 shadow-lg py-4 mt-5">
                <div class="col-lg-4 cols-12 text-center ">
                    <img src="${mobile.image}" class="img-fluid" alt="">
                    <h3 class="mt-2 fw-bold blue-color">${mobile.name}</h3> 
                    <h4 class=" orange-color">(Product of ${mobile.brand})</h4>
                    <h6>${mobile.releaseDate? mobile.releaseDate: 'Release Date Not Found.'}</h6>
                </div>
                <div class="col-lg-8 cols-12">
                    <div class=" sm-device row pe-lg-4 justify-content-between">
                        <div class="col-lg-4 col-12 sm-gap rounded-3 shadow">
                            <h3 class="blue-color fw-bold">Some Basic Information.</h3>
                            <p><span class="fw-bold orange-color">Chipset:</span> ${mobile.mainFeatures.chipSet}</p>
                            <p><span class="fw-bold orange-color">Memory:</span> ${mobile.mainFeatures.memory}</p>
                            <p><span class="fw-bold orange-color">Storage:</span> ${mobile.mainFeatures.storage}</p>
                            <p><span class="fw-bold orange-color">Display Size:</span> ${mobile.mainFeatures.displaySize}</p>
                        </div>
                        <div class="col-lg-4 col-12 sm-gap rounded-3 shadow">
                            <h3 class="blue-color fw-bold">Others Information.</h3>
                            <p><span class="fw-bold orange-color">Bluetooth:</span> ${mobile?.others?.Bluetooth? mobile.others.Bluetooth: 'Not Found'}</p>
                            <p><span class="fw-bold orange-color">WLAN:</span> ${mobile?.others?.WLAN? mobile.others.WLAN: 'Not Found'}</p>
                            <p><span class="fw-bold orange-color">USB:</span> ${mobile?.others?.USB? mobile.others.USB: 'Not Found' }</p>
                            <p><span class="fw-bold orange-color">GPS:</span> ${mobile?.others?.GPS? mobile.others.GPS: 'Not Found'}</p>
                            <p><span class="fw-bold orange-color">Radio:</span> ${mobile?.others?.Radio? mobile.others.Radio: 'Not Found'}</p>
                        </div> 
                        <div class=" col-lg-4 col-12 sm-gap rounded-3 shadow">
                            <h3 class="blue-color fw-bold">Sensor Information.</h3>
                            <p><span class="fw-bold orange-color">First Sensor:</span> ${mobile.mainFeatures.sensors[0]}</p>
                            <p><span class="fw-bold orange-color">Second Sensor:</span> ${mobile.mainFeatures.sensors[1]}</p>
                            <p><span class="fw-bold orange-color">Third Sensor:</span> ${mobile.mainFeatures.sensors[2]}</p>
                            <p><span class="fw-bold orange-color">Fourth Sensor:</span> ${mobile.mainFeatures.sensors[3]}</p>
                            <p><span class="fw-bold orange-color">Fifth Sensor:</span> ${mobile.mainFeatures.sensors[4]}</p>
                        </div>
                    </div>
                </div>
            </div>
    `;
    mobileDetails.appendChild(div);    
}