fetch("sale_data.json")
    .then((res) => res.json())
    .then((data) => {
        let cancelled = [];
        // GET cancelled from the csv file (an array of invoice_numbers)
        const { total_orders, total_cost, breakdown, total_revenue } =
            calculateAll(data, cancelled);

        document.getElementById("total_orders").innerHTML = total_orders;
        document.getElementById("total_cost").innerHTML = total_cost;
        document.getElementById("total_revenue").innerHTML = total_revenue;

        const box = document.getElementById("breakdown");
        breakdown.forEach((item) => {
            const row = document.createElement("p");
            row.innerHTML = `${item?.category} = ${item?.revenue}`;
            box.appendChild(row);
        });
    });

const calculateAll = (data, cancelled) => {
    let total_orders = 0;
    let total_cost = 0;
    let breakdown = [{ category: "TEST", revenue: "10000.00" }];
    let total_revenue = 0;
    // Write he
    

    return { total_orders, total_cost, breakdown, total_revenue };
};

