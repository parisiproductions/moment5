"use strict";

// Skapa Leaflet-karta och sätt Sundsvall som standardvy
let map = L.map('map').setView([62.3908, 17.3069], 13); // Sundsvall (lat, lon)


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Skapa en markör i Sundsvall
let marker = L.marker([62.3908, 17.3069]).addTo(map)
    .bindPopup("Sundsvall").openPopup();






// Funktion för att söka plats via Nominatim API
async function searchLocation(event) {
    event.preventDefault(); // Hindrar sidan från att ladda om

    let location = document.getElementById('location-input').value;
    if (!location) return;

    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.length > 0) {
            let lat = data[0].lat;
            let lon = data[0].lon;

            // Flytta kartan till vald plats
            map.setView([lat, lon], 13);

            // Uppdatera markörens position till vald plats
            marker.setLatLng([lat, lon]).bindPopup(`${location}`).openPopup();
        } else {
            alert("Platsen hittades inte. Prova igen!");
        }
    } catch (error) {
        console.error("Fel vid hämtning av plats:", error);
        alert("Ett fel uppstod. Försök igen.");
    }
}

// Lägg till en eventlistener på formulär och sök-knappen
document.getElementById('search-form').addEventListener('submit', searchLocation);
