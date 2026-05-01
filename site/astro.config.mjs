// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://prajwalamte.github.io",
  base: "/AI-Engineering-Patterns",
  integrations: [
    starlight({
      title: "AI Engineering Patterns",
      description:
        "A structured pattern library for engineers building AI systems in production. Named patterns with trade-offs, implementation guides, and code examples.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/PrajwalAmte/AI-Engineering-Patterns",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/PrajwalAmte/AI-Engineering-Patterns/edit/main/site/",
      },
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/og-image.png",
          },
        },
        {
          tag: "script",
          attrs: { type: "module" },
          content: `
            let mermaid;
            const diagramSelector = "pre.mermaid";

            const mermaidTheme = () =>
              document.documentElement.dataset.theme === "light" ? "default" : "dark";

            async function ensureMermaid() {
              if (mermaid) return mermaid;
              const mod = await import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs");
              mermaid = mod.default;
              return mermaid;
            }

            async function renderMermaidDiagrams() {
              const diagrams = document.querySelectorAll(diagramSelector);
              if (!diagrams.length) return;

              try {
                const m = await ensureMermaid();
                m.initialize({
                  startOnLoad: false,
                  theme: mermaidTheme(),
                });

                for (const el of diagrams) {
                  el.removeAttribute("data-processed");
                }

                await m.run({ querySelector: diagramSelector });
              } catch (error) {
                console.error("Mermaid render failed:", error);
              }
            }

            document.addEventListener("DOMContentLoaded", renderMermaidDiagrams);
            document.addEventListener("astro:page-load", renderMermaidDiagrams);
            document.addEventListener("astro:after-swap", renderMermaidDiagrams);
          `,
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            { label: "Introduction", slug: "guides/getting-started" },
            { label: "Decision Guide", slug: "guides/decision-guide" },
            { label: "Glossary", slug: "guides/glossary" },
          ],
        },
        {
          label: "Library",
          items: [
            { label: "Browse All Patterns", slug: "patterns" },
            { label: "Pattern Graph", slug: "graph" },
          ],
        },
        {
          label: "Case Studies",
          items: [
            { label: "Perplexity AI – Real-Time Search", slug: "case-studies/perplexity-ai" },
          ],
        },
        {
          label: "Pillars",
          items: [
            { label: "Inference & Serving", slug: "patterns/inference-and-serving" },
            { label: "Data Patterns", slug: "patterns/data-patterns" },
            { label: "Reliability & Resilience", slug: "patterns/reliability" },
            { label: "Retrieval & Memory", slug: "patterns/retrieval-and-memory" },
            { label: "Observability", slug: "patterns/observability" },
            { label: "Security & Trust", slug: "patterns/security-and-trust" },
            { label: "Cost & Efficiency", slug: "patterns/cost-and-efficiency" },
            { label: "Governance", slug: "patterns/governance" },
            { label: "Graph Patterns", slug: "patterns/graph-patterns" },
            { label: "Evaluation & Testing", slug: "patterns/evaluation-and-testing" },
          ],
        },
      ],
    }),
  ],
});
