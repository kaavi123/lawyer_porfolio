from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

app = FastAPI(title="Lawyer Portfolio API", version="1.0.0")

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Data ──────────────────────────────────────────────────────────────────────

LAWYER_INFO = {
    "name": "Advocate Rajiv Sharma",
    "title": "Senior Advocate",
    "court": "High Court of Rajasthan",
    "tagline": "Justice is not just a word — it's a commitment.",
    "bio": [
        "Advocate Rajiv Sharma is a distinguished legal practitioner enrolled with the Bar Council of Rajasthan. Appearing regularly before the High Court of Rajasthan, district courts, and various tribunals, he has built an enviable record across a wide spectrum of legal matters.",
        "His practice is grounded in a deep understanding of Indian statutory law, combined with sharp courtroom instincts developed over two decades of active litigation. Clients trust him not just for his legal acumen, but for his unwavering ethical commitment.",
    ],
    "stats": [
        {"value": "20+", "label": "Years Experience"},
        {"value": "500+", "label": "Cases Won"},
        {"value": "98%", "label": "Client Satisfaction"},
        {"value": "12", "label": "Practice Areas"},
    ],
    "credentials": [
        {"year": "2004", "text": "LLB, University of Rajasthan — Gold Medalist"},
        {"year": "2006", "text": "Enrolled, Bar Council of Rajasthan"},
        {"year": "2012", "text": "Designated Senior Advocate, High Court of Rajasthan"},
        {"year": "2019", "text": "LLM (Constitutional Law), National Law University, Jodhpur"},
    ],
    "contact": {
        "address": "Chamber No. 142, High Court Premises, Jodhpur, Rajasthan — 342001",
        "phone": "+91 98765 43210",
        "email": "adv.rajiv@rajivsharmallb.com",
        "hours": "Mon–Sat: 9:00 AM – 6:00 PM",
    },
}

PRACTICE_AREAS = [
    {"icon": "⚖️", "name": "Civil Litigation", "desc": "Property disputes, recovery suits, injunctions, partition matters, and specific performance cases handled with precision."},
    {"icon": "🏛️", "name": "Criminal Defence", "desc": "Robust defence in sessions courts and high court, including bail applications, anticipatory bail, and trial representation."},
    {"icon": "🤝", "name": "Corporate & Commercial", "desc": "Company disputes, contractual matters, NCLT proceedings, and commercial arbitration."},
    {"icon": "🏠", "name": "Property & Real Estate", "desc": "Title verification, land acquisition disputes, RERA matters, and tenant-landlord conflicts."},
    {"icon": "👨‍👩‍👧", "name": "Family & Matrimonial", "desc": "Divorce, maintenance, custody battles, domestic violence cases, and succession matters with sensitivity."},
    {"icon": "📋", "name": "Constitutional Law", "desc": "Writ petitions, fundamental rights enforcement, PIL filings, and administrative law challenges before High Court."},
]

NOTABLE_CASES = [
    {"tag": "Constitutional · 2023", "title": "Landmark PIL on Municipal Encroachment", "desc": "Successfully filed and argued a PIL challenging illegal encroachment on common land across three municipal areas, resulting in a landmark HC order.", "result": "Writ Allowed — HC of Rajasthan"},
    {"tag": "Corporate · 2022", "title": "Multi-Crore Recovery Dispute", "desc": "Represented a leading textile group in a ₹18 crore recovery suit against a defaulting distributor, securing a summary decree within 14 months.", "result": "Summary Decree — District Court, Jodhpur"},
    {"tag": "Criminal Defence · 2021", "title": "Anticipatory Bail in Sensitive Matter", "desc": "Secured anticipatory bail for a prominent businessman facing serious financial fraud allegations, establishing key precedents on pre-arrest conditions.", "result": "Bail Granted — Sessions Court"},
    {"tag": "Property · 2020", "title": "Ancestral Land Partition Case", "desc": "Successfully argued a complex multi-party ancestral property partition case spanning three generations of title documents.", "result": "Decree of Partition — Civil Court"},
]

TESTIMONIALS = [
    {"text": "Advocate Sharma fought our property case with a level of dedication I had never seen before. His knowledge of the law is extraordinary, and he explained every step to us in simple language.", "author": "Mahesh Singhvi", "role": "Business Owner, Jodhpur"},
    {"text": "When our company faced a major recovery dispute, we were worried. Rajiv ji not only resolved it efficiently but also protected our interests at every stage of the proceedings.", "author": "Priya Agarwal", "role": "Director, Agarwal Textiles"},
    {"text": "In one of the most difficult times of my life, Advocate Sharma was a pillar of strength. His calm, strategic approach in court made all the difference in my custody case.", "author": "Sunita Rathore", "role": "Client, Family Matter"},
]

# In-memory store for inquiries (use a real DB in production)
inquiries = []

# ── Models ─────────────────────────────────────────────────────────────────────

class InquiryRequest(BaseModel):
    name: str
    phone: Optional[str] = None
    email: str
    practice_area: Optional[str] = None
    description: Optional[str] = None

class InquiryResponse(BaseModel):
    success: bool
    message: str
    id: int

# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Lawyer Portfolio API is running"}

@app.get("/api/lawyer")
def get_lawyer_info():
    return LAWYER_INFO

@app.get("/api/practice-areas")
def get_practice_areas():
    return PRACTICE_AREAS

@app.get("/api/cases")
def get_notable_cases():
    return NOTABLE_CASES

@app.get("/api/testimonials")
def get_testimonials():
    return TESTIMONIALS

@app.post("/api/inquiry", response_model=InquiryResponse)
def submit_inquiry(inquiry: InquiryRequest):
    if not inquiry.name.strip():
        raise HTTPException(status_code=400, detail="Name is required")
    if not inquiry.email.strip():
        raise HTTPException(status_code=400, detail="Email is required")

    record = {
        "id": len(inquiries) + 1,
        "name": inquiry.name,
        "phone": inquiry.phone,
        "email": inquiry.email,
        "practice_area": inquiry.practice_area,
        "description": inquiry.description,
        "submitted_at": datetime.datetime.utcnow().isoformat(),
    }
    inquiries.append(record)

    return InquiryResponse(
        success=True,
        message=f"Thank you {inquiry.name}, your inquiry has been received. We will contact you within 24 hours.",
        id=record["id"],
    )

@app.get("/api/inquiries")
def get_inquiries():
    """Admin route to view all submitted inquiries."""
    return {"total": len(inquiries), "inquiries": inquiries}
