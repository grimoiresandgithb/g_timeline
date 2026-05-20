fetch("data/timeline.json")
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById("timeline-container");

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    events.forEach((event, index) => {
      const side = index % 2 === 0 ? "left" : "right";

      const item = document.createElement("div");
      item.className = `timeline-item ${side}`;

      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card" data-id="${event.id}">
          <h3>${event.title}</h3>
          <p>${event.summary}</p>
        </div>
      `;

      item.addEventListener("mouseenter", () => showTooltip(event, item));
      item.addEventListener("mouseleave", hideTooltip);

      item.querySelector(".timeline-card").addEventListener("click", () => {
        if (event.readMore) {
          window.location.href = event.readMore;
        }
      });

      container.appendChild(item);
    });
  });

function showTooltip(event, element) {
  let tooltip = document.getElementById("tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = `
    <strong>${event.title}</strong><br>
    ${event.summary}
    ${event.readMore ? `<br><em>Click card for more</em>` : ""}
  `;

  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + rect.width / 2 + "px";
  tooltip.style.top = rect.top - 80 + "px";
  tooltip.style.display = "block";
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.style.display = "none";
}
