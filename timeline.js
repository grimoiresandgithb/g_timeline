fetch("data/timeline.json")
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById("timeline-events");

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    events.forEach((event, index) => {
      const div = document.createElement("div");
      div.className = "timeline-event";
      div.style.left = `${index * 260}px`;

      div.innerHTML = `
  <div class="polaroid">
    <div class="tape"></div>
    <div class="polaroid-inner">
      ${
        event.image
          ? `<img src="${event.image}" alt="">`
          : `
            <div class="polaroid-text">
              <strong>${event.title}</strong>
              <p>${event.summary}</p>
            </div>
          `
      }
    </div>
    <div class="caption">${event.date}</div>
  </div>
`;


      div.addEventListener("mouseenter", () => showTooltip(event, div));
      div.addEventListener("mouseleave", hideTooltip);

      container.appendChild(div);
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
    ${event.readMore ? `<br><a href="${event.readMore}">Read more</a>` : ""}
  `;

  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + "px";
  tooltip.style.top = rect.top - 120 + "px";
  tooltip.style.display = "block";
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.style.display = "none";
}
