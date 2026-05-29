# Kishan Kumar Singh — Personal Blog & Portfolio

Dark terminal-aesthetic blog built for GitHub Pages. No build tools, no frameworks — just HTML, CSS, and one JS file.

## 🚀 Deploy to GitHub Pages in 3 steps

### 1. Create the repo
```bash
git init
git add .
git commit -m "initial commit"
```

### 2. Push to GitHub
```bash
# Create a new repo on github.com named: yourusername.github.io
# Then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Source: **Deploy from a branch** → `main` → `/ (root)`
- Click **Save**

Your site will be live at `https://YOUR_USERNAME.github.io` in ~2 minutes.

---

## ✍️ How to write a new blog post

Open `assets/posts.js` and add a new object to the top of the `POSTS` array:

```js
{
  slug: "your-post-slug",           // used in the URL: post.html?slug=your-post-slug
  title: "Your Post Title",
  date: "July 2025",
  readTime: 6,                      // estimated reading time in minutes
  tags: ["threat-hunting"],         // pick from: threat-hunting, detection-engineering,
                                    //   incident-response, tools, career
  excerpt: "One line shown on the blog listing page.",
  content: `
    <p>Your first paragraph here.</p>

    <h2>A section heading</h2>
    <p>More content...</p>

    <pre><code>SELECT * FROM logs WHERE suspicious = true</code></pre>

    <p class="post-closing">Closing note or CTA.</p>
  `
},
```

Save the file. Push to GitHub. Done — no rebuild needed.

---

## 📁 File structure

```
/
├── index.html          ← Home page
├── blog.html           ← Blog listing with tag filters
├── about.html          ← About page
├── post.html           ← Post reader (shared by all posts)
├── assets/
│   ├── style.css       ← All styles
│   └── posts.js        ← All post content + postCard() renderer
└── README.md
```

---

## 🎨 Customisation

- **Colours**: Edit CSS variables at the top of `assets/style.css`
- **Links**: Update LinkedIn/Medium URLs in the footer of each HTML file
- **Name/title**: Search for `Kishan Kumar Singh` across HTML files and update

---

## 📬 Contact

work.kishan.in@gmail.com
