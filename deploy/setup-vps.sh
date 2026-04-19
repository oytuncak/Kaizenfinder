#!/bin/bash
# KaizenFinder VPS Setup Script
# Run as root on Ubuntu/Debian: bash setup-vps.sh

set -e

DOMAIN=${1:-"62.72.35.123"}
APP_DIR="/var/www/kaizenfinder"
NGINX_CONF="/etc/nginx/sites-available/kaizenfinder"

echo "============================================"
echo "  KaizenFinder VPS Deployment"
echo "  Target: $DOMAIN"
echo "============================================"

# 1. Update & install nginx
echo "[1/5] Installing nginx..."
apt-get update -qq
apt-get install -y nginx curl

# 2. Download the built app from GitHub
echo "[2/5] Downloading app from GitHub..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# Download each built file
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/index.html" -o index.html
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/favicon.svg" -o favicon.svg
mkdir -p assets
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/assets/index-BTQcnt7M.css" -o assets/index-BTQcnt7M.css
curl -fsSL "https://raw.githubusercontent.com/oytuncak/Kaizenfinder/gh-pages/assets/index-DbyK_ECN.js" -o assets/index-DbyK_ECN.js

# Fix asset paths for direct server (not subpath)
sed -i 's|/Kaizenfinder/assets/|/assets/|g' index.html
sed -i 's|/Kaizenfinder/favicon.svg|/favicon.svg|g' index.html

echo "  Files downloaded."

# 3. Set permissions
chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

# 4. Configure nginx
echo "[3/5] Configuring nginx..."
cat > "$NGINX_CONF" << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    root $APP_DIR;
    index index.html;

    # React SPA — all routes serve index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|svg|ico|png|jpg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
}
EOF

# Enable site
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/kaizenfinder
rm -f /etc/nginx/sites-enabled/default

# 5. Test & reload nginx
echo "[4/5] Starting nginx..."
nginx -t
systemctl enable nginx
systemctl restart nginx

echo "[5/5] Done!"
echo ""
echo "============================================"
echo "  KaizenFinder is live at:"
echo "  http://$DOMAIN"
echo "============================================"
