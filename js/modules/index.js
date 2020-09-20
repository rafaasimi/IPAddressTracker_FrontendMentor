import fetchIPAddress from './fetchIPAddress.js';

var mymap = '';

function initIndex() {


    const inputField = document.querySelector('input[type=text]');
    const button = document.querySelector('button');
    const map = document.querySelector('.map');
    const dataIPAddress = document.querySelector('[data-ipaddress] span')
    const dataLocation = document.querySelector('[data-location] span')
    const dataTimezone = document.querySelector('[data-timezone] span')
    const dataIsp = document.querySelector('[data-isp] span')

    button.addEventListener('click', IPQuery);

    async function IPQuery(event) {
        event.preventDefault();

        const IPAddress = inputField.value;
        const { ip, location: { country, region, city, lat, lng, timezone }, isp } = await fetchIPAddress(IPAddress)

        dataIPAddress.innerText = ip;
        dataLocation.innerText = `${city}, ${region}, ${country}`;
        dataTimezone.innerText = `UTC ${timezone}`;
        dataIsp.innerText = isp;

        mymap.remove();
        createMap(lat, lng);

    }

}


function createMap(lat = '-15.7801', lng = '-47.9292') {

    mymap = L.map('mapid').setView([lat, lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmFmYWFzaW1pIiwiYSI6ImNrZmFlenRqaTB2bTAyc290ZTN5OG53ZDAifQ.lOc0me73t1k6xFX_77vEog'
    }).addTo(mymap);


    var blackIcon = L.icon({
        iconUrl: './images/icon-location.svg',

        iconSize: [46, 55], // size of the icon
        iconAnchor: [30, 54], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([lat, lng], { icon: blackIcon }).addTo(mymap);


}


export { initIndex, createMap }
