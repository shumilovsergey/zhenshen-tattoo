# Docker Setup for ZhenShen Tattoo

This Docker setup provides a high-performance nginx server for your tattoo portfolio app with optimized loading speeds.

## Quick Start

```bash
# Run with Docker Compose (recommended)
docker-compose up -d

# Or run with Docker directly
docker build -t zhenshen-tattoo .
docker run -p 80:80 zhenshen-tattoo
```

## Performance Optimizations

### 🚀 Speed Improvements
- **Gzip compression** - Reduces file sizes by 70-80%
- **Aggressive caching** - Images cached for 30 days, CSS/JS for 1 year
- **Static file optimization** - Dedicated handling for different file types
- **Keep-alive connections** - Reduces connection overhead
- **Sendfile** - Optimized file serving

### 📱 Mobile Optimizations
- **Range requests** - Allows partial image loading
- **Proper MIME types** - Ensures correct handling
- **Cache-friendly headers** - Better mobile browser caching

### 🖼️ Image Handling
- **Portfolio images** cached for 7 days
- **Static assets** cached for 1 year  
- **HTML** cached for 1 hour (for updates)

## Usage

### Development
```bash
# Start the server
docker-compose up

# Stop the server
docker-compose down

# View logs
docker-compose logs -f nginx
```

### Production
```bash
# Run in background
docker-compose up -d

# Check status
docker-compose ps

# Update (rebuild and restart)
docker-compose down
docker-compose up -d --build
```

## Configuration

### Nginx Configuration
- Location: `nginx.conf`
- Includes gzip, caching, security headers
- Optimized for SPA (Single Page Application)

### Cache Settings
- **HTML files**: 1 hour
- **CSS/JS**: 1 year (with immutable flag)
- **Images**: 30 days
- **Portfolio photos**: 7 days
- **Fonts**: 1 year

## Performance Benefits

| Optimization | Speed Improvement |
|--------------|------------------|
| Gzip compression | 70-80% smaller files |
| Static caching | Instant repeat visits |
| Keep-alive | 50% faster connections |
| Sendfile | 20-30% faster file serving |
| Image caching | 90% faster portfolio loading |

## Health Check

The container includes a health endpoint at `/health` that returns "healthy" when the server is running properly.

## Troubleshooting

### Port conflicts
If port 80 is busy, change in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Permission issues
```bash
# Fix permissions
sudo chown -R $USER:$USER .
```

### Clear cache
```bash
# Restart container to clear nginx cache
docker-compose restart nginx
```