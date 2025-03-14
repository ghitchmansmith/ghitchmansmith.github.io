document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("surf-data");

  async function fetchSurfData() {
    try {
      let response = await fetch(
        "https://veyipevpadlpvegmeego.supabase.co/functions/v1/my-function"
      );
      let data = await response.json();

      tableBody.innerHTML = ""; // Clear existing rows
      data.forEach((row) => {
        let tr = document.createElement("tr");

        let colorClass = "";
        if (row.surf_score < -8) colorClass = "row-red";
        else if (row.surf_score < 0) colorClass = "row-orange";
        else if (row.surf_score < 4) colorClass = "row-yellow";
        else if (row.surf_score < 8) colorClass = "row-light-green";
        else colorClass = "row-dark-green";

        tr.classList.add(colorClass);

        tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${new Date(row.time).toLocaleString()}</td>
                    <td>${row.lat}</td>
                    <td>${row.lng}</td>
                    <td>${row.swell_direction}°</td>
                    <td>${row.swell_height}m</td>
                    <td>${row.swell_period}s</td>
                    <td>${row.wave_period}s</td>
                    <td>${row.wind_direction}°</td>
                    <td>${row.wind_speed} m/s</td>
                    <td>${row.surf_score}</td>
                    <td>${row.surf_score_readable}</td>
                    <td>${new Date(row.last_updated).toLocaleString()}</td>
                    <td>${row.beach_id}</td>
                `;

        tableBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchSurfData();
});
