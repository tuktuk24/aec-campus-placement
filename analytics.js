const formatIndianCurrency = (num) => {
    const numStr = num.toFixed(2);
    const parts = numStr.split('.');
    const wholePart = parts[0];
    const decimalPart = parts[1];

    let formattedWhole = '';
    let count = 0;

    for (let i = wholePart.length - 1; i >= 0; i--) {
        formattedWhole = wholePart[i] + formattedWhole;
        count++;

        if (i > 0 && count === 3) {
            formattedWhole = ',' + formattedWhole;
        } else if (i > 0 && count > 3 && (count - 3) % 2 === 0) {
            formattedWhole = ',' + formattedWhole;
        }
    }

    return `₹${formattedWhole}.${decimalPart}`;
};

const calculateAll = (data, cancelled) => {
    let total_orders = 0;
    let total_cost = 0;
    const categoryRevenue = {};
    let total_revenue = 0;

    data.forEach(order => {
        if (!cancelled.includes(order.invoice_number)) {
            total_orders++;
            let orderCost = 0;
            let orderRevenue = order.shipping_charges || 0; // Initialize with shipping

            order.items.forEach(item => {
                const costPrice = parseFloat(item.cost_price);
                const quantity = parseInt(item.quantity);
                orderCost += costPrice * quantity;

                const sellingPrice = parseFloat(item.selling_price);
                const gstAmount = parseFloat(item.gst_amount);
                orderRevenue += sellingPrice - gstAmount;

                const category = item.category;
                const itemRevenue = sellingPrice - gstAmount;
                categoryRevenue[category] = (categoryRevenue[category] || 0) + itemRevenue;
            });

            total_cost += orderCost + (order.packaging_cost || 0) + (order.labelling_cost || 0);
            total_revenue += orderRevenue;
        }
    });

    const breakdown = Object.entries(categoryRevenue).map(([category, revenue]) => ({
        category: category,
        revenue: formatIndianCurrency(revenue),
    }));

    return { total_orders, total_cost: formatIndianCurrency(total_cost), breakdown, total_revenue: formatIndianCurrency(total_revenue) };
};

const fetchCancelledOrders = () => {
    return new Promise((resolve, reject) => {
        fetch('cancelled_invoices.csv')
            .then(response => response.text())
            .then(csvText => {
                const cancelledInvoiceNumbers = csvText.split('\n').map(line => line.trim()).filter(item => item !== "");
                resolve(cancelledInvoiceNumbers);
            })
            .catch(error => reject(error));
    });
};

fetch("sale_data.json")
    .then((res) => res.json())
    .then((data) => {
        fetchCancelledOrders()
            .then(cancelled => {
                const { total_orders, total_cost, breakdown, total_revenue } = calculateAll(data, cancelled);

                document.getElementById("total_orders").innerHTML = total_orders;
                document.getElementById("total_cost").innerHTML = total_cost;
                document.getElementById("total_revenue").innerHTML = total_revenue;

                const box = document.getElementById("breakdown");
                box.innerHTML = ''; // Clear the initial "TEST" value
                breakdown.forEach((item) => {
                    const row = document.createElement("p");
                    row.innerHTML = `${item?.category} = ${item?.revenue}`;
                    box.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching or parsing cancelled orders:", error));
    })
    .catch(error => {
        console.error("Error fetching or processing data:", error);
    });