async function load() {
  const subs = await fetch("/api/subscriptions").then(r => r.json());
  const stats = await fetch("/api/stats").then(r => r.json());

  document.getElementById("total").innerText =
    `$${stats.monthlyWaste} / month`;

  const list = document.getElementById("list");
  list.innerHTML = "";
  subs.forEach(s => {
    const li = document.createElement("li");
    li.innerText = `${s.name} - $${s.price}`;
    list.appendChild(li);
  });
}

function addSub() {
  const name = prompt("Subscription name?");
  const price = Number(prompt("Monthly price?"));
  fetch("/api/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  }).then(load);
}

load();
