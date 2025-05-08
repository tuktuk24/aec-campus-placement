document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, starting data fetch");
    
    
    fetch("sale_data.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(HTTP error! Status: ${res.status}, URL: ${res.url});
            }
            console.log("JSON data fetched successfully");
            return res.json();
        })
        .then(data => {
            console.log("JSON data parsed successfully");
            
          
            return fetch("cancelled_invoices.csv")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(HTTP error! Status: ${response.status}, URL: ${response.url});
                    }
                    console.log("CSV data fetched successfully");
                    return response.text();
                })
                .then(csv => {
                    console.log("CSV data parsed successfully");
                    
                    
                    processData(data, csv);
                });
        })
        .catch(error => {
            console.error("Error loading data:", error);
            document.getElementById("total_orders").innerHTML = "Error loading data";
            document.getElementById("total_cost").innerHTML = "Error loading data";
            document.getElementById("total_revenue").innerHTML = "Error loading data";
            document.getElementById("breakdown").innerHTML = Error: ${error.message};
        });
});

function processData(data, csv) {
    
    const cancelled = csv.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    console.log(Processed ${cancelled.length} cancelled orders);
    
    
    const { total_orders, total_cost, breakdown, total_revenue } =
        calculateAll(data, cancelled);
    
    
    document.getElementById("total_orders").innerHTML = total_orders;
    document.getElementById("total_cost").innerHTML = ₹${total_cost.toLocaleString('en-IN', {maximumFractionDigits: 2})};
    document.getElementById("total_revenue").innerHTML = ₹${total_revenue.toLocaleString('en-IN', {maximumFractionDigits: 2})};
    
    const box = document.getElementById("breakdown");
    box.innerHTML = ""; 
    
    breakdown.forEach((item) => {
        const row = document.createElement("p");
        row.innerHTML = ${item.category}: ₹${parseFloat(item.revenue).toLocaleString('en-IN', {maximumFractionDigits: 2})};
        box.appendChild(row);
    });
    
    console.log("UI updated with all data");
}

function calculateAll(data, cancelled) {
    
    const validOrders = data.filter(order => !cancelled.includes(order.invoice_number));
    
    console.log(Found ${validOrders.length} valid orders after filtering out cancelled orders);
    
    // 1. Total number of valid orders
    let total_orders = validOrders.length;
    
    // 2. Calculate total cost
    let total_cost = 0;
    validOrders.forEach(order => {
        
        const itemsCost = order.items.reduce((sum, item) => {
            
            const cost = parseFloat(item.cost_price) || 0;
            const qty = parseInt(item.quantity) || 0;
            return sum + (cost * qty);
        }, 0);
        
        
        const packaging = parseFloat(order.packaging_cost) || 0;
        const labelling = parseFloat(order.labelling_cost) || 0;
        total_cost += itemsCost + packaging + labelling;
    });
    
    // 3. Breakdown of category-wise revenue
    
    const categoryRevenue = new Map();
    
    validOrders.forEach(order => {
        order.items.forEach(item => {
            
            const sp = parseFloat(item.selling_price) || 0;
            const gst = parseFloat(item.gst) || 0;
            const qty = parseInt(item.quantity) || 0;
            
           
            const itemRevenue = (sp - gst) * qty;
            
            
            if (categoryRevenue.has(item.category)) {
                categoryRevenue.set(item.category, 
                    categoryRevenue.get(item.category) + itemRevenue);
            } else {
                categoryRevenue.set(item.category, itemRevenue);
            }
        });
    });
    
  
    let breakdown = Array.from(categoryRevenue.entries()).map(([category, revenue]) => ({
        category,
        revenue: revenue.toFixed(2)
    }));
    
    
    breakdown.sort((a, b) => a.category.localeCompare(b.category));
    
    // 4. Calculate total revenue
    let total_revenue = 0;
    validOrders.forEach(order => {
        
        const itemsRevenue = order.items.reduce((sum, item) => {
            // Ensure values are numbers
            const sp = parseFloat(item.selling_price) || 0;
            const gst = parseFloat(item.gst) || 0;
            const qty = parseInt(item.quantity) || 0;
            
            return sum + ((sp - gst) * qty);
        }, 0);
        
        
        const shipping = parseFloat(order.shipping_cost) || 0;
        total_revenue += itemsRevenue + shipping;
    });
    
    return {
        total_orders,
        total_cost: parseFloat(total_cost.toFixed(2)),
        breakdown,
        total_revenue: parseFloat(total_revenue.toFixed(2))
    };
}