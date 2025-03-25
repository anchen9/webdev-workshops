document
  .getElementById("groceryForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const store = document.getElementById("store").value.trim().toLowerCase();
    const item = document.getElementById("item").value.trim();

    const validStores = {
      costco: "costco-items",
      walmart: "walmart-items",
    };

    if (!(store in validStores)) {
      document.getElementById("message").innerText =
        "Error:  Store does not exist.";
      return;
    }

    const response = await fetch("/api/grocery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ store: store, item: item }),
    });

    const result = await response.json();
    document.getElementById("message").innerText =
      result.message || "Error adding item";

    if (response.ok) {
      const list = document.getElementById(validStores[store]);
      const newItem = document.createElement("li");
      newItem.textContent = item;
      list.appendChild(newItem);
    }
  });
