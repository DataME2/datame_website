# DataManagementEngineer.com — AWS Deployment Guide
## AWS Amplify (Frontend) + AWS App Runner (Backend) + MongoDB Atlas

---

## Architecture

```
┌──────────────────────────────────────────────┐
│              AWS Amplify                      │
│         (React Frontend - SPA)               │
│      datamanagementengineer.com               │
└─────────────────┬────────────────────────────┘
                  │ HTTPS API calls
                  ▼
┌──────────────────────────────────────────────┐
│            AWS App Runner                     │
│         (FastAPI Backend)                    │
│     api.datamanagementengineer.com            │
└─────────────────┬────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────┐
│           MongoDB Atlas (Free Tier)           │
│           (Cloud Database)                   │
└──────────────────────────────────────────────┘
```

---

## Prerequisites

| Tool | Link |
|------|------|
| AWS Account | [https://aws.amazon.com](https://aws.amazon.com) |
| AWS CLI v2 | [Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) |
| Docker Desktop | [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) |
| Git | Your code pushed to GitHub, GitLab, or Bitbucket |
| MongoDB Atlas | [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) |

---

## Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create a Free Cluster

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign up / log in
2. Click **Build a Database** → Select **M0 FREE**
3. Cloud Provider: **AWS**
4. Region: **US East (N. Virginia)** `us-east-1` (or closest to your audience)
5. Cluster Name: `datame-cluster`
6. Click **Create Deployment**

### 1.2 Create a Database User

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Authentication: **Password**
4. Username: `datame_admin`
5. Password: Click **Autogenerate Secure Password** → **Copy and save this password somewhere safe**
6. Role: **Read and write to any database**
7. Click **Add User**

### 1.3 Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (`0.0.0.0/0`)
   > You'll restrict this later after getting your App Runner IP
4. Click **Confirm**

### 1.4 Get Your Connection String

1. Go to **Database** (left sidebar) → Click **Connect** on your cluster
2. Select **Drivers**
3. Copy the connection string:
   ```
   mongodb+srv://datame_admin:<password>@datame-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name before the `?`:
   ```
   mongodb+srv://datame_admin:YOUR_PASSWORD@datame-cluster.xxxxx.mongodb.net/datame_production?retryWrites=true&w=majority
   ```

**Save this full connection string — you'll need it in Step 2.**

---

## Step 2: Deploy Backend on AWS App Runner (15 minutes)

### 2.1 Create `backend/Dockerfile`

Add this file to your `backend/` folder:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Remove .env from container — we use App Runner env vars instead
RUN rm -f .env

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### 2.2 Create `backend/.dockerignore`

```
.env
__pycache__
*.pyc
.git
```

### 2.3 Create an ECR Repository

Open your terminal:

```bash
# Configure AWS CLI (if not done already)
aws configure
# Enter: Access Key, Secret Key, Region (us-east-1), Output (json)

# Create ECR repository
aws ecr create-repository \
  --repository-name datame-backend \
  --region us-east-1
```

Note the `repositoryUri` from the output. It looks like:
```
123456789012.dkr.ecr.us-east-1.amazonaws.com/datame-backend
```

### 2.4 Build and Push Docker Image

```bash
# Set your account ID and region
AWS_ACCOUNT_ID=123456789012
AWS_REGION=us-east-1

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build the image
cd backend
docker build --platform linux/amd64 -t datame-backend .

# Tag it
docker tag datame-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/datame-backend:latest

# Push it
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/datame-backend:latest
```

### 2.5 Create App Runner Service

1. Go to **AWS Console** → Search **App Runner** → Click **Create service**

2. **Source and deployment**:
   - Source: **Container registry** → **Amazon ECR**
   - Browse and select: `datame-backend:latest`
   - Deployment trigger: **Automatic** (redeploys when you push a new image)
   - ECR access role: **Create new service role** (App Runner creates one for you)
   - Click **Next**

3. **Configure service**:
   - Service name: `datame-backend`
   - CPU: **1 vCPU**
   - Memory: **2 GB**
   - Port: **8001**

4. **Environment variables** — Add these one by one:

   | Key | Value |
   |-----|-------|
   | `MONGO_URL` | `mongodb+srv://datame_admin:YOUR_PASSWORD@datame-cluster.xxxxx.mongodb.net/datame_production?retryWrites=true&w=majority` |
   | `DB_NAME` | `datame_production` |
   | `CORS_ORIGINS` | `https://datamanagementengineer.com,https://www.datamanagementengineer.com` |
   | `ADMIN_PASSWORD` | `Brisbane2026$` |

5. **Health check**:
   - Protocol: **HTTP**
   - Path: `/api/`
   - Click **Next**

6. Review and click **Create & deploy**

7. **Wait 3–5 minutes** for deployment to complete

8. Copy your App Runner URL from the dashboard. It looks like:
   ```
   https://xxxxxxxx.us-east-1.awsapprunner.com
   ```

### 2.6 Test Your Backend

Open a browser or run:

```bash
curl https://xxxxxxxx.us-east-1.awsapprunner.com/api/
```

Expected response:
```json
{"message": "DataMe API is running"}
```

Test the lead endpoint:
```bash
curl -X POST https://xxxxxxxx.us-east-1.awsapprunner.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","interest":"test"}'
```

### 2.7 (Optional) Add Custom Domain to App Runner

1. In App Runner → Your service → **Custom domains**
2. Click **Link domain**
3. Enter: `api.datamanagementengineer.com`
4. App Runner gives you DNS records — add them at your domain registrar:

   | Type | Name | Value |
   |------|------|-------|
   | CNAME | `api` | (provided by App Runner) |
   | CNAME | `_xxxxxxxxx.api` | (validation record) |

5. Wait for **Active** status (usually 5–30 minutes)

---

## Step 3: Deploy Frontend on AWS Amplify (10 minutes)

### 3.1 Create `amplify.yml` in Your Repo Root

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
            - REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL yarn build
      artifacts:
        baseDirectory: frontend/build
        files:
          - '**/*'
      cache:
        paths:
          - frontend/node_modules/**/*
    appRoot: /
```

Commit and push this file to your repo.

### 3.2 Create Amplify App

1. Go to **AWS Console** → Search **Amplify** → Click **New app** → **Host web app**
2. Select your Git provider (GitHub)
3. Authorize and select your **repository** and **branch** (`main`)
4. Amplify should detect `amplify.yml` automatically
5. Click **Next**

### 3.3 Set Environment Variables

On the **Build settings** page → **Advanced settings** → **Environment variables**:

| Variable | Value |
|----------|-------|
| `REACT_APP_BACKEND_URL` | `https://api.datamanagementengineer.com` (or your App Runner URL if no custom domain yet) |

> **Important:** React reads env vars at **build time** only. If you change this variable later, you must trigger a **new build**.

### 3.4 Deploy

Click **Save and deploy**. Amplify will:
1. Pull your code from Git
2. Install dependencies (`yarn install`)
3. Build the React app (`yarn build`)
4. Deploy to Amplify's CDN

This takes about 3–5 minutes. You'll get a URL like:
```
https://main.d1a2b3c4d5.amplifyapp.com
```

### 3.5 Add SPA Redirect Rule (Critical)

React Router needs all paths to serve `index.html`:

1. Go to **App settings** → **Rewrites and redirects**
2. Click **Add rule** → Switch to **Open text editor** and paste:

```json
[
  {
    "source": "</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  }
]
```

3. Click **Save**

Without this, visiting `/wiki` or `/case-studies/some-slug` directly will return a 404.

### 3.6 Add Custom Domain

1. Go to **App settings** → **Domain management** → **Add domain**
2. Enter: `datamanagementengineer.com`
3. Amplify shows subdomains to configure:
   - `datamanagementengineer.com` → branch `main`
   - `www.datamanagementengineer.com` → redirect to root
4. Click **Configure domain**
5. Amplify provides DNS records:

   | Type | Name | Value |
   |------|------|-------|
   | CNAME | `_xxxxxxxxx` | `_xxxxxxxxx.xxxxxxxxx.acm-validations.aws` |
   | ANAME/ALIAS | `@` (root) | `d1a2b3c4d5.cloudfront.net` |
   | CNAME | `www` | `d1a2b3c4d5.cloudfront.net` |

6. Add these DNS records at your domain registrar
7. Amplify auto-provisions **free SSL** — verification takes 5 minutes to 48 hours

---

## Step 4: DNS Summary

Add these records at your domain registrar (GoDaddy, Namecheap, Route 53, etc.):

| Type | Name | Points To | Purpose |
|------|------|-----------|---------|
| ALIAS/ANAME | `@` (root) | Amplify CloudFront URL | Frontend |
| CNAME | `www` | Amplify CloudFront URL | Frontend (www) |
| CNAME | `api` | App Runner URL | Backend API |
| CNAME | `_validation` | ACM validation value | SSL certificate |

> **Note:** If your registrar doesn't support ALIAS/ANAME records for root domain, use **AWS Route 53** as your DNS provider (supports ALIAS records natively).

---

## Step 5: Post-Deployment Verification

Open each URL and verify:

| Check | URL | Expected |
|-------|-----|----------|
| Homepage | `https://datamanagementengineer.com` | Hero section loads |
| Strategy page | `https://datamanagementengineer.com/services` | Offense/Defense tabs work |
| Wiki | `https://datamanagementengineer.com/wiki` | Wiki page loads |
| Admin | `https://datamanagementengineer.com/admin/wiki` | Password gate shows |
| API health | `https://api.datamanagementengineer.com/api/` | JSON response |
| Lead form | Submit the "Free Assessment" form | Toast success, data in MongoDB |
| Direct URL | Refresh on `/case-studies/databricks-unity-catalog-poc` | Page loads (not 404) |

---

## Updating Your Site

### Frontend Changes
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Amplify auto-detects the push and redeploys (~3 min).

### Backend Changes
```bash
cd backend
docker build --platform linux/amd64 -t datame-backend .
docker tag datame-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/datame-backend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/datame-backend:latest
```
App Runner auto-detects the new image and redeploys (~3 min).

### Adding Environment Variables
- **Frontend**: Amplify Console → Environment variables → Add → **Redeploy**
- **Backend**: App Runner → Configuration → Environment variables → **Deploy**

---

## Cost Breakdown

| Service | What You Get | Monthly Cost |
|---------|-------------|-------------|
| **Amplify** | 1000 build min, 15 GB served, SSL | **Free** (free tier) |
| **App Runner** | 1 vCPU, 2 GB, auto-scaling | **~$30** (pauses to $0 when idle if configured) |
| **MongoDB Atlas M0** | 512 MB storage, shared cluster | **Free** |
| **ECR** | Image storage | **~$1** |
| **Route 53** (optional) | DNS hosting | **$0.50** |
| **Total** | | **$0.50 – $31.50/month** |

> **Tip:** App Runner supports **provisioned concurrency = 0** which means it pauses when idle and only charges for active use. Great for low-traffic sites.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| API calls fail from frontend | Verify `REACT_APP_BACKEND_URL` in Amplify env vars matches your backend URL exactly (with `https://`). Redeploy after changing. |
| CORS error in browser console | Update `CORS_ORIGINS` in App Runner env vars to include your exact frontend domain. |
| Pages 404 on browser refresh | Add the SPA rewrite rule (Step 3.5). |
| MongoDB connection timeout | Check Atlas Network Access — ensure App Runner's outbound IPs are allowed (or use `0.0.0.0/0`). |
| Docker build fails on M1/M2 Mac | Use `--platform linux/amd64` flag in `docker build`. |
| Amplify build fails | Check build logs. Common issues: missing `yarn.lock` file, wrong Node version. Add `nvm use 18` to preBuild commands. |
| Admin password not working | Verify `ADMIN_PASSWORD` env var in App Runner. Redeploy after changing. |

---

## Security Checklist

- [ ] `.env` files are in `.gitignore` — never committed
- [ ] MongoDB Atlas network access restricted to App Runner IPs (not `0.0.0.0/0`)
- [ ] Admin password is strong and stored only in App Runner env vars
- [ ] CORS origins list only your actual domains
- [ ] SSL active on both `datamanagementengineer.com` and `api.datamanagementengineer.com`
- [ ] ECR repository has image scanning enabled
