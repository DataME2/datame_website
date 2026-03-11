# DataManagementEngineer.com - PRD

## Original Problem Statement
Design a comprehensive website for datamanagementengineer.com to transform it from a resume site into a high-authority hub for "Data Strategy as a Business Asset." Position the owner as an expert balancing Data Defense (Governance, Privacy, Risk) with Data Offense (Lakehouse Migration, AI/ML Pipelines, Monetization).

## User Personas
- **CTOs/VPs of Engineering**: Evaluating data strategy consultants for enterprise transformation
- **Data Leaders**: Seeking expert guidance on migration, governance, and cloud optimization
- **Enterprise Decision Makers**: Looking for proven results and case study evidence

## Core Requirements
- High-conversion sitemap with Insights hub, Services (Offense/Defense), Case Studies library
- Content strategy across 3 pillars: Legacy Modernization, Cloud Optimization, Strategic Governance
- Lead Magnet: Data Strategy Maturity Assessment email capture
- Case Study Template for complex projects
- Brand: DataMe, colors #ff6f28, gradient linear-gradient(90deg, #ff8200, #2274df)

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB
- **Pages**: Home, Services (Tabs: Offense/Defense), Insights (3 pillars), Case Studies (filterable), Case Study Detail

## What's Been Implemented (Dec 2025)
- Full-stack website with all 5 pages + case study detail template
- Navbar with dropdown, mobile menu, CTAs
- Hero with Data Defense/Offense messaging and strategy score card
- Stats bar (15+ years, 70% gains, 3M+ users, 4 platforms)
- Services overview (Offense: Migration, AI/ML, Monetization | Defense: Governance, Privacy, Risk)
- Services page with Tabs (Offense/Defense), Cloud Platforms section
- Insights hub with 8 articles across 3 pillars with tab filtering
- Case Studies library with 6 case studies, category filtering, featured/regular cards
- 6 detailed case study pages (Challenge, Approach, Results, Testimonial, Key Takeaways)
- Lead Magnet dialog with email capture form (stores to MongoDB)
- Contact form API endpoint
- Email validation on backend
- Footer with service links, resources, platform tags
- Responsive design, brand gradient accents, Outfit + Plus Jakarta Sans fonts

## Prioritized Backlog
### P0
- All core features implemented ✅

### P1
- Blog/article detail page (currently insight cards are static)
- Admin panel for managing leads/contacts
- Contact form page

### P2
- SEO meta tags and Open Graph
- Analytics integration
- PDF download for the maturity assessment
- Animation polish (scroll-triggered reveals)
- Testimonials carousel
- Newsletter integration (SendGrid/Mailchimp)

## Next Tasks
1. Add article detail pages for Insights
2. Build admin dashboard for leads management
3. Add contact form page
4. SEO optimization
5. Add actual PDF for the maturity assessment download
