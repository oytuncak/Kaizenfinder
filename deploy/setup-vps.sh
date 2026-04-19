#!/bin/bash
# KaizenFinder VPS Setup Script — w8h8.com/kaizen
# Run as root: bash setup-vps.sh

set -e

DOMAIN="w8h8.com"
WWW_DOMAIN="www.w8h8.com"
APP_DIR="/var/www/kaizenfinder"
NGINX_CONF="/etc/nginx/sites-available/kaizenfinder"

echo "============================================"
echo "  KaizenFinder VPS Deployment"
echo "  URL: https://www.w8h8.com/kaizen"
echo "============================================"

# 1. Install nginx & certbot
echo "[1/6] Installing nginx & certbot..."
apt-get update -qq
apt-get install -y nginx curl certbot python3-certbot-nginx

# 2. Download built app from GitHub
echo "[2/6] Downloading app files..."
mkdir -p "$APP_DIR/assets"
cd "$APP_DIR"

curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/index.html" -o index.html
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/favicon.svg" -o favicon.svg
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/assets/index-BTQcnt7M.css" -o assets/index-BTQcnt7M.css
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/assets/index-DbyK_ECN.js" -o assets/index-DbyK_ECN.js

chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"
echo "  Files ready."

# 3. Write nginx config
echo "[3/6] Configuring nginx..."
cat > "$NGINX_CONF" << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name w8h8.com www.w8h8.com;

    # Redirect /kaizen -> /kaizen/ (trailing slash)
    location = /kaizen {
        return 301 /kaizen/;
    }

    # Serve KaizenFinder at /kaizen/
    location /kaizen/ {
        alias /var/www/kaizenfinder/;
        index index.html;
        try_files $uri $uri/ /kaizen/index.html;
    }

    # Cache static assets
    location ~* ^/kaizen/.*\.(js|css|svg|ico|png|jpg|woff2)$ {
        alias /var/www/kaizenfinder/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/kaizenfinder

# Keep default site if it exists (other sites on the VPS may use it)
nginx -t
systemctl enable nginx
systemctl restart nginx
echo "  Nginx running on HTTP."

# 4. SSL certificate
echo "[4/6] Obtaining SSL certificate..."
certbot --nginx \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN" \
  --non-interactive \
  --agree-tos \
  --email admin@w8h8.com \
  --redirect
echo "  SSL installed."

# 5. Auto-renew
echo "[5/6] Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | crontab -

# 6. Reload
echo "[6/6] Reloading nginx..."
systemctl reload nginx

echo ""
echo "============================================"
echo "  KaizenFinder is LIVE at:"
echo "  https://www.w8h8.com/kaizen"
echo "  https://w8h8.com/kaizen"
echo "============================================"
