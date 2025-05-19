const app = document.getElementById("app");

function renderSearch() {
  document.getElementById("search").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (!query) return;
      showLoading();
      const result = await fetch(`/api/cities?search=${query}`);
      const data = await result.json();
      renderResults(data);
    }
  });
}

function showLoading() {
  document.getElementById("results").innerHTML = `
    <p class="text-center text-gray-500 animate-pulse">Loading...</p>
  `;
}

function renderResults(results) {
  const container = document.getElementById("results");
  if (!results || results.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500">Nothing found</p>`;
    return;
  }
  const html1 = results
    .map(
      (city) => `
  <div class="p-4 bg-white shadow rounded flex justify-between items-center">
    <span>${city.name}</span>
    <span>${city.country}</span>
    <div>
      <select id="type-${city.id}" class="mr-2 border p-1 rounded">
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
      </select>
      <button
        class="bg-blue-500 text-white px-3 py-1 rounded"
        onclick="openSubscribe('${city.id}', '${city.name}')"
      >Subscribe</button>
    </div>
  </div>
`
    )
    .join("");
  container.innerHTML = html1;
}

window.openSubscribe = (id, name) => {
  const freq = document.getElementById(`type-${id}`).value;
  const modal = document.getElementById("modal-container");
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button onclick="closeModal()" class="absolute top-2 right-2 text-gray-500">&times;</button>
        <h2 class="text-xl mb-4">Subscribe to ${name} (${freq})</h2>
        <form id="subscribe-form" class="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            class="w-full p-2 border rounded"
          />
          <input type="hidden" name="city" value="${name}" />
          <input type="hidden" name="frequency" value="${freq}" />
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >Subscribe</button>
          <p id="form-error" class="text-red-500 text-sm hidden">Invalid email</p>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("subscribe-form");
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const errorEl = document.getElementById("form-error");
    if (!validateEmail(email)) {
      errorEl.classList.remove("hidden");
      return;
    }
    errorEl.classList.add("hidden");

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.innerText = "Subscribing...";

    await fetch("/api/subscribe", {
      method: "POST",
      body: formData,
    });

    closeModal();
  };
};

window.closeModal = () => {
  document.getElementById("modal-container").innerHTML = "";
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

renderSearch();
