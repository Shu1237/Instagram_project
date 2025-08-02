# MongoDB Atlas Configuration for Render Deployment

This document provides instructions for properly configuring MongoDB Atlas to work with your application deployed on Render.

## Common Connection Issues and Solutions

### 1. IP Whitelist Configuration

**Issue**: "Could not connect to any servers in your MongoDB Atlas cluster"

**Solution**:
1. Go to MongoDB Atlas Dashboard
2. Navigate to "Network Access" in the left sidebar
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

**For Render Specific IPs** (more secure):
- Check Render's outbound IP addresses: https://render.com/docs/outbound-ip-addresses
- Add each IP range to your MongoDB Atlas whitelist

### 2. Connection String Format

Ensure your MongoDB connection string is properly formatted:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

### 3. Environment Variables

Make sure these environment variables are set in your Render service:
- `URI_MONGODB`: Your complete MongoDB Atlas connection string
- `NODE_ENV`: Set to "production" for production deployments

### 4. Database User Permissions

Ensure your MongoDB database user has:
- Read and write permissions to your database
- Atlas admin permissions (if needed for your application)

### 5. Connection Troubleshooting

The application now includes:
- **Retry Logic**: Automatic retries with exponential backoff
- **Health Check Endpoint**: Access `/health` to check database connectivity
- **Enhanced Error Logging**: Detailed error messages to help diagnose issues

### 6. Health Check Endpoint

After deployment, you can check your database connectivity:
```
GET https://your-app.onrender.com/health
```

This will return:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "databases": {
    "mysql": { "connected": true, "error": null },
    "mongodb": { "connected": true, "error": null }
  }
}
```

### 7. Common Error Messages

- **"ENOTFOUND"**: DNS resolution issue, check your connection string
- **"authentication failed"**: Check username/password in connection string
- **"IP whitelist"**: Add 0.0.0.0/0 to MongoDB Atlas Network Access
- **"ServerSelectionTimeoutError"**: MongoDB cluster may be unreachable

## Testing Connection Locally

You can test your MongoDB connection locally by setting the same environment variables and running:
```bash
npm start
```

Check the logs for successful connection messages or error details.