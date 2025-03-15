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
          let colorClass = "";
          if (avgSurfScore < -8) colorClass = "row-red";
          else if (avgSurfScore < 0) colorClass = "row-orange";
          else if (avgSurfScore < 4) colorClass = "row-yellow";
          else if (avgSurfScore < 8) colorClass = "row-light-green";
          else colorClass = "row-dark-green";

          let dateRow = document.createElement("tr");
          dateRow.classList.add(colorClass);
          dateRow.innerHTML = `<td colspan="9"><strong>${rowDate}</strong></td>`;
          tableBody.appendChild(dateRow);
        }

        let tr = document.createElement("tr");

        let colorClass = "";
        if (row.surf_score < -8) colorClass = "row-red";
        else if (row.surf_score < 0) colorClass = "row-orange";
        else if (row.surf_score < 4) colorClass = "row-yellow";
        else if (row.surf_score < 8) colorClass = "row-light-green";
        else colorClass = "row-dark-green";

        tr.classList.add(colorClass);

        tr.innerHTML = `
              <td>${new Date(row.time).toLocaleString()}</td>
              <td>${row.surf_score_readable}</td>
              <td class="${row.wave_height < 0.4 ? "cell-red" : ""}">${
          row.wave_height
        }m</td>            <td>${row.wave_period}s</td>
              <td>${row.swell_direction}°</td>
              <td class="${row.swell_height < 0.4 ? "cell-red" : ""}">${
          row.swell_height
        }m</td>
              <td>${row.swell_period}s</td>
              <td>${row.wind_direction}°</td>
              <td>${row.wind_speed} m/s</td>
            `;

        tableBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchSurfData();
});
