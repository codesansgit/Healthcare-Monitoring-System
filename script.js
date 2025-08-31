const form = document.getElementById("vitalsForm");
const ctx = document.getElementById("vitalsChart").getContext("2d");
let chart;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    bp: document.getElementById("bp").value,
    sugar: document.getElementById("sugar").value,
    hr: document.getElementById("hr").value,
    temp: document.getElementById("temp").value,
  };

  await fetch("http://localhost:5000/add-vitals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  loadVitals();
});

async function loadVitals() {
  const res = await fetch("http://localhost:5000/get-vitals");
  const vitals = await res.json();

  const labels = vitals.map((_, i) => `Entry ${i + 1}`);
  const bp = vitals.map(v => v.bp);
  const sugar = vitals.map(v => v.sugar);
  const hr = vitals.map(v => v.hr);
  const temp = vitals.map(v => v.temp);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "BP", data: bp, borderColor: "red" },
        { label: "Sugar", data: sugar, borderColor: "blue" },
        { label: "Heart Rate", data: hr, borderColor: "green" },
        { label: "Temperature", data: temp, borderColor: "orange" },
      ],
    },
  });
}

loadVitals();
