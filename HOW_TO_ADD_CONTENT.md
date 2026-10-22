# How to Add Missions (Projects) & Blogs

You do **NOT** need an admin dashboard or a backend database. The entire portfolio is built with a clean, modular file structure so you can add a new project or blog post in under 60 seconds.

---

## 1. Where Your Content Lives

| Content Type | File Location | What to do |
| :--- | :--- | :--- |
| **Projects / Missions** | [`src/data/missions.js`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/src/data/missions.js) | Add a new project object to the `missions` array |
| **Blogs / Articles** | [`src/data/logs.js`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/src/data/logs.js) | Add a new blog object to the `missionLogs` array (full Markdown supported) |
| **Certifications** | [`src/pages/CommandCenter.jsx`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/src/pages/CommandCenter.jsx) | Add an entry to the `CERTS` array |
| **Profile & Links** | [`src/data/profile.js`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/src/data/profile.js) | Edit bio, social links, location, and stats |

---

## 2. How to Add a New Project (Mission)

Open [`src/data/missions.js`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/src/data/missions.js) and paste this template at the top of the `missions` array:

```javascript
{
  id: "my-project",                     // unique identifier (lowercase, hyphens)
  slug: "my-project",                   // URL path: /missions/my-project
  missionNumber: "005",                 // 3-digit order number
  missionCode: "MSN // 005",            // badge display code
  title: "MY PROJECT NAME",             // display title
  tagline: "Short punchy one-liner",    // subtitle
  status: "ACTIVE",                     // "ACTIVE", "DEPLOYED", or "EXPERIMENTAL"
  role: "Lead Architect & Developer",
  timeline: "2026 — Present",
  systems: ["AI", "Backend", "Systems"],
  technologies: ["Python", "FastAPI", "Docker", "PostgreSQL"],
  github: "https://github.com/ramanuj077/your-repo-name",
  demo: "https://your-live-demo.com",   // or null if no live demo
  brief: "2-3 sentences explaining what problem it solves and how you built it.",
  architectureHighlight: "Key technical highlight (e.g. Sub-50ms latency with Redis caching).",
  caseStudy: {
    missionObjective: "What was the main goal of this project?",
    problem: "What real-world pain point or bottleneck existed?",
    approach: "How did you tackle and solve the problem?",
    architecture: [
      "Layer 1: FastAPI asynchronous ingestion gateway",
      "Layer 2: Redis Pub/Sub state distribution",
      "Layer 3: PostgreSQL persistent storage",
    ],
    engineeringChallenges: [
      "Handling concurrent connections without deadlocks.",
      "Optimizing query execution time under heavy loads.",
    ],
    keyDecisions: [
      "Chose FastAPI over Flask for native async ASGI performance.",
      "Used connection pooling to prevent database starvation.",
    ],
    result: "Achieved 99.9% uptime with 1,000+ daily active requests.",
    whatILearned: "Key engineering takeaway from building this system.",
  },
},
```

Save the file — the project card will **instantly appear** on:
- The Home page featured missions grid
- The `/missions` page
- The full `/missions/my-project` detailed Case Study page!

---

## 3. How to Write a New Blog Post

Open [`src/data/logs.js`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/src/data/logs.js) and paste this template at the top of the `missionLogs` array:

```javascript
{
  id: "my-new-blog",
  slug: "my-new-blog-slug",             // URL path: /logs/my-new-blog-slug
  logNumber: "025",
  logCode: "RAMANUJ BLOG // 025",
  title: "Your Blog Post Title",
  subtitle: "A compelling subtitle explaining the deep-dive",
  date: "23 OCT 2026",
  readTime: "6 MIN READ",
  tags: ["AI", "BACKEND", "SYSTEMS"],   // Used by the filter buttons
  abstract: "A short 1-2 sentence preview that shows on the blog listing card.",
  content: `
### Introduction

Write your article here using **standard Markdown**!

- Code blocks with syntax highlighting
- Equations & mathematical formulas
- Tables, quotes, and diagrams

\`\`\`python
# Example code block
def hello_world():
    print("Scalable AI Systems")
\`\`\`

### Architecture Insights

Explain your design decisions, benchmarks, or lessons learned.
`,
},
```

Save the file — your new article will **instantly appear** on:
- The `/logs` (Ramanuj Blogs) page
- Its own full article reader page at `/logs/my-new-blog-slug`
- Tag filtering will automatically detect the tags you assigned!

---

## 4. How to Update Your Resume PDF

1. Place your updated resume file named `resume.pdf` into the [`public/`](file:///c:/Users/raman/OneDrive/Desktop/portfolio/public) folder:
   ```
   portfolio/
   └── public/
       └── resume.pdf
   ```
2. Any button labeled **"Resume"** or **"Download Resume"** across the site will automatically download this file!
