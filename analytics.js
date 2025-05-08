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

fetch("sale_data.json")
    .then((res) => res.json())
    .then((data) => {
        fetch("canceled_invoices.csv")
            .then((res) => res.text())
            .then((csvText) => {
                const cancelled = csvText.trim().split('\n');
                
                const { total_orders, total_cost, breakdown, total_revenue } =
                    calculateAll(data, cancelled);
                
                document.getElementById("total_orders").innerHTML = total_orders;
                document.getElementById("total_cost").innerHTML = formatIndianCurrency(total_cost);
                document.getElementById("total_revenue").innerHTML = formatIndianCurrency(total_revenue);
                
                const box = document.getElementById("breakdown");
                breakdown.forEach((item) => {
                    const row = document.createElement("p");
                    row.innerHTML = `${item.category} = ${formatIndianCurrency(item.revenue)}`;
                    box.appendChild(row);
                });
            });
    });

const calculateAll = (data, cancelled) => {
    const validOrders = data.filter(order => !cancelled.includes(order.invoice_number));

    const total_orders = validOrders.length;

    let total_cost = 0;
    validOrders.forEach(order => {

        const itemsCost = order.items.reduce((sum, item) => {
            return sum + (parseFloat(item.cost_price) * item.quantity);
        }, 0);

        total_cost += itemsCost + (order.packaging_cost || 0) + (order.labelling_cost || 0);
    });
    

    const categoryRevenue = {};
    validOrders.forEach(order => {
        order.items.forEach(item => {
            if (!item.category) return; 
            
            const category = item.category;
            const itemRevenue = (parseFloat(item.selling_price) - (item.gst_amount || 0)) * item.quantity;
            
            if (!categoryRevenue[category]) {
                categoryRevenue[category] = 0;
            }
            
            categoryRevenue[category] += itemRevenue;
        });
    });
    

    const breakdown = Object.keys(categoryRevenue).map(category => ({
        category,
        revenue: categoryRevenue[category]
    }));

    let total_revenue = 0;
    validOrders.forEach(order => {

        const itemsRevenue = order.items.reduce((sum, item) => {
            return sum + (parseFloat(item.selling_price) - (item.gst_amount || 0)) * item.quantity;
        }, 0);
        

        total_revenue += itemsRevenue + (order.shipping_charges || 0);
    });
    
    return { total_orders, total_cost, breakdown, total_revenue };
};