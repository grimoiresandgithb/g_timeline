document.getElementById("entry-form").addEventListener("submit", e => {
  e.preventDefault();

  const entry = {
    id: crypto.randomUUID(),
    date: document.getElementById("date").value,
    title: document.getElementById("title").value,
    summary: document.getElementById("summary").value,
    details: document.getElementById("details").value || null,
    image: document.getElementById("image").value || null,
    readMore: document.getElementById("readMore").value || null
  };

  document.getElementById("output").textContent =
    JSON.stringify(entry, null, 2) + ",";
});
