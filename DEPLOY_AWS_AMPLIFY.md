# DataManagementEngineer.com — AWS Amplify Deployment Guide

This guide walks you through deploying the **DataMe** website (React frontend + FastAPI backend + MongoDB) on AWS Amplify with a supporting backend infrastructure.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  AWS Amplify                     │
│            (Frontend - React App)                │
│         datamanagementengineer.com               │
└──────────────────┬──────────────────────────────┘
                   │ API calls
                   ▼
┌─────────────────────────────────────────────────┐
│       AWS EC2 / ECS / App Runner / Lambda        │
│           (Backend - FastAPI Server)             │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│          MongoDB Atlas (Cloud Database)           │
│              OR self-hosted on EC2               │
└─────────────────────────────────────────────────┘
```

> **Important:** AWS Amplify natively hosts **static/SPA frontends**. The FastAPI backend must be deployed separately (EC2, ECS, App Runner, or Lambda). This guide covers both.

---

## Prerequisites

- AWS Account with admin access
- GitHub/GitLab/Bitbucket repo with your code
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed
- [Node.js 18+](https://nodejs.org/) and Yarn installed locally
- A MongoDB Atlas account (free tier works) — [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## Part 1: Prepare Your Code for Deployment

### 1.1 Project Structure

Ensure your repo has this structure:

```
/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env              ← DO NOT commit this (add to .gitignore)
├── frontend/
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── .env              ← DO NOT commit this
└── README.md
```

### 1.2 Update Frontend Environment Variable

In `frontend/.env`, the `REACT_APP_BACKEND_URL` must point to your **deployed backend URL** (you'll get this after deploying the backend):

```
REACT_APP_BACKEND_URL=https://api.datamanagementengineer.com
```

### 1.3 Add `.gitignore` Entries

```gitignore
# Environment files
backend/.env
frontend/.env

# Dependencies
node_modules/
__pycache__/
*.pyc
```

### 1.4 Create `frontend/amplify.yml` Build Spec

Create this file at the root of your repo (or configure in Amplify Console):

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - cd frontend
            - yarn install --frozen-lockfile
        build:
          commands:
            - cd frontend
            - yarn build
      artifacts:
        baseDirectory: frontend/build
        files:
          - '**/*'
      cache:
        paths:
          - frontend/node_modules/**/*
    appRoot: /
```

---

## Part 2: Set Up MongoDB Atlas

### 2.1 Create a Free Cluster

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free **M0 Shared Cluster**
3. Choose **AWS** as the cloud provider and select a region close to your backend (e.g., `us-east-1`)
4. Click **Create Cluster**

### 2.2 Configure Access

1. **Database Access** → Add a database user:
   - Username: `datame_admin`
   - Password: Generate a strong password — **save this**
   - Role: `readWriteAnyDatabase`

2. **Network Access** → Add IP addresses:
   - For development: Add your current IP
   - For production: Add your backend server's IP or `0.0.0.0/0` (allow all — restrict later)

### 2.3 Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string. It looks like:

```
mongodb+srv://datame_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. Replace `<password>` with your actual password
5. Append your database name:

```
mongodb+srv://datame_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/datame_production?retryWrites=true&w=majority
```

---

## Part 3: Deploy the Backend (FastAPI)

You have several options. Here are the two most common:

### Option A: AWS App Runner (Recommended — Simplest)

AWS App Runner is the easiest way to deploy a containerized backend.

#### 3A.1 Create a `Dockerfile` in `backend/`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

#### 3A.2 Push to ECR (Elastic Container Registry)

```bash
# Authenticate Docker with ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Create ECR repository
aws ecr create-repository --repository-name datame-backend --region us-east-1

# Build and push
cd backend
docker build -t datame-backend .
docker tag datame-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/datame-backend:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/datame-backend:latest
```

#### 3A.3 Create App Runner Service

1. Go to **AWS App Runner** in the console
2. **Source**: Choose **Container registry** → **Amazon ECR**
3. Select your `datame-backend` image
4. **Service settings**:
   - Port: `8001`
   - CPU: 1 vCPU, Memory: 2 GB (adjust as needed)
5. **Environment variables** (add these):

| Key | Value |
|-----|-------|
| `MONGO_URL` | `mongodb+srv://datame_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/datame_production?retryWrites=true&w=majority` |
| `DB_NAME` | `datame_production` |
| `CORS_ORIGINS` | `https://datamanagementengineer.com,https://www.datamanagementengineer.com` |
| `ADMIN_PASSWORD` | `Brisbane2026$` |

6. Click **Create & Deploy**
7. Note the App Runner URL (e.g., `https://xxxxxxxx.us-east-1.awsapprunner.com`)

#### 3A.4 (Optional) Add Custom Domain

1. In App Runner → your service → **Custom domains**
2. Add `api.datamanagementengineer.com`
3. Add the provided CNAME record to your DNS

---

### Option B: AWS EC2 (More Control)

#### 3B.1 Launch an EC2 Instance

1. Go to **EC2** → **Launch Instance**
2. Choose **Ubuntu 22.04 LTS**
3. Instance type: `t3.small` (or `t3.micro` for low traffic)
4. Security group: Allow inbound on ports **22** (SSH), **80**, **443**, **8001**
5. Launch and SSH in

#### 3B.2 Set Up the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip nginx certbot python3-certbot-nginx

# Clone your repo
git clone https://github.com/YOUR_USER/YOUR_REPO.git
cd YOUR_REPO/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env file
cat > .env << 'EOF'
MONGO_URL=mongodb+srv://datame_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/datame_production?retryWrites=true&w=majority
DB_NAME=datame_production
CORS_ORIGINS=https://datamanagementengineer.com,https://www.datamanagementengineer.com
ADMIN_PASSWORD=Brisbane2026$
EOF
```

#### 3B.3 Create a Systemd Service

```bash
sudo tee /etc/systemd/system/datame-backend.service > /dev/null << 'EOF'
[Unit]
Description=DataMe FastAPI Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/YOUR_REPO/backend
Environment=PATH=/home/ubuntu/YOUR_REPO/backend/venv/bin
ExecStart=/home/ubuntu/YOUR_REPO/backend/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable datame-backend
sudo systemctl start datame-backend
```

#### 3B.4 Configure Nginx as Reverse Proxy

```bash
sudo tee /etc/nginx/sites-available/datame-api > /dev/null << 'EOF'
server {
    listen 80;
    server_name api.datamanagementengineer.com;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/datame-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 3B.5 Add SSL with Let's Encrypt

```bash
sudo certbot --nginx -d api.datamanagementengineer.com
```

---

## Part 4: Deploy the Frontend on AWS Amplify

### 4.1 Connect Your Repository

1. Go to **AWS Amplify** in the console
2. Click **New app** → **Host web app**
3. Choose your Git provider (GitHub, GitLab, Bitbucket)
4. Authorize AWS Amplify and select your repository and branch (`main`)

### 4.2 Configure Build Settings

Amplify should auto-detect the `amplify.yml`. If not, set manually:

- **App root**: `/` (or `/frontend` if monorepo detection fails)
- **Build command**: `cd frontend && yarn install && yarn build`
- **Output directory**: `frontend/build`

### 4.3 Set Environment Variables

In Amplify Console → **App settings** → **Environment variables**, add:

| Variable | Value |
|----------|-------|
| `REACT_APP_BACKEND_URL` | `https://api.datamanagementengineer.com` (your deployed backend URL) |

> **Critical**: Amplify injects env vars at **build time** for React apps. After adding/changing variables, you must **redeploy**.

### 4.4 Configure Redirects for SPA Routing

React Router uses client-side routing. Add this redirect rule so all paths serve `index.html`:

Go to **App settings** → **Rewrites and redirects** → **Add rule**:

| Source address | Target address | Type |
|----------------|---------------|------|
| `</^[^.]+$\|\.(?!(css\|gif\|ico\|jpg\|js\|png\|txt\|svg\|woff\|woff2\|ttf\|map\|json)$)([^.]+$)/>` | `/index.html` | `200 (Rewrite)` |

This ensures routes like `/wiki`, `/case-studies/some-slug`, and `/admin/wiki` all work correctly.

### 4.5 Deploy

1. Click **Save and deploy**
2. Amplify will pull code, build, and deploy
3. You'll get a URL like `https://main.d1234abcd.amplifyapp.com`

### 4.6 Add Custom Domain

1. Go to **App settings** → **Domain management**
2. Click **Add domain**
3. Enter `datamanagementengineer.com`
4. Amplify will provide DNS records to add:

| Record | Host | Value |
|--------|------|-------|
| CNAME | `www` | `d1234abcd.cloudfront.net` |
| ANAME/ALIAS | `@` (root) | `d1234abcd.cloudfront.net` |

5. Add these records in your domain registrar (GoDaddy, Namecheap, Route 53, etc.)
6. Amplify auto-provisions an **SSL certificate** — wait for verification (up to 48 hours, usually minutes)

---

## Part 5: DNS Configuration Summary

At your domain registrar, add these DNS records:

| Type | Host | Value | Purpose |
|------|------|-------|---------|
| CNAME or ALIAS | `@` / root | Amplify CloudFront URL | Frontend |
| CNAME | `www` | Amplify CloudFront URL | Frontend (www) |
| CNAME | `api` | App Runner URL or EC2 IP | Backend API |

---

## Part 6: Post-Deployment Checklist

- [ ] **Frontend** loads at `https://datamanagementengineer.com`
- [ ] **All pages** work (Home, Strategy, Case Studies, Insights, Wiki)
- [ ] **API calls** work (lead form submission, wiki articles)
- [ ] **Admin panel** is accessible at `/admin/wiki` and password-protected
- [ ] **CORS** is configured correctly (no browser console errors)
- [ ] **SSL** is active on both frontend and backend domains
- [ ] **MongoDB Atlas** network access is restricted to your backend IP only
- [ ] **Environment files** (`.env`) are NOT committed to the repository
- [ ] **Custom domain** DNS propagation is complete

---

## Part 7: CI/CD — Automatic Deployments

### Frontend (Amplify)
Amplify automatically redeploys when you push to your connected branch. No additional setup needed.

### Backend
For App Runner: Enable **automatic deployment** from ECR — push a new image and it redeploys.

For EC2, add a simple deploy script:

```bash
#!/bin/bash
cd /home/ubuntu/YOUR_REPO
git pull origin main
cd backend
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart datame-backend
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend API calls fail | Check `REACT_APP_BACKEND_URL` in Amplify env vars. Must include `https://`. Redeploy after changing. |
| CORS errors in browser | Ensure `CORS_ORIGINS` in backend `.env` includes your exact frontend domain(s). |
| Routes return 404 on refresh | Add the SPA rewrite rule in Amplify (see Section 4.4). |
| MongoDB connection timeout | Check MongoDB Atlas Network Access — add your backend's IP address. |
| Admin login fails | Verify `ADMIN_PASSWORD` env var is set correctly on the backend server. |
| Build fails on Amplify | Check build logs. Common: missing `yarn.lock`, wrong Node version. Set Node 18 in build settings. |

---

## Cost Estimate (Monthly)

| Service | Tier | Estimated Cost |
|---------|------|---------------|
| AWS Amplify (Frontend) | Free tier: 1000 build mins, 15 GB served | **$0** (under free tier) |
| AWS App Runner (Backend) | 1 vCPU, 2 GB | **~$30/month** |
| *OR* AWS EC2 `t3.micro` | Free tier eligible (1st year) | **$0 – $8/month** |
| MongoDB Atlas | M0 Free (512 MB) | **$0** |
| Route 53 (DNS) | Hosted zone | **$0.50/month** |
| **Total** | | **$0.50 – $30/month** |

---

## Security Reminders

1. **Never commit `.env` files** to your repository
2. **Restrict MongoDB Atlas** network access to your backend IP only (remove `0.0.0.0/0` after setup)
3. **Change the admin password** periodically
4. **Enable AWS CloudWatch** logging for App Runner / EC2
5. Consider adding **rate limiting** to the backend API for production use
