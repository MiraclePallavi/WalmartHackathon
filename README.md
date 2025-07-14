# 🛒 TwinCart

**TwinCart** is a smarter, more personal shopping assistant designed for people who don’t just shop for themselves — but also for friends, family, partners, or anyone they care about.

With TwinCart, users can create “twin” profiles of the people they shop for regularly, and receive AI-powered, personalized product recommendations tailored to each twin’s preferences.

---

## 🌟 Features

- 🔐 **User Authentication** with Appwrite
- 🧑‍🤝‍🧑 **Create and manage Twin profiles**
  - Name, relationship, description
  - Style vibe, interests, budget, favorite colors
  - Special occasion tagging (e.g., birthday twin)
- 🎯 **Personalized product recommendations**
  - Based on semantic similarity and preference matching
- 🛍️ **Avoid duplicate purchases** with purchase history filtering
- 🧠 **Recommendation Engine using Sentence Transformers**
- 📦 **MongoDB-backed product and twin data storage**
- 📱 **Modern UI** with Next.js, Tailwind CSS, and shadcn/ui

---

## 🧠 How It Works

1. **User signs in** and creates twins (people they shop for).
2. **Each twin** has a profile capturing style, vibe, hobbies, budget, etc.
3. When shopping, the user selects a twin.
4. TwinCart’s backend:
   - Embeds the twin's profile using `all-MiniLM-L6-v2`
   - Embeds product descriptions and tags
   - Calculates match scores using:
     - 50% semantic similarity
     - 20% style vibe alignment
     - 30% interest/tag overlap
   - Filters out already purchased products
5. **Curated recommendations** are served to the frontend for a seamless experience.

---

## 🧰 Tech Stack

| Tech              | Purpose                             |
|-------------------|-------------------------------------|
| **Next.js**       | Frontend framework                  |
| **Tailwind CSS**  | Styling                             |
| **shadcn/ui**     | Component library                   |
| **Appwrite**      | User authentication & session mgmt |
| **FastAPI**       | Backend recommendation logic        |
| **MongoDB**       | Data storage for users, twins, products |
| **Sentence Transformers** | Embedding generation using `all-MiniLM-L6-v2` |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/twincart.git
cd twincart
