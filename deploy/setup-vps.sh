#!/bin/bash
# KaizenFinder VPS Setup — w8h8.com/kaizen
# Run as root: curl -fsSL <url> | bash

set -e

DOMAIN="w8h8.com"
WWW_DOMAIN="www.w8h8.com"
APP_DIR="/var/www/html/kaizen"
NGINX_CONF="/etc/nginx/sites-available/kaizenfinder"

echo "============================================"
echo "  KaizenFinder VPS Deployment"
echo "  URL: https://www.w8h8.com/kaizen"
echo "============================================"

# 1. Install dependencies
echo "[1/6] Installing nginx & certbot..."
apt-get update -qq
apt-get install -y nginx curl certbot python3-certbot-nginx

# 2. Download built app
echo "[2/6] Downloading app files from GitHub..."
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR/assets"

curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/index.html"                          -o "$APP_DIR/index.html"
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/favicon.svg"                         -o "$APP_DIR/favicon.svg"
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/assets/index-BTQcnt7M.css"           -o "$APP_DIR/assets/index-BTQcnt7M.css"
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/assets/index-DbyK_ECN.js"            -o "$APP_DIR/assets/index-DbyK_ECN.js"

chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

echo "  Files:"
ls -lh "$APP_DIR" "$APP_DIR/assets"

# 3. Nginx config — files live at /var/www/html/kaizen/
echo "[3/6] Writing nginx config..."
cat > "$NGINX_CONF" << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name w8h8.com www.w8h8.com;

    root /var/www/html;

    # Redirect bare /kaizen to /kaizen/
    location = /kaizen {
        return 301 /kaizen/;
    }

    # Serve the React SPA at /kaizen/
    location /kaizen/ {
        try_files $uri $uri/ /kaizen/index.html;
    }

    # Any other root requests
    location / {
        try_files $uri $uri/ =404;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;

    location ~* \.(js|css|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/kaizenfinder

nginx -t && systemctl enable nginx && systemctl restart nginx
echo "  Nginx OK — http://$WWW_DOMAIN/kaizen"

# 4. SSL
echo "[4/6] Getting SSL certificate..."
certbot --nginx \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN" \
  --non-interactive \
  --agree-tos \
  --email admin@w8h8.com \
  --redirect && echo "  SSL OK." || echo "  SSL skipped (may already exist or DNS not ready)."

# 5. Auto-renew
(crontab -l 2>/dev/null | grep -v certbot; echo "0 3 * * * certbot renew --quiet") | crontab -

# 6. Done
systemctl reload nginx 2>/dev/null || true

echo ""
echo "============================================"
echo "  LIVE at: https://www.w8h8.com/kaizen"
echo "============================================"
