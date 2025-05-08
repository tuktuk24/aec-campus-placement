// First fetch and parse the cancelled orders
fetch("cancelled_invoices.csv")
  .then((res) => res.text())
  .then((csv) => {
    // Skip header and get array of cancelled invoice numbers
    const cancelled = csv
      .split("\n")
      .slice(1)
      .map((line) => line.trim());

    // Then fetch and process the sales data
    fetch("sale_data.json")
      .then((res) => res.json())
      .then((data) => {
        const { total_orders, total_cost, breakdown, total_revenue } =
          calculateAll(data, cancelled);

        // Update the UI
        document.getElementById("total_orders").innerHTML = total_orders;
        document.getElementById("total_cost").innerHTML = total_cost.toFixed(2);
        document.getElementById("total_revenue").innerHTML =
          total_revenue.toFixed(2);

        const box = document.getElementById("breakdown");
        breakdown.forEach((item) => {
          const row = document.createElement("p");
          row.innerHTML = `${item.category}: ₹${item.revenue.toFixed(2)}`;
          box.appendChild(row);
        });
      });
  });

const calculateAll = (data, cancelled) => {
  // Filter out cancelled orders
  const validOrders = data.filter(
    (order) => !cancelled.includes(order.invoice_number)
  );

  // Calculate total valid orders
  const total_orders = validOrders.length;

  // Calculate total cost and revenue
  let total_cost = 0;
  let total_revenue = 0;
  let categoryRevenue = {};

  validOrders.forEach((order) => {
    // Calculate order cost
    const itemsCost = order.items.reduce(
      (sum, item) => sum + parseFloat(item.cost_price) * item.quantity,
      0
    );
    const orderCost = itemsCost + order.packaging_cost + order.labelling_cost;
    total_cost += orderCost;

    // Calculate order revenue and category-wise breakdown
    order.items.forEach((item) => {
      const itemRevenue = parseFloat(item.selling_price) - item.gst_amount;

      // Add to category breakdown
      if (!categoryRevenue[item.category]) {
        categoryRevenue[item.category] = 0;
      }
      categoryRevenue[item.category] += itemRevenue;

      // Add to total revenue
      total_revenue += itemRevenue;
    });

    // Add shipping charges to revenue
    total_revenue += order.shipping_charges;
  });

  // Convert category breakdown to required format
  const breakdown = Object.entries(categoryRevenue).map(
    ([category, revenue]) => ({
      category,
      revenue,
    })
  );

  return { total_orders, total_cost, breakdown, total_revenue };
};
