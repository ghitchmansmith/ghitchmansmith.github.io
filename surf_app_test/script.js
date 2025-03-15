document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("surf-data");
  const titleElement = document.querySelector("h1");

  async function fetchSurfData() {
    try {
      let response = await fetch(
        "https://veyipevpadlpvegmeego.supabase.co/functions/v1/my-function"
      );
      let data = await response.json();

      if (data.length > 0) {
        const lastUpdated = new Date(
          data[data.length - 1].last_updated
        ).toLocaleString();
        titleElement.textContent = `Polzeath Surf Forecast (Last Updated: ${lastUpdated})`;
      }

      tableBody.innerHTML = "";

      let dailyScores = {};
      data.forEach((row) => {
        const dateKey = new Date(row.time).toDateString();
        if (!dailyScores[dateKey]) {
          dailyScores[dateKey] = { total: 0, count: 0 };
        }
        dailyScores[dateKey].total += row.surf_score;
        dailyScores[dateKey].count += 1;
      });

      let lastDate = "";
      data.forEach((row) => {
        const rowDate = new Date(row.time).toDateString();
        if (rowDate !== lastDate) {
          lastDate = rowDate;
          const avgSurfScore =
            dailyScores[rowDate].total / dailyScores[rowDate].count;
          let colorClass =
            avgSurfScore < -8
              ? "row-red"
              : avgSurfScore < 0
              ? "row-orange"
              : avgSurfScore < 4
              ? "row-yellow"
              : avgSurfScore < 8
              ? "row-light-green"
              : "row-dark-green";

          let dateRow = document.createElement("tr");
          dateRow.classList.add(colorClass);
          dateRow.innerHTML = `<td colspan="3"><strong>${rowDate}</strong></td>`;
          tableBody.appendChild(dateRow);
        }

        let mainRow = document.createElement("tr");
        let detailsRow = document.createElement("tr");
        detailsRow.classList.add("details-row");

        let colorClass =
          row.surf_score < -8
            ? "row-red"
            : row.surf_score < 0
            ? "row-orange"
            : row.surf_score < 4
            ? "row-yellow"
            : row.surf_score < 8
            ? "row-light-green"
            : "row-dark-green";

        mainRow.classList.add(colorClass);
        mainRow.innerHTML = `
              <td>${new Date(row.time).toLocaleString()}</td>
              <td>${row.surf_score_readable}</td>
              <td class="expand-toggle">🔽</td>
          `;

        detailsRow.innerHTML = `
            <td colspan="3">
              <div class="details-content">
                <p><strong>Wave Height:</strong> ${row.wave_height}m</p>
                <p><strong>Wave Period:</strong> ${row.wave_period}s</p>
                <p><strong>Swell Direction:</strong> ${row.swell_direction}°</p>
                <p><strong>Swell Height:</strong> ${row.swell_height}m</p>
                <p><strong>Swell Period:</strong> ${row.swell_period}s</p>
                <p><strong>Wind Direction:</strong> ${row.wind_direction}°</p>
                <p><strong>Wind Speed:</strong> ${row.wind_speed} m/s</p>
              </div>
            </td>
          `;

        detailsRow.style.display = "none";

        mainRow
          .querySelector(".expand-toggle")
          .addEventListener("click", () => {
            const content = detailsRow.querySelector(".details-content");
            if (detailsRow.style.display === "none") {
              detailsRow.style.display = "table-row";
              content.style.maxHeight = content.scrollHeight + "px";
              mainRow.querySelector(".expand-toggle").textContent = "🔼";
            } else {
              content.style.maxHeight = "0";
              setTimeout(() => {
                detailsRow.style.display = "none";
              }, 300);
              mainRow.querySelector(".expand-toggle").textContent = "🔽";
            }
          });

        tableBody.appendChild(mainRow);
        tableBody.appendChild(detailsRow);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchSurfData();
});
