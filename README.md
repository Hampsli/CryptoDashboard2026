# 🚀 Cryto Dashboard
**Sophisticated Crypto Intelligence for the Modern CEO.**

Welcome to **Cryto Dashboard**, a premier, high-performance dashboard designed for successful women and market leaders who demand clarity, speed, and elegance in their financial overview. Built to provide real-time market insights with a refined aesthetic.

## ✨ Features
* **Executive Overview:** High-level data on the top 20 assets, curated for quick decision-making.
* **Seamless Navigation:** URL-synced search and sorting that respects your time and keeps your workflow fluid.
* **Real-time Intelligence:** Background updates every 60 seconds keep you ahead of the market without lifting a finger.
* **Refined Analytics:** Elegant price history charts and sparklines for a sophisticated visual experience.
* **CEO-Ready UX:** A "light" and "muted" design system that minimizes cognitive load while maintaining maximum professional impact.

## 🛠️ Built With
* **React + TypeScript**
* **TanStack Query** (For seamless background synchronization)
* **Tailwind CSS** (Custom executive design system)
* **Recharts** (Professional-grade financial visualization)

## 🏁 Getting Started

1.  **Clone & Install:**
    ```bash
    git clone [your-repo-url]
    cd clara-market-dashboard
    npm install
    ```

2.  **Run Locally:**
    ```bash
    npm run dev
    ```

## 🧠 Technical Decisions
The architecture was chosen to mirror the efficiency of a CEO's workflow. I implemented **TanStack Query** to ensure that data is always fresh without requiring manual refreshes, mirroring the "set it and forget it" reliability required in high-stakes environments. The UI uses a **custom-tuned Tailwind configuration** with specific CSS variables to achieve a minimalist, high-end aesthetic that stands out from cluttered, standard crypto tools.

## 🤖 AI Usage

I used Claude (Anthropic) as a pair programming assistant throughout this challenge. I want to be transparent about how — because I think *how* 
you use AI says more about your engineering judgment than whether you use it at all.

### My approach

I have a simple rule: AI handles the repetitive, I handle the consequential. Boilerplate, scaffolding are repetitive. Architecture, accessibility, and design decisions that affect real users — those are consequential. I never committed code I couldn't explain line by line.

### Where I pushed back on AI output

**It wanted complexity I didn't need.**
AI suggested React Router for the detail panel navigation. I said no. The challenge asked for a panel, not a page — and every dependency you 
add is a dependency you have to maintain. I implemented URL params with the native Web API instead. Shareable drawer URLs, zero extra bundle 
weight, one less thing to configure on Vercel.

**It didn't know my user.**
I'm designing for a woman CEO who opens this on a flight between meetings. She needs information hierarchy, not visual drama. I rebuilt the design system from scratch: Rose + Violet tokens on a light base, every contrast ratio manually verified against WCAG AA before touching a component.

---

**Empowering leaders through clarity.**