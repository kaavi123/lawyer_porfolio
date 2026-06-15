# Lawyer Portfolio — React + Python (FastAPI)

A full-stack lawyer portfolio website with a React frontend and FastAPI backend.

## Project Structure

```
lawyer-portfolio/
├── backend/
│   ├── main.py           # FastAPI app (API routes + data)
│   └── requirements.txt  # Python dependencies
│
└── frontend/
    ├── index.html
    ├── vite.config.js    # Dev proxy: /api → http://localhost:8000
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── hooks/
        │   └── useApi.js        # Axios API hook + submitInquiry
        └── components/
            ├── Navbar.jsx / .module.css
            ├── Hero.jsx / .module.css
            ├── About.jsx / .module.css
            ├── Practice.jsx / .module.css
            ├── Cases.jsx / .module.css
            ├── Testimonials.jsx / .module.css
            ├── Contact.jsx / .module.css
            └── Footer.jsx / .module.css
```

## API Endpoints

| Method | Route               | Description                        |
|--------|---------------------|------------------------------------|
| GET    | /api/lawyer         | Lawyer info, stats, credentials    |
| GET    | /api/practice-areas | List of practice areas             |
| GET    | /api/cases          | Notable case results               |
| GET    | /api/testimonials   | Client testimonials                |
| POST   | /api/inquiry        | Submit contact form inquiry        |
| GET    | /api/inquiries      | Admin: view all submitted forms    |

## Setup & Run

### 1. Backend (Python 3.10+)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API will be live at: http://localhost:8000  
Swagger docs at: http://localhost:8000/docs

### 2. Frontend (Node 18+)

```bash
cd frontend
npm install
npm run dev
```

Site will be live at: http://localhost:5173

> Vite proxies `/api/*` to `http://localhost:8000` automatically.

## Customization

- **Lawyer details**: Edit the `LAWYER_INFO`, `PRACTICE_AREAS`, `NOTABLE_CASES`, `TESTIMONIALS` dicts in `backend/main.py`
- **Styling**: Each component has its own `.module.css` file — colors/fonts are CSS variables in `src/index.css`
- **Real database**: Replace the in-memory `inquiries = []` list in `main.py` with SQLite/PostgreSQL using SQLAlchemy

## Production

```bash
# Build frontend
cd frontend && npm run build

# Serve static files via FastAPI
# Add StaticFiles mounting to main.py and serve dist/ folder
```
