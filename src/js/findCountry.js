import debounce from 'lodash.debounce';
import countryCard from '../templates/country-card.hbs'
import countriesList from "../templates/countries-list.hbs";
import API from './fetchCountries';
import { alert } from "@pnotify/core";
import getRefs from "./getRefs.js";
import err from "./errorMsgGenerator.js";

const refs = getRefs();
refs.input.addEventListener('input', debounce(onInputFill, 500));

function onInputFill(evt) {
    evt.preventDefault();
    const form = evt.target;
    const { value } = form;

    if (value.length < 1) {
        return;
    }
    const searchQuery = refs.input.value;

    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
       .finally(() => form.reset);
}

function onFetchError(error) {
    alert(error);
}

function renderCountryCard(countries) {
    if (countries.length >= 10) {
        
        return err.errorTooMany();
    }
    if (countries.length <= 10 && countries.length > 1) {
        
        refs.cardContainer.innerHTML = countriesList(countries);
    }
    if (countries.length === 1) {
        
        refs.cardContainer.innerHTML = countryCard(countries[0]);
    }
    else {
        err.errorNotFound();
    
  }
}