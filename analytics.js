document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load both JSON and CSV data
    const [jsonResponse, csvResponse] = await Promise.all([
      fetch("sale_data.json"),
      fetch("cancelled_invoices.csv"),
    ]);

    if (!jsonResponse.ok || !csvResponse.ok) {
      throw new Error("Failed to load data files");
    }

    const data = await jsonResponse.json();
    const csvText = await csvResponse.text();

    // Process cancelled orders CSV
    const cancelled = csvText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line.toLowerCase() !== "invoice_numbers"); // Skip empty lines and header

    // Calculate analytics
    const { total_orders, total_cost, breakdown, total_revenue } = calculateAll(
      data,
      cancelled
    );

    // Display results
    document.getElementById("total_orders").textContent = total_orders;
    document.getElementById("total_cost").textContent = `₹${total_cost}`;
    document.getElementById("total_revenue").textContent = `₹${total_revenue}`;

    const breakdownBox = document.getElementById("breakdown");
    breakdownBox.innerHTML = ""; // Clear any existing content
    breakdown.forEach((item) => {
      const row = document.createElement("div");
      row.className = "breakdown-item";
      row.innerHTML = `
                <span class="category">${item.category}</span>
                <span class="revenue">₹${item.revenue}</span>
            `;
      breakdownBox.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading or processing data:", error);
    document.getElementById("error-message").textContent =
      "An error occurred while loading the analytics. Please check the console for details.";
  }
});

function calculateAll(data, cancelled) {
  // Filter out cancelled orders and convert string numbers to floats
  const validOrders = data
    .filter((order) => !cancelled.includes(order.invoice_number))
    .map((order) => {
      // Convert string amounts to numbers
      return {
        ...order,
        packaging_cost: parseFloat(order.packaging_cost) || 0,
        labelling_cost: parseFloat(order.labelling_cost) || 0,
        shipping_charges: parseFloat(order.shipping_charges) || 0,
        items: order.items.map((item) => ({
          ...item,
          selling_price: parseFloat(item.selling_price) || 0,
          cost_price: parseFloat(item.cost_price) || 0,
          gst_amount: parseFloat(item.gst_amount) || 0,
        })),
      };
    });

  // 1. Total number of valid orders
  const total_orders = validOrders.length;

  // 2. Total cost of all orders (cost price + packaging + labeling)
  const total_cost = validOrders.reduce((sum, order) => {
    const itemsCost = order.items.reduce(
      (itemSum, item) => itemSum + item.cost_price * item.quantity,
      0
    );
    return sum + itemsCost + order.labelling_cost + order.packaging_cost;
  }, 0);

  // 3. Category-wise revenue breakdown (selling price - GST)
  const categoryMap = new Map();

  validOrders.forEach((order) => {
    order.items.forEach((item) => {
      const revenue = (item.selling_price - item.gst_amount) * item.quantity;
      const current = categoryMap.get(item.category) || 0;
      categoryMap.set(item.category, current + revenue);
    });
  });

  // Convert to sorted array
  const breakdown = Array.from(categoryMap.entries())
    .map(([category, revenue]) => ({
      category,
      revenue: revenue.toFixed(2),
    }))
    .sort((a, b) => b.revenue - a.revenue); // Sort by revenue descending

  // 4. Total revenue (sum of (SP - GST) + shipping per order)
  const total_revenue = validOrders.reduce((sum, order) => {
    const itemsRevenue = order.items.reduce((itemSum, item) => {
      return itemSum + (item.selling_price - item.gst_amount) * item.quantity;
    }, 0);
    return sum + itemsRevenue + order.shipping_charges;
  }, 0);

  return {
    total_orders,
    total_cost: total_cost.toFixed(2),
    breakdown,
    total_revenue: total_revenue.toFixed(2),
  };
}
