from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
import re
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class LeadCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    role: Optional[str] = None
    interest: str = "maturity_assessment"

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    role: Optional[str] = None
    interest: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Wiki Article Models
class WikiArticleCreate(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    category: str = "General"
    tags: List[str] = []
    author: str = "DataMe"
    read_time: Optional[str] = None
    featured_image_url: Optional[str] = None
    published: bool = True

class WikiArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    author: Optional[str] = None
    read_time: Optional[str] = None
    featured_image_url: Optional[str] = None
    published: Optional[bool] = None

class WikiArticle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: Optional[str] = None
    category: str = "General"
    tags: List[str] = []
    author: str = "DataMe"
    read_time: Optional[str] = None
    featured_image_url: Optional[str] = None
    published: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str
    service_interest: Optional[str] = None

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    message: str
    service_interest: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# Routes
@api_router.get("/")
async def root():
    return {"message": "DataMe API is running"}

@api_router.post("/leads", response_model=Lead)
async def create_lead(input_data: LeadCreate):
    lead = Lead(**input_data.model_dump())
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    return lead

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    return leads

@api_router.post("/contact", response_model=Contact)
async def create_contact(input_data: ContactCreate):
    contact = Contact(**input_data.model_dump())
    doc = contact.model_dump()
    await db.contacts.insert_one(doc)
    return contact

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts


# Wiki Article Routes
@api_router.post("/wiki/articles", response_model=WikiArticle)
async def create_wiki_article(input_data: WikiArticleCreate):
    article = WikiArticle(**input_data.model_dump())
    doc = article.model_dump()
    await db.wiki_articles.insert_one(doc)
    return article

@api_router.get("/wiki/articles", response_model=List[WikiArticle])
async def get_wiki_articles(category: Optional[str] = None, published_only: bool = True):
    query = {}
    if category and category != "All":
        query["category"] = category
    if published_only:
        query["published"] = True
    articles = await db.wiki_articles.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return articles

@api_router.get("/wiki/articles/all", response_model=List[WikiArticle])
async def get_all_wiki_articles():
    articles = await db.wiki_articles.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return articles

@api_router.get("/wiki/articles/{article_id}", response_model=WikiArticle)
async def get_wiki_article(article_id: str):
    article = await db.wiki_articles.find_one({"id": article_id}, {"_id": 0})
    if not article:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@api_router.put("/wiki/articles/{article_id}", response_model=WikiArticle)
async def update_wiki_article(article_id: str, input_data: WikiArticleUpdate):
    update_data = {k: v for k, v in input_data.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.wiki_articles.update_one({"id": article_id}, {"$set": update_data})
    if result.matched_count == 0:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Article not found")
    article = await db.wiki_articles.find_one({"id": article_id}, {"_id": 0})
    return article

@api_router.delete("/wiki/articles/{article_id}")
async def delete_wiki_article(article_id: str):
    result = await db.wiki_articles.delete_one({"id": article_id})
    if result.deleted_count == 0:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted successfully"}

@api_router.get("/wiki/categories")
async def get_wiki_categories():
    categories = await db.wiki_articles.distinct("category")
    return categories


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
