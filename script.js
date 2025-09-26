let totalBudget = 0;
let spent = 0;

const startBtn = document.getElementById("start-budget");
const addItemBtn = document.getElementById("add-item");

startBtn.addEventListener("click", () => {
  const title = document.getElementById("budget-title").value;
  totalBudget = parseFloat(document.getElementById("budget-total").value) || 0;

  document.getElementById("display-title").textContent = title;
  document.getElementById("set-total").textContent = totalBudget.toFixed(2);
  document.getElementById("remaining-amount").textContent = totalBudget.toFixed(2);
  document.getElementById("total-amount").textContent = "0.00";

  document.getElementById("budget-details").classList.remove("hidden");

  updateBudgetColors(totalBudget, totalBudget);
});

addItemBtn.addEventListener("click", () => {
  const itemName = document.getElementById("item-name").value;
  const itemAmount = parseFloat(document.getElementById("item-amount").value) || 0;
  const itemDate = document.getElementById("item-date").value;

  if (!itemName || itemAmount <= 0) return;

  spent += itemAmount;
  const remaining = totalBudget - spent;

  // Update UI
  document.getElementById("remaining-amount").textContent = remaining.toFixed(2);
  document.getElementById("total-amount").textContent = spent.toFixed(2);

  const li = document.createElement("li");
  li.textContent = `${itemName} - ₦${itemAmount.toFixed(2)} (${itemDate})`;
  document.getElementById("items-list").appendChild(li);

  // Apply color logic
  updateBudgetColors(totalBudget, remaining);

  // Clear inputs
  document.getElementById("item-name").value = "";
  document.getElementById("item-amount").value = "";
  document.getElementById("item-date").value = "";
});

function updateBudgetColors(total, remaining) {
  const remainingText = document.getElementById("remaining-text");

  // Reset classes
  remainingText.classList.remove("low-budget", "negative-budget");

  if (remaining < 0) {
    remainingText.classList.add("negative-budget"); // 🔴
  } else if (remaining <= total * 0.1) {
    remainingText.classList.add("low-budget"); // 🟠
  } else {
    remainingText.style.color = "green"; // 🟢
  }
}
