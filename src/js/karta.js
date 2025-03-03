"use strict";

/**
 * Skapar en Leaflet-karta och sätter standardpositionen till Sundsvall.
 * @constant {L.Map}
 */

const map = L.map('map').setView([62.3908, 17.3069], 13);

/**
 * Lägger till OpenStreetMap som bakgrundskarta.
 */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**
 * Skapar en markör i Sundsvall.
 * @constant {L.Marker}
 */

const marker = L.marker([62.3908, 17.3069]).addTo(map)
    .bindPopup("Sundsvall").openPopup();

/**
 * Söker efter en plats via Nominatim API och uppdaterar kartan med en markör.
 * @async
 * @function searchLocation
 * @param {Event} event - Formulärets submit-händelse.
 * @returns {void}
 */

async function searchLocation(event) {
    event.preventDefault();

    const location = document.getElementById('location-input').value.trim();
    if (!location) return;

    /** API-anrop till Nominatim */

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Flytta kartan till vald plats
            map.setView([lat, lon], 13);

            // Uppdatera markörens position till vald plats
            marker.setLatLng([lat, lon]).bindPopup(location).openPopup();
        } else {
            alert("Platsen hittades inte. Prova igen!");
        }
    } catch (error) {
        console.error("Fel vid hämtning av plats:", error);
        alert("Ett fel uppstod. Försök igen.");
    }
}

/**
 * Lägger till en eventlistener på formuläret för att söka efter en plats.
 */

document.getElementById('search-form').addEventListener('submit', searchLocation);
