//---------------Mashup----------------
var data; // Variable zur Speicherung der abgerufenen Daten
var activeButton = null; // Variable für den aktiven Button

// Funktion zum Anzeigen aller Daten eines bestimmten Typs in tabellarischer Form
function showData(type) {
    var dataContainer = document.getElementById("dataContainer");
    dataContainer.innerHTML = "";

    // Erstelle eine Tabelle
    var table = document.createElement("table");
    var headerRow = table.insertRow();
    var headers = [];

    // Iteriere über alle Daten und füge die passenden dem Tabellenkopf hinzu
    data.forEach(function (item) {
        if (item.type === type) {
            var row = table.insertRow();
            for (var key in item) {
                if (!headers.includes(key)) {
                    headers.push(key);
                    var headerCell = headerRow.insertCell();
                    headerCell.textContent = key;
                }
            }
            // Füge die Daten als Zeilen zur Tabelle hinzu
            for (var i = 0; i < headers.length; i++) {
                var cell = row.insertCell();
                cell.textContent = item[headers[i]];
            }
        }
    });

    dataContainer.appendChild(table);

    // Hebe den aktiven Button hervor
    if (activeButton) {
        activeButton.classList.remove("active");
    }
    var clickedButton = document.getElementById(type);
    clickedButton.classList.add("active");
    activeButton = clickedButton;
}

// Funktion zum Erstellen der Buttons für die verschiedenen data:-Typen
function createButtons() {
    var buttonContainer = document.getElementById("buttonContainer");

    // Erzeuge für jeden data:-Typen einen Button
    var types = [];
    data.forEach(function (item) {
        if (!types.includes(item.type)) {
            types.push(item.type);
            var button = document.createElement("button");
            button.textContent = item.type;
            button.id = item.type; // Setze die ID des Buttons auf den Typen
            button.addEventListener("click", function () {
                // Wenn der Button geklickt wird, zeige alle Daten dieses Typs an
                showData(item.type);
            });
            buttonContainer.appendChild(button);
        }
    });
}

// Funktion zum Abrufen der Daten vom Mashup
function fetchData() {
    var xmlHttp = new XMLHttpRequest();
    var mashupServerUrl = "https://cmnet.communitymashup.net/json/";
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            data = JSON.parse(xmlHttp.responseText)['dataset']['items'];
            createButtons();
        }
    }
    xmlHttp.open("GET", mashupServerUrl, true);
    xmlHttp.send();
}

// Rufe die Daten vom Mashup ab und initialisiere die Buttons
fetchData();