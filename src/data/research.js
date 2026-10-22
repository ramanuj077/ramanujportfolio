export const researchProjects = [
  {
    id: "res-001",
    slug: "neural-semantic-retrieval",
    investigationCode: "RES // 001",
    title: "Low-Resource Neural Semantic Retrieval for Technical Literature",
    subtitle: "Quantization & Latency Profiling in Domain-Specific Cross-Encoders",
    status: "EXPERIMENTING",
    statusType: "experimenting",
    focus: "Information Retrieval / NLP / Model Quantization",
    date: "2026",
    researchQuestion:
      "Can cross-encoder reranking models be INT8-quantized to operate within strict memory envelopes (<60MB) while maintaining ≥94% MRR@10 relative to FP32 baselines on dense scientific texts?",
    abstract:
      "Modern dense semantic retrieval architectures rely heavily on a two-stage paradigm: high-recall bi-encoder candidate selection followed by full-attention cross-encoder reranking. While cross-encoders provide superior contextual discriminability, their computational complexity poses prohibitive inference latency on resource-constrained deployment targets. This investigation benchmarks post-training dynamic quantization (PTQ) and knowledge distillation techniques across ArXiv CS/AI sub-corpora to determine the Pareto frontier of retrieval accuracy vs. inference cost.",
    approach: [
      "Curated a specialized evaluation benchmark of 1,200 scientific query-abstract pairs covering distributed systems, machine learning theory, and database engines.",
      "Benchmarked baseline bi-encoders (all-MiniLM-L6-v2, BGE-small-en-v1.5) against cross-encoders (ms-marco-MiniLM-L-6-v2).",
      "Applied PyTorch post-training INT8 dynamic quantization and evaluated latency across varying CPU core allocations.",
      "Analyzed failure modes where quantized models degraded (notably on mathematical notation and acronym resolution)."
    ],
    findings:
      "Initial experiments indicate dynamic INT8 quantization yields a 2.4x latency speedup on x86 CPU threads with a negligible 1.2% drop in MRR@10. However, reciprocal rank scores on queries containing mixed LaTeX symbols degrade disproportionately, suggesting token-level attention weight sensitivity in quantized embedding projections.",
    codeUrl: "https://github.com",
    paperUrl: null, // Transparently set to null / in preparation
    paperStatus: "Working Draft / Laboratory Report",
    references: [
      "Khattab, O., & Zaharia, M. (2020). ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT.",
      "Thakur, N., et al. (2021). BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models.",
      "Dettmers, T., et al. (2022). LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale."
    ]
  },
  {
    id: "res-002",
    slug: "multi-agent-code-review-latency",
    investigationCode: "RES // 002",
    title: "Blackboard Architectures for Multi-Agent Automated Code Synthesis & Verification",
    subtitle: "Evaluating Asynchronous Consensus in Multi-Model Programming Tasks",
    status: "ACTIVE",
    statusType: "active",
    focus: "Autonomous Agents / Systems Architecture / LLM Reasoning",
    date: "2026",
    researchQuestion:
      "Does an asynchronous blackboard communication topology reduce end-to-end completion latency compared to linear sequential chains in multi-agent bug localization pipelines?",
    abstract:
      "Sequential multi-agent pipelines (Architect -> Coder -> Reviewer -> Tester) suffer from compounding latency and telephone-game error propagation. This investigation designs an event-driven shared blackboard architecture where specialized agent personas publish partial hypotheses and critique concurrently. We evaluate the trade-off between total token usage, convergence wall-clock time, and bug localization precision across standard algorithmic problem sets.",
    approach: [
      "Built a modular testing harness exposing an in-memory shared state graph with publish-subscribe notification semantics.",
      "Configured three distinct agent roles: Syntax Validator (deterministic linter/compiler), Logic Critic (LLM), and Security/Edge-Case Profiler (LLM).",
      "Simulated race conditions and conflict resolution mechanisms when multiple agents propose conflicting code refactors.",
      "Benchmarked against standard sequential ReAct chains on HumanEval and LeetCode-style bug injection sets."
    ],
    findings:
      "Early test runs demonstrate a 38% reduction in wall-clock convergence time on multi-file defect tasks, as the syntax validator discards uncompilable code before the heavier reasoning critic triggers. The primary hurdle remains avoiding token duplication when updating the central blackboard state.",
    codeUrl: "https://github.com",
    paperUrl: null,
    paperStatus: "Active Experimentation",
    references: [
      "Nii, H. P. (1986). Blackboard Systems: The Blackboard Model of Problem Solving and the Evolution of Blackboard Architectures.",
      "Wu, Q., et al. (2023). AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation.",
      "Hong, S., et al. (2023). MetaGPT: Meta Programming for Multi-Agent Collaborative Framework."
    ]
  },
  {
    id: "res-003",
    slug: "citation-graph-topology",
    investigationCode: "RES // 003",
    title: "Graph Topology and Ingestion Dynamics of Academic Citation Lineages",
    subtitle: "Detecting Foundational Paper Clusters in Distributed Consensus (1990–2025)",
    status: "ARCHIVED",
    statusType: "archived",
    focus: "Graph Theory / Network Analysis / Scientific Bibliometrics",
    date: "2025",
    researchQuestion:
      "Can graph community detection algorithms accurately identify paradigm shifts and cross-domain adoptions between classical Byzantine Fault Tolerance (BFT) and modern blockchain consensus protocols?",
    abstract:
      "Citation count is an inherently lagged and biased metric for scientific influence. In this exploratory project, we constructed a citation graph of 3,400 distributed systems publications spanning three decades. By applying Louvain modularity clustering and PageRank with temporal decay weighting, we tracked how concepts like Paxos and Viewstamped Replication migrated into decentralized peer-to-peer gossip protocols.",
    approach: [
      "Extracted bibliographic relationships from DBLP and Semantic Scholar APIs across known seed authors (Lamport, Castro, Liskov, Oki).",
      "Modeled directed acyclic citation networks with NetworkX and evaluated community clusters.",
      "Calculated in-degree centrality, betweenness centrality, and authority scores using HITS algorithms.",
      "Rendered interactive force-directed graph representations."
    ],
    findings:
      "Discovered that betweenness centrality identifies breakthrough bridge papers up to 4.2 years earlier than aggregate citation velocity. Papers introducing PBFT (Castro & Liskov 1999) formed a critical structural choke-point connecting early 90s distributed transaction research with mid-2010s consensus systems.",
    codeUrl: "https://github.com",
    paperUrl: null,
    paperStatus: "Project Completed & Archived into Knowledge Base",
    references: [
      "Blondel, V. D., et al. (2008). Fast unfolding of communities in large networks.",
      "Page, L., et al. (1999). The PageRank Citation Ranking: Bringing Order to the Web.",
      "Castro, M., & Liskov, B. (1999). Practical Byzantine Fault Tolerance."
    ]
  }
];
