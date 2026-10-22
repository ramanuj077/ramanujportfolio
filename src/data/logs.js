export const missionLogs = [
  {
    id: "log-024",
    slug: "why-i-built-my-own-research-paper-recommender",
    logNumber: "024",
    logCode: "MISSION LOG // 024",
    title: "Why I Built My Own Research Paper Recommender",
    subtitle: "Rethinking Semantic Discovery, Reciprocal Rank Fusion, and Vector DB Trade-offs",
    date: "22 OCT 2026",
    readTime: "8 MIN READ",
    tags: ["AI", "NLP", "RESEARCH", "SEARCH"],
    relatedMissions: ["repas", "zentov"],
    abstract:
      "Keyword search fails when terminology diverges, yet pure dense vector search often blurs precise mathematical symbols and acronyms. Here is how I architected a hybrid retrieval pipeline combining BM25 inverted indices with quantized embeddings.",
    content: `
### The Failure Mode of Naive Search

When conducting literature surveys in machine learning and distributed systems, two search failure modes consistently emerge:

1. **Vocabulary Mismatch**: Two papers describing identical mechanisms using different nomenclature (e.g., *"Byzantine fault tolerance"* vs. *"adversarial crash-recovery consensus"*). Lexical search engines like standard ArXiv or Google Scholar keyword queries fail here unless you happen to guess the author's exact phrasing.
2. **Semantic Blurring**: Conversely, when you search with pure dense embeddings (like standard OpenAI \`text-embedding-3\` or \`MiniLM\`), queries with precise acronyms like *\"PBFT vs. Raft latency in WAN\"* get pulled toward broad generic consensus overviews rather than the exact benchmark comparisons you need.

To fix this, I decided to engineer **REPAS** as a ground-up hybrid retrieval engine.

\`\`\`
┌──────────────────┐       ┌──────────────────┐
│   Query String   │       │   Document Base  │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
   ┌─────┴───────────────┐          │
   ▼                     ▼          │
┌──────────────┐ ┌──────────────┐   │
│ BM25 Sparse  │ │ Bi-Encoder   │   │
│ Lexical Rank │ │ Dense Vector │   │
└──────┬───────┘ └──────┬───────┘   │
       │                │           │
       ▼                ▼           ▼
   ┌──────────────────────────────────┐
   │ Reciprocal Rank Fusion (RRF)     │
   │ Score = Σ [1 / (k + rank(d))]    │
   └────────────────┬─────────────────┘
                    ▼
          ┌───────────────────┐
          │ Top-20 Candidates │
          └─────────┬─────────┘
                    ▼
          ┌───────────────────┐
          │  Cross-Encoder    │
          │  Reranker (INT8)  │
          └─────────┬─────────┘
                    ▼
             Ordered Results
\`\`\`

---

### Step 1: Hybrid Retrieval via Reciprocal Rank Fusion (RRF)

Instead of attempting to normalize cosine similarities (ranging from 0.4 to 0.9) with unbounded BM25 scores (ranging from 0 to 45+), Reciprocal Rank Fusion computes rank scores independently of scale:

$$RRF\\_Score(d \\in D) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}$$

Where:
- $M$ is the set of retrieval models (BM25, Dense Cosine).
- $r_m(d)$ is document $d$'s ordinal rank in model $m$.
- $k$ is a constant smoothing parameter (empirically set to $60$).

\`\`\`python
def reciprocal_rank_fusion(lexical_results: list[str], dense_results: list[str], k: int = 60):
    rrf_scores = {}
    
    for rank, doc_id in enumerate(lexical_results):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
        
    for rank, doc_id in enumerate(dense_results):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
        
    sorted_candidates = sorted(rrf_scores.items(), key=lambda item: item[1], reverse=True)
    return [doc_id for doc_id, score in sorted_candidates]
\`\`\`

This simple algorithmic shift yielded an immediate 18% improvement in reciprocal rank precision over single-vector retrieval alone.

---

### Step 2: The Cross-Encoder Latency Wall

A bi-encoder computes vector embeddings for query and document separately:
$$\\vec{q} = f(Q), \\quad \\vec{d} = f(D)$$
Similarity is computed via a dot product $\\vec{q} \\cdot \\vec{d}$. It's blazingly fast ($O(1)$ lookup via HNSW graphs), but the model never allows individual query tokens to cross-attend directly with document tokens.

A **cross-encoder**, however, concatenates the query and document into a single sequence:
$$[CLS] \\circ Q \\circ [SEP] \\circ D$$
All tokens attend to all other tokens across all transformer layers. The ranking quality is vastly superior, but running this across 5,000 papers per query takes over 4 seconds on a CPU.

**The Solution:**
Run the hybrid BM25 + Vector step to prune the search space down to the top 20 candidates in under 35ms. Then feed only those 20 candidates into a lightweight INT8-quantized cross-encoder (\`ms-marco-MiniLM-L-6-v2\`). Total latency: **118ms**.

---

### Key Takeaways for Systems Engineers

1. **Don't jump straight to managed Vector DBs**: For under 100,000 documents, an in-memory FAISS index or SQLite with \`sqlite-vss\` is faster, vastly cheaper, and trivial to back up compared to running a distributed cluster.
2. **Chunking is 70% of the battle**: Breaking text naively at 512 tokens splits equations and methodology sections in half. Splitting by Markdown headings preserves semantic coherence.
3. **Always evaluate edge cases**: Test queries that contain exact variable names (e.g. \`epsilon-greedy\`, \`RAFT leader election\`). If your search engine doesn't return the exact definition first, your lexical fallback is misconfigured.
`
  },
  {
    id: "log-019",
    slug: "architecting-real-time-state-synchronization",
    logNumber: "019",
    logCode: "MISSION LOG // 019",
    title: "Architecting Real-Time State Synchronization with Redis Pub/Sub",
    subtitle: "Zero-Drift Multiplayer Game State & Clock Arbitration Under Jitter",
    date: "14 SEP 2026",
    readTime: "6 MIN READ",
    tags: ["BACKEND", "REDIS", "WEBSOCKETS", "DISTRIBUTED"],
    relatedMissions: ["quizito"],
    abstract:
      "When building QUIZITO, client clock desynchronization threatened competitive fairness. Here is how I constructed a server-authoritative state machine with Redis Pub/Sub and delta timing.",
    content: `
### The Illusion of Client Timers

In competitive assessment software or live quiz engines, you cannot trust client hardware timers. If you send a payload saying:

\`\`\`json
{
  "question_id": 412,
  "time_remaining_seconds": 15
}
\`\`\`

And expect the client to trigger an answer lock after 15 seconds, you introduce three critical failure points:
1. **Clock drift & manipulation**: A malicious user can freeze their local event loop or alter their system clock by 3 seconds to buy extra contemplation time.
2. **Network latency jitter**: A user on a 250ms high-ping cellular connection receives the timer late, giving them an unfair disadvantage.
3. **Socket disconnection**: A momentary Wi-Fi hiccup resets the local timer state, leaving the client in an indeterminate state.

---

### The Architecture: Server-Authoritative Delta Timing

To achieve absolute parity across hundreds of concurrent participants, we designed a server-authoritative tick engine.

\`\`\`
   ┌──────────────────────────────────────────────┐
   │         WebSocket Edge Node (Node.js)        │
   │                                              │
   │  Client A (Ping: 22ms)   Client B (Ping: 140ms)
   └──────────────────────┬───────────────────────┘
                          │
                   Pub/Sub Channels
                          │
   ┌──────────────────────▼───────────────────────┐
   │             Redis Master Cluster             │
   │  • Room Hash: State, Active Q, Expiry Epoch  │
   │  • Submissions: Sorted Set (ZADD by nano-ts) │
   └──────────────────────────────────────────────┘
\`\`\`

Instead of broadcasting durations, the server issues a monotonic server timestamp representing the exact expiration boundary:

\`\`\`json
{
  "event": "QUESTION_ACTIVE",
  "room_id": "STATION_ALPHA",
  "server_epoch_ms": 1729603200150,
  "expires_at_epoch_ms": 1729603215150
}
\`\`\`

When a response arrives at the server edge, the arrival timestamp is recorded immediately at the TCP socket layer:

\`\`\`javascript
const arrivalTime = Date.now();
const timeDelta = expiresAt - arrivalTime;

if (timeDelta < -GRACE_PERIOD_MS) {
  // Reject submission: Expired
  return rejectSubmission(socket, "TIME_EXPIRED");
}

// Score dynamically decayed logarithmically by latency
const score = calculateDecayedScore(basePoints, timeDelta, totalDuration);
await redis.zadd(\`room:\${roomId}:scores\`, score, participantId);
\`\`\`

---

### Redis Pub/Sub vs. Redis Streams: The Trade-off

For live ephemeral game rooms:
- **Redis Pub/Sub** provides sub-millisecond fire-and-forget message dispatch across all horizontal WebSocket worker nodes. However, messages are not persisted. If a client drops, Pub/Sub will not replay missed events.
- **Solution**: We store the current canonical state snapshot in a Redis Hash (\`HSET room:101 state "QUESTION_3"\`). When a disconnected client reconnects, it queries the state snapshot first before re-subscribing to the live Pub/Sub channel.

This hybrid approach yielded sub-10ms broadcast latency with 100% state recovery after simulated socket disconnects.
`
  },
  {
    id: "log-012",
    slug: "building-clean-fastapis-for-ml-pipelines",
    logNumber: "012",
    logCode: "MISSION LOG // 012",
    title: "Building Clean FastAPIs for Machine Learning Pipelines: Beyond the Tutorial",
    subtitle: "Handling Async Event Loops, Worker Processes, and Tensor Memory Overhead",
    date: "03 AUG 2026",
    readTime: "7 MIN READ",
    tags: ["PYTHON", "FASTAPI", "MLOPS", "BACKEND"],
    relatedMissions: ["zentov", "autotend"],
    abstract:
      "Most FastAPI machine learning tutorials show you how to load a model at module level and call model.predict() inside an async endpoint. In production, this blocks the event loop and leaks memory. Here is how to do it right.",
    content: `
### The Classic Antipattern: Blocking the Async Event Loop

The most frequent mistake when serving machine learning models in Python:

\`\`\`python
# WARNING: DO NOT DO THIS
@app.post("/predict")
async def predict(data: InputPayload):
    # PyTorch/TensorFlow CPU inference is CPU-bound!
    # Calling it inside an 'async def' blocks the entire Python asyncio event loop!
    result = model.predict(data.tensor)
    return {"prediction": result}
\`\`\`

Because Python's \`asyncio\` event loop runs on a single thread, executing a CPU-intensive matrix multiplication blocks all other incoming HTTP connections from being accepted until the tensor computation concludes.

---

### Solution 1: Thread Pools for CPU-Bound Inference

In FastAPI, if an endpoint is declared with regular \`def\` (instead of \`async def\`), FastAPI automatically dispatches it to an external \`ThreadPoolExecutor\`:

\`\`\`python
@app.post("/predict")
def predict_sync(data: InputPayload):
    # Runs in an external thread; does NOT block the async event loop
    result = model.forward(data.to_tensor())
    return {"result": result.tolist()}
\`\`\`

Alternatively, use \`asyncio.to_thread\`:

\`\`\`python
@app.post("/predict")
async def predict_async(data: InputPayload):
    tensor_input = await preprocess(data)
    result = await asyncio.to_thread(model.forward, tensor_input)
    return {"result": result.tolist()}
\`\`\`

---

### Solution 2: Lifespan Handlers & Model Preloading

Loading models on the initial request causes huge cold-start spikes. Use modern FastAPI Lifespan context managers:

\`\`\`python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ground initialization: Load model weights into memory before accepting traffic
    logger.info("Initializing neural inference pipeline...")
    app.state.model = load_quantized_model("./weights/model_int8.bin")
    app.state.tokenizer = AutoTokenizer.from_pretrained("./weights/tokenizer")
    yield
    # Graceful shutdown: Release VRAM/RAM buffers
    logger.info("Deallocating inference buffers...")
    del app.state.model
    del app.state.tokenizer
\`\`\`

This guarantees deterministic startup checks and safe resource cleanup on SIGTERM.
`
  },
  {
    id: "log-007",
    slug: "from-raw-c-to-distributed-systems",
    logNumber: "007",
    logCode: "MISSION LOG // 007",
    title: "From Raw C to Distributed Systems: First Year Engineering Reflections",
    subtitle: "How Low-Level Memory Thinking Informs High-Level System Architecture",
    date: "18 MAY 2026",
    readTime: "5 MIN READ",
    tags: ["SYSTEMS", "REFLECTIONS", "C", "ARCHITECTURE"],
    relatedMissions: ["zentov", "quizito"],
    abstract:
      "Why starting with pointers, memory layouts, and stack-vs-heap fundamentals makes you an order of magnitude more effective when designing cloud architectures and asynchronous workers.",
    content: `
### Mechanical Sympathy in Modern Software

Many students ask why universities like SRMIST still teach C and low-level memory allocation when the industry builds on TypeScript, Python, and cloud microservices.

After spending the past year architecting event-driven systems like ZENTOV and real-time state arbitrations in QUIZITO, the answer is crystal clear:

> **You cannot reason about distributed systems without understanding the physical limitations of the machines executing them.**

---

### What C Teaches You About Cloud Systems

1. **Memory Allocation is Never Free**: When you allocate memory in C with \`malloc\`, you confront fragmentation, cache locality, and allocation overhead. In Node.js or Python, garbage collectors hide this until you hit a 10,000 RPS burst and the V8 GC pauses execution for 400ms.
2. **Buffer Overflows & Network Packets**: Writing raw socket servers in C forces you to inspect byte offsets, endianness, and TCP packet fragmentation. When you later design REST or WebSocket payloads, you understand the exact network serialization footprint of your JSON structures.
3. **Concurrency is About Shared State**: Threads without locks result in segfaults and corrupted memory in C. In distributed systems, worker processes without distributed locks (like Redis redlocks or optimistic PostgreSQL versions) result in double-spending and inventory corruption.

The mechanics are identical; only the scale and network boundaries have expanded.
`
  }
];
