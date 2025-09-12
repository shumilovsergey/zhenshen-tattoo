# Multi-stage build for optimized production
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy web application files
COPY . /usr/share/nginx/html

# Create cache directory
RUN mkdir -p /var/cache/nginx

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chown -R nginx:nginx /var/cache/nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]