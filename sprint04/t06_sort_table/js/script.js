const heroes = [
    { name: "Iron Man", strength: 85, age: 48 },
    { name: "Thor", strength: 95, age: 1500 },
    { name: "Hulk", strength: 100, age: 49 },
    { name: "Captain America", strength: 80, age: 101 },
    { name: "Black Widow", strength: 75, age: 34 },
    { name: "Thanos", strength: 99, age: 1000 },
    { name: "Spider-Man", strength: 78, age: 18 },
    { name: "Doctor Strange", strength: 88, age: 42 },
    { name: "Black Panther", strength: 84, age: 39 },
    { name: "Scarlet Witch", strength: 90, age: 29 }
];

let sortState = {
    name: true,
    strength: true,
    age: true
};

function createTable(data)
{
    const table = document.createElement("table");
    table.className = "hero-table";

    // голова
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = ["Name", "Strength", "Age"];
    headers.forEach((title, index) => {
        const th = document.createElement("th");
        th.textContent = title;
        th.addEventListener("click", () => sortBy(title.toLowerCase()));
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // тіло
    const tbody = document.createElement("tbody");

    data.forEach(hero => {
        const row = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = hero.name;

        const tdStrength = document.createElement("td");
        tdStrength.textContent = hero.strength;

        const tdAge = document.createElement("td");
        tdAge.textContent = hero.age;

        row.appendChild(tdName);
        row.appendChild(tdStrength);
        row.appendChild(tdAge);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table;
}

function renderTable(data)
{
    const container = document.getElementById("placeholder");
    container.innerHTML = "";
    const table = createTable(data);
    container.appendChild(table);
}

// сортування чулувічків
function sortBy(param)
{
    heroes.sort((a, b) => {
        if (typeof a[param] === "string")
        {
            return sortState[param]
                ? a[param].localeCompare(b[param])
                : b[param].localeCompare(a[param]);
        }
        else
        {
            return sortState[param]
                ? a[param] - b[param]
                : b[param] - a[param];
        }
    });

    sortState[param] = !sortState[param];

    renderTable(heroes);
    const notification = document.getElementById("notification");
    notification.textContent = `Sorting by ${param}, order: ${sortState[param] ? "ASC" : "DESC"}`;
}

// Never Broke Again
document.addEventListener("DOMContentLoaded", () => {
    renderTable(heroes);
});
