from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

from sklearn.metrics.pairwise import cosine_similarity
from bson import ObjectId
from dotenv import load_dotenv
import numpy as np
import os

# 1) Load .env
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("Missing MONGO_URI in environment")

# 2) Initialize services
app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")
client = MongoClient(MONGO_URI)
db = client["sparkthon"]

# 3) Pydantic model for the request
class RecRequest(BaseModel):
    twin_id: str
    top_k: int = 5

# 4) Helper to combine product text
def generate_embedding_text(p):
    return " ".join([
        p.get("name", ""),
        p.get("description", ""),
        " ".join(p.get("tags", [])),
        p.get("style_vibe", ""),
        p.get("brand", "")
    ])

@app.post("/recommend")
def recommend(req: RecRequest):
    # --- Fetch Twin ---
    twin = db.twins.find_one({"_id": ObjectId(req.twin_id)})
    if not twin:
        raise HTTPException(status_code=404, detail="Twin not found")

    prompt = twin.get("description", "")
    interests = twin.get("interestsHobbies", [])
    style_vibe = (twin.get("personalityVibe") or [""])[0]
    prompt_embedding = model.encode(prompt) if prompt else None

    # --- Fetch Products ---
    products = list(db.products.find())

    def match_score(p):
        # 1) Ensure product embedding
        emb = p.get("embedding")
        if not emb:
            text = generate_embedding_text(p)
            emb = model.encode(text).tolist()
            db.products.update_one({"_id": p["_id"]}, {"$set": {"embedding": emb}})

        # 2) Cosine similarity (50%)
        score = 0.0
        if prompt_embedding is not None:
            # wrap in numpy arrays of shape (1, dim)
            a = np.array(prompt_embedding).reshape(1, -1)
            b = np.array(emb).reshape(1, -1)
            sim = float(cosine_similarity(a, b)[0][0])
            score += 0.5 * sim

        # 3) Style/vibe match (20%)
        if style_vibe and p.get("style_vibe") and style_vibe.lower() in p["style_vibe"].lower():
            score += 0.2

        # 4) Interest/tag match (30%)
        lower_tags = [t.lower() for t in p.get("tags", [])]
        if any(i.lower() in lower_tags for i in interests):
            score += 0.3

        return score

    # --- Score & Sort ---
    scored = sorted(products, key=match_score, reverse=True)[: req.top_k]

    # --- Format Output ---
    out = []
    for p in scored:
        out.append({
            "product_id": p.get("product_id"),
            "name": p.get("name"),
            "price": p.get("price"),
            "brand": p.get("brand"),
            "image": p.get("image_url"),
            "url": p.get("product_url"),
            "match_score": round(match_score(p), 3)
        })

    return out
