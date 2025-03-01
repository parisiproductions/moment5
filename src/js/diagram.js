"use strict";

import Chart from "chart.js/auto";

// Kör när sidan laddats
document.addEventListener("DOMContentLoaded", () => {
    loadStatistics();
});

// Funktion som hämtar statistikdata
async function loadStatistics() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/"); 
        if (!response.ok) {
            throw new Error("Fel vid anslutning till data...");
        }
        const data = await response.json();

        // Filtrera ut de 6 mest sökta kurserna
        const topCourses = data
            .filter(item => item.type === "Kurs")
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 6);

        // Filtrera ut de 5 mest sökta programmen
        const topPrograms = data
            .filter(item => item.type === "Program")
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 5);

        createBarChart(topCourses);
        createPieChart(topPrograms);

    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Fel vid anslutning - prova senare!</p>";
    }
}

// Skapa stapeldiagram
function createBarChart(topCourses) {
    const ctx = document.getElementById("barChart");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: topCourses.map(course => course.name),
            datasets: [{
                label: "Antal sökande",
                data: topCourses.map(course => course.applicantsTotal),
                backgroundColor: "#e9417e",
                borderColor: "#86113c",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Skapa cirkeldiagram
function createPieChart(topPrograms) {
    const ctx = document.getElementById("pieChart");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: topPrograms.map(program => program.name),
            datasets: [{
                label: "Antal sökande",
                data: topPrograms.map(program => program.applicantsTotal),
                backgroundColor: ["#86113c", "#e9417e", "#810a9e", "#f3aec7", "#613947"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}
