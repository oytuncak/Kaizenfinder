#!/bin/bash
echo "=== Nginx status ==="
systemctl is-active nginx

echo "=== Nginx config test ==="
nginx -t 2>&1

echo "=== Sites enabled ==="
ls -la /etc/nginx/sites-enabled/

echo "=== Files at /var/www/html/kaizen/ ==="
ls -lh /var/www/html/kaizen/ 2>/dev/null || echo "MISSING"
ls -lh /var/www/html/kaizen/assets/ 2>/dev/null || echo "MISSING assets"

echo "=== Local HTTP test ==="
curl -s -o /dev/null -w "HTTP %{http_code}" http://localhost/kaizen/

echo ""
echo "=== Nginx error log (last 20 lines) ==="
tail -20 /var/log/nginx/error.log 2>/dev/null
