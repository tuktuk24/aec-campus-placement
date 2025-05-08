
import json
import csv
from collections import defaultdict

def load_cancelled_orders(cancelled_invoices.csv):
    """Read cancelled order invoice numbers from CSV file."""
    cancelled_invoices = set()
    with open(csv_file, 'r', newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            cancelled_invoices.add(row['invoice_numbers'])
    return cancelled_invoices

def calculate_order_metrics(json_file, cancelled_invoices.csv):
    """Calculate required metrics from orders JSON and cancelled orders CSV."""
    # Load cancelled orders
    cancelled_invoices = load_cancelled_orders(cancelled_invoices.csv)
    
    # Load dispatched orders
    with open(json_file, 'r') as f:
        orders = json.load(f)
    
    # Filter valid orders
    valid_orders = [order for order in orders if order['invoice_number'] not in cancelled_invoices]
    
    # Initialize metrics
    total_valid_orders = len(valid_orders)
    total_cost = 0
    category_revenue = defaultdict(float)
    total_revenue = 0
    
    # Process each valid order
    for order in valid_orders:
        # Calculate item costs and revenues
        item_cost = 0
        item_revenue = 0
        for item in order['items']:
            item_cost += item['cost_price']
            item_revenue += item['selling_price'] - item['gst']
            # Accumulate category-wise revenue
            category_revenue[item['category']] += item['selling_price'] - item['gst']
        
        # Add packaging and labelling cost to total cost
        order_cost = item_cost + order['packaging_labelling_cost']
        total_cost += order_cost
        
        # Add shipping cost to total revenue
        order_revenue = item_revenue + order['shipping_cost']
        total_revenue += order_revenue
    
    # Multiply total cost by number of valid orders
    total_cost *= total_valid_orders
    
    # Format results
    result = {
        "Total Valid Orders": total_valid_orders,
        "Total Cost": round(total_cost, 2),
        "Category-wise Revenue": {cat: round(rev, 2) for cat, rev in category_revenue.items()},
        "Total Revenue": round(total_revenue, 2)
    }
    
    return result

def main():
    json_file = "orders.json"  # Replace with actual JSON file path
    csv_file = "cancelled_orders.csv"  # Replace with actual CSV file path
    
    try:
        results = calculate_order_metrics(json_file, csv_file)
        
        # Print results
        print("Order Calculations:")
        print(f"Total Valid Orders: {results['Total Valid Orders']}")
        print(f"Total Cost: {results['Total Cost']}")
        print("Category-wise Revenue:")
        for category, revenue in results['Category-wise Revenue'].items():
            print(f"  {category}: {revenue}")
        print(f"Total Revenue: {results['Total Revenue']}")
        
    except FileNotFoundError as e:
        print(f"Error: File not found - {e}")
    except KeyError as e:
        print(f"Error: Missing key in data - {e}")
    except Exception as e:
        print(f"Error: {e}")

if _name_ == "_main_":
    main()