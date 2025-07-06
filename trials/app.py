import streamlit as st

# Shopper profile
shopper = {
    "name": "Aanya Sharma",
    "age": 25,
    "gender": "Female",
    "past_purchases": [
        "Organic Green Tea",
        "Yoga Mat",
        "Bluetooth Earbuds",
        "Minimalist Notebook",
        "Sustainable Tote Bag"
    ]
}

# Product list
products = [
    {
        "product_id": 101,
        "name": "Organic Green Tea",
        "category": "Beverages",
        "tags": ["organic", "healthy", "tea", "wellness"],
        "price": 299
    },
    {
        "product_id": 102,
        "name": "Resistance Bands Set",
        "category": "Fitness",
        "tags": ["fitness", "exercise", "home gym", "training"],
        "price": 499
    },
    {
        "product_id": 103,
        "name": "Bluetooth Earbuds",
        "category": "Electronics",
        "tags": ["music", "wireless", "gadgets", "tech", "electronics"],
        "price": 1299
    },
    {
        "product_id": 104,
        "name": "Sustainable Tote Bag",
        "category": "Lifestyle",
        "tags": ["eco-friendly", "bags", "fashion", "reusable"],
        "price": 399
    },
    {
        "product_id": 105,
        "name": "Face Serum - Vitamin C",
        "category": "Beauty",
        "tags": ["skincare", "vitamin c", "glow", "self-care"],
        "price": 699
    },
    {
        "product_id": 106,
        "name": "Yoga Mat",
        "category": "Fitness",
        "tags": ["fitness", "yoga", "mat", "exercise"],
        "price": 999
    },
    {
        "product_id": 107,
        "name": "Minimalist Notebook",
        "category": "Stationery",
        "tags": ["writing", "journaling", "minimal", "paper"],
        "price": 249
    },
    {
        "product_id": 108,
        "name": "Wireless Neck Massager",
        "category": "Wellness",
        "tags": ["relaxation", "tech", "self-care", "pain relief"],
        "price": 1799
    },
    {
        "product_id": 109,
        "name": "Floral Midi Dress",
        "category": "Fashion",
        "tags": ["clothing", "feminine", "summer", "dress"],
        "price": 1199
    }
]

# Extract all valid tags from products
all_tags = set(tag for product in products for tag in product["tags"])

# Extract only valid tags from prompt
def extract_keywords(prompt):
    return [word.lower() for word in prompt.lower().split() if word.lower() in all_tags]

# Recommend function with improved logic
def recommend(prompt, shopper, product_list):
    prompt_tags = extract_keywords(prompt)
    prompt_lower = prompt.lower()
    recommendations = []

    for product in product_list:
        score = 0

        # Tag match
        if any(tag in product['tags'] for tag in prompt_tags):
            score += 2

        # Category match from prompt
        if product["category"].lower() in prompt_lower:
            score += 2

        # Boost if similar to past purchases
        for item in shopper["past_purchases"]:
            if item.lower() in product["name"].lower():
                score += 1
            if any(word.lower() in product['tags'] for word in item.lower().split()):
                score += 1

        if score > 1:
            recommendations.append((score, product))

    recommendations.sort(reverse=True, key=lambda x: x[0])
    return [rec[1] for rec in recommendations]

# ---------- UI ----------
st.set_page_config(page_title="Twin Cart | AI Shopping Assistant", layout="centered")
st.title("🛍️ Twin Cart — Smart Prompt Recommender")

st.subheader(f"👤 Shopper: {shopper['name']} ({shopper['age']}, {shopper['gender']})")
with st.expander("🛒 Past Purchases"):
    for item in shopper["past_purchases"]:
        st.markdown(f"- {item}")

st.markdown("---")
prompt = st.text_input("💬 Enter a prompt (e.g., Recommend some wellness or skincare items):")

if prompt:
    results = recommend(prompt, shopper, products)
    if results:
        st.success(f"✅Product(s) matched your prompt!")
        for product in results:
            if(product['name'] not in shopper["past_purchases"]):

                st.markdown(f"""
                ### 🛒 {product['name']}
                - **Category:** {product['category']}
                - **Tags:** `{' | '.join(product['tags'])}`
                - 💰 **Price:** ₹{product['price']}
            """)
            st.markdown("---")
    else:
        st.warning("😕 No matching products found. Try a different prompt.")
