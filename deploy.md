# GCP Cloud Run Deployment Guide

## Prerequisites
- Google Cloud SDK installed and configured
- Docker installed locally
- GCP project with Cloud Run API enabled

## Build and Deploy

1. **Set your environment variables** (optional, will use defaults if not set):
   ```bash
   export VITE_BACKEND_URL="https://your-backend-url.com"
   ```

2. **Build and deploy to Cloud Run**:
   ```bash
   # Set your GCP project
   export PROJECT_ID="your-project-id"
   export SERVICE_NAME="impostor-frontend"
   export REGION="us-central1"

   # Build and deploy in one command
   gcloud run deploy $SERVICE_NAME \
     --source . \
     --platform managed \
     --region $REGION \
     --allow-unauthenticated \
     --set-env-vars VITE_BACKEND_URL=$VITE_BACKEND_URL
   ```

## Alternative: Manual Docker Build

If you prefer to build manually:

```bash
# Build the Docker image
docker build --build-arg VITE_BACKEND_URL=$VITE_BACKEND_URL -t gcr.io/$PROJECT_ID/$SERVICE_NAME .

# Push to Google Container Registry
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated
```

## Environment Variables

- `VITE_BACKEND_URL`: Backend API URL (defaults to http://localhost:8000)

## Notes

- The app runs on port 8080 (Cloud Run requirement)
- Includes nginx for efficient static file serving
- Handles client-side routing for React SPA
- Optimized with gzip compression and caching headers
