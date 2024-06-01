var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'TjUwNDROZUN1WTkzUnpSa1ZvSTUweU40dlZJNFg0c2tHQnhQZXlwRA=='
  };
  
  var countrySelect = document.querySelector('.country'),
      stateSelect = document.querySelector('.state'),
      citySelect = document.querySelector('.city');  // Assuming you want to define citySelect
  
  function loadCountries() {
    let apiEndPoint = config.cUrl;
    let headers = { "X-CSCAPI-KEY": config.ckey };
  
    fetch(apiEndPoint, { headers: headers })
      .then(response => response.json())
      .then(data => {
        data.forEach(country => {
          const option = document.createElement('option');
          option.value = country.iso2;
          option.textContent = country.name;
          countrySelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error loading countries:', error));
  
    stateSelect.disabled = true;
    if (citySelect) { // Check if citySelect is defined
      citySelect.disabled = true;
      citySelect.style.pointerEvents = 'none';
    }
    stateSelect.style.pointerEvents = 'none';
  }
  
  function loadStates() {
    stateSelect.disabled = false;
    if (citySelect) { // Check if citySelect is defined
      citySelect.disabled = true;
      citySelect.style.pointerEvents = 'none';
    }
    stateSelect.style.pointerEvents = 'auto';
  
    const selectedCountryCode = countrySelect.value;
    stateSelect.innerHTML = '<option value="">Select State</option>'; // Clear existing state options
  
    fetch(`${config.cUrl}/${selectedCountryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then(response => response.json())
      .then(data => {
        data.forEach(state => {
          const option = document.createElement('option');
          option.value = state.iso2;
          option.textContent = state.name;
          stateSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error loading states:', error));
  }
  
  window.onload = loadCountries;
  
  