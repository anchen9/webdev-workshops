from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

grocery_data = {
    "Costco": ["eggs", "bacon", "rice"],
    "Walmart": ["pencils", "erasers", "tape"]
}

# renders app
@app.route("/") 
def home():
    return render_template("index.html")

# returns entire dictionary
@app.route("/api/grocery", methods=["GET"])
def get_grocery_list():
    return jsonify(grocery_data)

# returns list for specific store
@app.route("/api/grocery/<store>", methods=["GET"])
def get_store_grocery(store):
    store = store.capitalize() 
    if store in grocery_data:
        return jsonify({store: grocery_data[store]})
    return jsonify({"error": "Store not found"}), 404

# handles adding an item to the store
@app.route("/api/grocery", methods=["POST"])
def add_grocery_item():
    data = request.json

    if not data or "store" not in data or "item" not in data:
        return jsonify({"error": "Missing 'store' or 'item' in request"}), 400

    store = data["store"].capitalize()
    item = data["item"]

    if store not in grocery_data:
        grocery_data[store] = []

    grocery_data[store].append(item)

    return jsonify({"message": f"Added {item} to {store}", "data": grocery_data})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
