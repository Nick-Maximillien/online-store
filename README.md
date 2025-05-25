# 🌾 Smart Agrovet Webstore

An e-commerce platform for agricultural products and smart farming solutions.  
Designed to support farmers and integrate with an upcoming AI-powered agritech platform featuring crop disease detection (YOLOv8) and GPT-4 for insights.

---

## 🔗 Live Site & Repository

- 🌐 **Live Site:** [https://agrosight.netlify.app](https://agrosight.netlify.app)  
- 📁 **Frontend GitHub Repo:** [github.com/Nick-Maximillien/online-store/tree/main/frontend](https://github.com/Nick-Maximillien/online-store/tree/main/frontend)  
- 🖥 **Backend GitHub Repo:** [github.com/Nick-Maximillien/online-store/tree/main/backend](https://github.com/Nick-Maximillien/online-store/tree/main/backend)



## 📌 Overview

**Smart Agrovet** is a modern online store for:
- Farming inputs, tools, and agrochemicals
- Designed for use by farmers, agrodealers, and agritech platforms
- Future integration with AI tools for:
  - 📷 YOLOv8-based crop disease detection
  - 🤖 GPT-4 powered insights and recommendations

---

## 🛠 Tech Stack

### Frontend (Client)
- [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- Tailwind CSS for styling
- Axios for API communication
- Deployed on [Netlify](https://netlify.com)

### Backend (Server)
- [Django](https://www.djangoproject.com/) REST Framework (API)
- Django Admin as CMS
- PostgreSQL database
- Deployed on [Railway](https://railway.app)

### Assets & Storage
- [Cloudinary](https://cloudinary.com/) for image hosting and optimization

---

## 📁 Folder Structure (Frontend)

online-frontend/
├── components/ # Reusable UI elements
├── pages/ # Next.js routes (Home, Products, Contact)
├── public/ # Static assets
├── styles/ # Tailwind and global CSS
├── utils/ # API functions and helpers
├── .env.local # Environment variables
└── tsconfig.json # TypeScript config


---

## ⚙️ Getting Started Locally

### 🚀 Frontend Setup

```bash
# 1. Clone the frontend repo
git clone https://github.com/Nick-Maximillien/online-store-frontend.git
cd online-store-frontend

# 2. Install dependencies
npm install

# 3. Create a .env.local file
NEXT_PUBLIC_API_URL=https://your-django-api-url.com/api

# 4. Run locally
npm run dev
# 1. Clone the backend repo
git clone https://github.com/yourusername/smart-agrovet-backend.git
cd smart-agrovet-backend

# 2. Create a virtual environment
python -m venv env
source env/bin/activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Set environment variables (.env or settings.py)
# Configure DATABASE_URL and Cloudinary settings

# 5. Run migrations
python manage.py migrate

# 6. Create a superuser
python manage.py createsuperuser

# 7. Start the dev server
python manage.py runserver
