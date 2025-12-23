const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let subscriptions = [
  { name: "Netflix", price: 15 },
  { name: "Spotify", price: 11 }
];

app.get("/api/subscriptions", (req, res) => {
  res.json(subscriptions);
});

app.post("/api/subscriptions", (req, res) => {
  subscriptions.push(req.body);
  res.json({ success: true });
});

app.get("/api/stats", (req, res) => {
  const total = subscriptions.reduce((sum, s) => sum + s.price, 0);
  res.json({ monthlyWaste: total });
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
