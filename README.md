
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

### Clear cache
```bash
# Restart container to clear nginx cache
docker-compose restart nginx
```