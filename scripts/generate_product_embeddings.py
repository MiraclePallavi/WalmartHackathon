import os
from pymongo import MongoClient
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
openai = OpenAI(api_key=OPENAI_API_KEY)

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["sparkthon"]
products = db.products

# Function to create embedding
def create_embedding(text):
    try:
        response = openai.embeddings.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        print("Embedding error:", e)
        return None

# Process each product
for product in products.find({"embedding": {"$exists": False}}):
    combined_text = " ".join([
        product.get("name", ""),
        product.get("description", ""),
        " ".join(product.get("tags", [])),
        product.get("style_vibe", ""),
        product.get("brand", "")
    ])

    embedding = create_embedding(combined_text)
    if embedding:
        products.update_one(
            {"_id": product["_id"]},
            {"$set": {"embedding": embedding}}
        )
        print(f"✅ Embedded and saved: {product.get('name')}")
    else:
        print(f"❌ Failed embedding: {product.get('name')}")
