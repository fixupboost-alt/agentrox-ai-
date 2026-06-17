# Guide: Hosting AgentroXAI Website for Free with Custom Domain

Since this is a high-performance static website (HTML, CSS, and JS with local assets), you can host it **100% free forever** on platforms like **Vercel**, **Netlify**, or **GitHub Pages**. 

This guide details how to host your site and connect your free `.me` or `.tech` domain (obtained from the GitHub Student Developer Pack) without spending a dime.

---

## Part 1: Register Your Free Custom Domain
Through the **GitHub Student Developer Pack**, you get a free 1-year domain name (either `.me` from Namecheap or `.tech` from Name.com).

1. Go to the [GitHub Student Developer Pack Benefits Portal](https://education.github.com/pack).
2. Scroll to **Namecheap** (for `.me`) or **Name.com** (for `.tech`) and click **Get details / Connect account**.
3. Authenticate with your student GitHub account.
4. Search for your desired domain name (e.g., `agentroxai.tech` or `agentrox.me`) and complete the registration.
5. Keep your domain registrar portal open. We will configure DNS records here in **Part 3**.

---

## Part 2: Publish Your Website (Choose Option A or B)

### Option A: Hosting via Netlify (Recommended - Simplest Domain setup)
Netlify provides lightning-fast static hosting, automatic SSL certificates, and simple custom domain integration.

1. **Create an account** on [Netlify](https://www.netlify.com) using your GitHub account.
2. **Deploy without code repositories (Netlify Drop)**:
   - Go to your Netlify dashboard.
   - Click on **Sites** and scroll to the bottom.
   - Drag and drop your complete `agentrox-ai` folder (containing `index.html`, `css/`, `js/`, and `assets/`) into the dashed upload box.
   - Within 5 seconds, Netlify will build and deploy your site to a random subdomain (e.g., `luxury-concierge-12345.netlify.app`).
3. Alternatively, you can upload your code to a private or public GitHub repository and click **Import from Git** on Netlify to trigger automatic redeploys whenever you update files.

### Option B: Hosting via GitHub Pages
GitHub Pages hosts static files directly from a repository in your GitHub account.

1. Create a new repository on your GitHub account named `agentrox-ai`.
2. Push your files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initialize luxury website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/agentrox-ai.git
   git push -u origin main
   ```
3. In your GitHub repository page:
   - Go to **Settings** -> **Pages** (in the sidebar under "Code and automation").
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)` folder. Click **Save**.
   - Your site will be live at `https://YOUR_USERNAME.github.io/agentrox-ai` in a couple of minutes.

---

## Part 3: Connecting Your Custom Domain (Free SSL)

After deploying your site, link it to your custom domain. Here is how to configure it.

### Step 1: Tell Your Host About the Domain
* **If on Netlify**:
  - In your Netlify Site dashboard, go to **Site configuration** -> **Domain management** -> **Domains** -> **Add custom domain**.
  - Type in your custom domain (e.g., `agentroxai.tech`) and click **Verify**.
  - Netlify will prompt you that the domain is ready for DNS configuration.
* **If on GitHub Pages**:
  - In your GitHub Settings -> **Pages**, find the **Custom domain** field.
  - Type your domain name (e.g., `agentroxai.tech`) and click **Save**.
  - GitHub will perform verification checks.

### Step 2: Configure DNS Settings (At your Domain Registrar)
Go to the DNS Control Panel of your registrar (Namecheap or Name.com) and add the following records:

#### Option A: If you hosted on Netlify
Add these DNS records in your domain's DNS manager:
1. **CNAME Record**:
   - **Host/Name**: `www`
   - **Value/Target**: `your-site-subdomain.netlify.app` (your unique Netlify app URL)
   - **TTL**: `Automatic` or `300`
2. **A Record** (for the root domain `agentroxai.tech` pointing to Netlify's load balancer):
   - **Host/Name**: `@`
   - **Value/Target**: `75.2.60.5`
   - **TTL**: `Automatic` or `300`

#### Option B: If you hosted on GitHub Pages
Add these DNS records in your domain's DNS manager:
1. **CNAME Record**:
   - **Host/Name**: `www`
   - **Value/Target**: `YOUR_USERNAME.github.io`
2. **A Records** (point the root domain `@` to GitHub's IP addresses):
   - Create 4 separate A records with Host/Name set to `@` pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

---

## Part 4: Verify and Secure
1. Wait 5 to 30 minutes for the DNS settings to propagate across the internet.
2. Visit your custom domain (e.g., `https://agentroxai.tech`).
3. Netlify/GitHub Pages will automatically request and generate a **free Let's Encrypt SSL certificate** for your domain. Ensure the URL prefix displays `https://` with a padlock icon.
4. Congratulations! Your luxury, high-end AI receptionist agency website is now online, free to host, and fully customized.
