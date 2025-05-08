Promise.all([
    fetch("sale_data.json").then((response) => response.json()),
    fetch("cancelled_invoices.csv").then((response) => response.text())
])
.then(([orderData, csvData]) => {
    
    // Extracting cancelled invoice numbers
    const cancelledInvoices = csvData
        .trim()
        .split("\n")
        .slice(1)  // Skip the header
        .map(line => line.trim());

    // Perform calculations
    const { numberOfOrders, totalPrice, revenueBreakdown, overallRevenue } = processOrders(orderData, cancelledInvoices);

    // Display results in HTML
    document.getElementById("total_orders").textContent = numberOfOrders;
    document.getElementById("total_cost").textContent = totalPrice.toFixed(2);
    document.getElementById("total_revenue").textContent = overallRevenue.toFixed(2);

    // Display category-wise revenue breakdown
    const breakdownContainer = document.getElementById("breakdown");
    revenueBreakdown.forEach((item) => {
        const breakdownItem = document.createElement("p");
        breakdownItem.textContent = `${item.category}: ₹${item.revenue.toFixed(2)}`;
        breakdownContainer.appendChild(breakdownItem);
    });
});

const processOrders = (orders, cancelledInvoices) => {
    let orderCount = 0;
    let totalAmount = 0;
    let totalRevenue = 0;
    let categoryRevenueMap = new Map();

    // Loop through each order and calculate total costs and revenue
    orders.forEach(order => {
        // Skip cancelled orders
        if (cancelledInvoices.includes(order.invoice_number)) return;

        orderCount++;

        let orderTotalCost = order.labelling_cost + order.packaging_cost;
        let orderTotalRevenue = order.shipping_charges;

        // Process each item in the order
        order.items.forEach(item => {
            const costPrice = parseFloat(item.cost_price);
            const sellingPrice = parseFloat(item.selling_price);
            const gst = parseFloat(item.gst_amount);
            const quantity = item.quantity;
            const productCategory = item.category;

            orderTotalCost += costPrice * quantity;
            orderTotalRevenue += (sellingPrice - gst) * quantity;

            // Update category revenue
            let categoryRevenue = categoryRevenueMap.get(productCategory) || 0;
            categoryRevenueMap.set(productCategory, categoryRevenue + (sellingPrice - gst) * quantity);
        });

        totalAmount += orderTotalCost;
        totalRevenue += orderTotalRevenue;
    });

    // Prepare the category-wise revenue breakdown
    const revenueDetails = Array.from(categoryRevenueMap.entries()).map(([category, revenue]) => ({
        category,
        revenue
    }));

    return { numberOfOrders: orderCount, totalPrice: totalAmount, revenueBreakdown: revenueDetails, overallRevenue: totalRevenue };
};
