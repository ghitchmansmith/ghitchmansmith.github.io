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
          if (avgSurfScore < -8) colorClass = "date-row-red";
          else if (avgSurfScore < 0) colorClass = "date-row-orange";
          else if (avgSurfScore < 4) colorClass = "date-row-yellow";
          else if (avgSurfScore < 8) colorClass = "date-row-light-green";
          else colorClass = "date-row-dark-green";

          let dateRow = document.createElement("tr");
          dateRow.classList.add(colorClass);
          dateRow.innerHTML = `<td colspan="9"><strong>${rowDate}</strong></td>`;
          tableBody.appendChild(dateRow);
        }

        let tr = document.createElement("tr");
        let detailsRow = document.createElement("tr");
        detailsRow.classList.add("details-row");

        let colorClass = "";
        if (row.surf_score < -8) colorClass = "row-red";
        else if (row.surf_score < 0) colorClass = "row-orange";
        else if (row.surf_score < 4) colorClass = "row-yellow";
        else if (row.surf_score < 8) colorClass = "row-light-green";
        else colorClass = "row-dark-green";

        // tr.classList.add(colorClass);

        tr.innerHTML = `
              <td class="${
                row.surf_score < -8
                  ? "cell-red"
                  : row.surf_score < 0
                  ? "cell-orange"
                  : row.surf_score < 4
                  ? "cell-light-green"
                  : row.surf_score < 8
                  ? "cell-light-green"
                  : "cell-dark-green"
              }">${new Date(row.time).toLocaleString()}</td>
              <td class="${
                row.surf_score < -8
                  ? "cell-red"
                  : row.surf_score < 0
                  ? "cell-orange"
                  : row.surf_score < 4
                  ? "cell-light-green"
                  : row.surf_score < 8
                  ? "cell-light-green"
                  : "cell-dark-green"
              }">${row.surf_score_readable}</td>
              <td class="expand-toggle ${
                row.surf_score < -8
                  ? "cell-red"
                  : row.surf_score < 0
                  ? "cell-orange"
                  : row.surf_score < 4
                  ? "cell-light-green"
                  : row.surf_score < 8
                  ? "cell-light-green"
                  : "cell-dark-green"
              }">🔽</td>
              <td class="${
                row.wave_height < 0.4
                  ? "cell-red"
                  : row.wave_height < 1
                  ? "cell-yellow"
                  : row.wave_height < 1.5
                  ? "cell-light-green"
                  : "cell-dark-green"
              }">${row.wave_height}m</td>            
              <td class="${
                row.swell_direction < 270 && row.swell_direction > 240
                  ? "cell-dark-green"
                  : row.swell_direction < 315 && row.swell_direction > 195
                  ? "cell-yellow"
                  : "cell-red"
              }">${row.swell_direction}°</td>
              <td class="${
                row.swell_height < 0.4
                  ? "cell-red"
                  : row.swell_height < 1
                  ? "cell-yellow"
                  : row.swell_height < 1.5
                  ? "cell-light-green"
                  : "cell-dark-green"
              }">${row.swell_height}m</td>
              <td class="${
                row.swell_period < 6
                  ? "cell-red"
                  : row.swell_period < 8
                  ? "cell-yellow"
                  : row.swell_period < 10
                  ? "cell-light-green"
                  : "cell-dark-green"
              }">${row.swell_period}s</td>
              <td class="${
                row.wind_direction < 120 && row.wind_direction > 60
                  ? "cell-dark-green"
                  : row.wind_direction > 120 || row.wind_direction < 60
                  ? "cell-yellow"
                  : row.wind_direction > 240 || row.wind_direction < 300
                  ? "cell-red"
                  : ""
              }">${row.wind_direction}°<BR>
                ${
                  row.wind_direction < 120 && row.wind_direction > 60
                    ? "(offshore)"
                    : row.wind_direction > 120 || row.wind_direction < 60
                    ? "(cross-shore)"
                    : row.wind_direction > 240 || row.wind_direction < 300
                    ? "(onshore)"
                    : ""
                }</td>
              <td class="${
                row.wind_speed < 6.7
                  ? "cell-dark-green"
                  : row.wind_speed < 8
                  ? "cell-light-green"
                  : row.wind_speed < 10
                  ? "cell-yellow"
                  : row.wind_speed < 11.2
                  ? "cell-orange"
                  : "cell-red"
              }">${row.wind_speed} m/s<BR>
              ${
                row.wind_speed < 6.7
                  ? "(light)"
                  : row.wind_speed < 8
                  ? "(mild)"
                  : row.wind_speed < 10
                  ? "(moderate)"
                  : row.wind_speed < 11.2
                  ? "(high)"
                  : "(very high)"
              }</td>
            `;

        detailsRow.innerHTML = `
            <td class="${
              row.surf_score < -8
                ? "cell-red"
                : row.surf_score < 0
                ? "cell-orange"
                : row.surf_score < 4
                ? "cell-light-green"
                : row.surf_score < 8
                ? "cell-light-green"
                : "cell-dark-green"
            }" colspan="10">
              <div class="details-content">
                <p>A ${
                  row.wave_height < 0.4
                    ? "very small"
                    : row.wave_height < 1
                    ? "small"
                    : row.wave_height < 1.5
                    ? "moderate"
                    : "good"
                } sized wave with a ${
          row.wind_speed < 6.7
            ? "light"
            : row.wind_speed < 8
            ? "mild"
            : row.wind_speed < 10
            ? "moderate"
            : row.wind_speed < 11.2
            ? "high"
            : "very high"
        } ${
          row.wind_direction < 120 && row.wind_direction > 60
            ? "offshore"
            : row.wind_direction > 120 || row.wind_direction < 60
            ? "cross-shore"
            : row.wind_direction > 240 || row.wind_direction < 300
            ? "onshore"
            : ""
        } wind and a ${
          row.swell_period < 6
            ? "short"
            : row.swell_period < 8
            ? "moderate"
            : row.swell_period < 10
            ? "good"
            : "long"
        } swell period means that the conditions are potentially ${
          row.surf_score < -8
            ? "unsurfable"
            : row.surf_score < 0
            ? "poor"
            : row.surf_score < 4
            ? "moderate"
            : row.surf_score < 8
            ? "good"
            : "excellent"
        } at this time.</p>
              </div>
            </td>
          `;

        detailsRow.style.display = "none";

        tr.querySelector(".expand-toggle").addEventListener("click", () => {
          const content = detailsRow.querySelector(".details-content");
          if (detailsRow.style.display === "none") {
            detailsRow.style.display = "table-row";
            content.style.maxHeight = content.scrollHeight + "px";
            tr.querySelector(".expand-toggle").textContent = "🔼";
          } else {
            content.style.maxHeight = "0";
            setTimeout(() => {
              detailsRow.style.display = "none";
            }, 300);
            tr.querySelector(".expand-toggle").textContent = "🔽";
          }
        });

        tableBody.appendChild(tr);
        tableBody.appendChild(detailsRow);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchSurfData();
});
