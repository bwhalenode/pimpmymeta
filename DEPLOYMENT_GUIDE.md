# Deployment Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Deployment to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/pimp-my-meta.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings (auto-detected):
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add environment variables:
   ```
   NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   NEXT_PUBLIC_VAULT_PROGRAM_ID=YourProgramID
   NEXT_PUBLIC_PMM_MINT=YourMintAddress
   NEXT_PUBLIC_X_URL=https://twitter.com/pimpmymeta
   NEXT_PUBLIC_TELEGRAM_URL=https://t.me/pimpmymeta
   NEXT_PUBLIC_DISCORD_URL=https://discord.gg/pimpmymeta
   NEXT_PUBLIC_DEXSCREENER_URL=https://dexscreener.com/solana/
   NEXT_PUBLIC_RAYDIUM_URL=https://raydium.io/swap/
   NEXT_PUBLIC_JUPITER_URL=https://jup.ag/swap/
   NEXT_PUBLIC_SITE_URL=https://pimpmymeta.com
   NEXT_PUBLIC_SITE_NAME=Pimp My Meta
   ```

6. Click "Deploy"

### Step 3: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., pimpmymeta.com)
3. Follow DNS configuration instructions
4. Wait for SSL certificate to provision (~5 minutes)

## Alternative Deployment Options

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. Deploy via Netlify CLI or web interface

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t pimp-my-meta .
docker run -p 3000:3000 --env-file .env.local pimp-my-meta
```

### VPS (Ubuntu/Debian)

1. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. Clone and build:
   ```bash
   git clone https://github.com/yourusername/pimp-my-meta.git
   cd pimp-my-meta/website
   npm install
   npm run build
   ```

3. Set up PM2 for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "pimp-my-meta" -- start
   pm2 startup
   pm2 save
   ```

4. Configure Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name pimpmymeta.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. Install SSL with Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d pimpmymeta.com
   ```

## Pre-Launch Checklist

### Security
- [ ] All environment variables set correctly
- [ ] No private keys in codebase
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Rate limiting implemented

### Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Fonts preloaded
- [ ] Analytics added (optional)
- [ ] Error logging configured

### Content
- [ ] All placeholder text replaced
- [ ] Contract addresses verified
- [ ] Social links updated
- [ ] Brand assets uploaded
- [ ] Legal disclaimers reviewed

### Testing
- [ ] Test on Chrome, Firefox, Safari
- [ ] Mobile responsive check
- [ ] Wallet connection works
- [ ] All pages load correctly
- [ ] Forms validate properly
- [ ] Transactions simulate (with mock data)

## Post-Deployment

### Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Google Analytics**: Add tracking ID if using
3. **Sentry**: For error tracking (optional)
4. **Uptime Monitoring**: UptimeRobot, Pingdom, etc.

### Updates

Rolling updates:
```bash
git pull origin main
npm install
npm run build
pm2 restart pimp-my-meta  # if using PM2
```

With Vercel: Just push to GitHub, auto-deploys.

### Rollback

Vercel: Use dashboard to revert to previous deployment
Manual: Keep git tags for stable versions

## Performance Optimization

### Image Optimization
- Use Next.js Image component for all images
- Convert images to WebP format
- Implement lazy loading

### Code Splitting
- Already handled by Next.js App Router
- Use dynamic imports for heavy components

### Caching
- Configure CDN headers
- Use SWR or React Query for data fetching
- Implement service workers (optional)

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Delete `node_modules` and reinstall
- Check for TypeScript errors

### Wallet Won't Connect
- Verify RPC endpoint is accessible
- Check browser console for errors
- Ensure wallet extension is installed

### Slow Performance
- Enable caching headers
- Use CDN for static assets
- Optimize images and fonts

## Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Solana Docs**: [docs.solana.com](https://docs.solana.com)

---

**Ready to launch!** 🚀
