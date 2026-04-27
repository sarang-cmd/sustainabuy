# SustainaBuy: Search & Sustainability API Research Report

This report provides a comprehensive analysis of the tools, APIs, and methodologies required to build a high-performance, sustainability-focused product search engine. It prioritizes **free resources**, **minimal setup**, and **zero waiting time** for developers.

---

## 1. Search Functionality: Achieving Speed & Usability
To make a search function "usable" and "fast" with zero infrastructure cost and minimal setup, the best approach is **Client-Side Fuzzy Searching**.

### Recommended Tool: [Fuse.js](https://www.fusejs.io/)
Fuse.js is a lightweight fuzzy-search library that requires zero backend setup. It allows users to find products even with typos or partial matches.

#### Why it fits your requirements:
- **Free:** MIT Licensed.
- **Zero Wait:** No API keys or server configuration.
- **Fast:** Runs entirely in the user's browser (millisecond response times).
- **Setup:** 3 lines of code.

#### Implementation Strategy:
1. **Data Indexing:** Load your product data (from an API or local JSON) into a Fuse instance.
2. **Threshold Tuning:** Set the `threshold` to approximately `0.3`. This balances accuracy with "fuzziness" (allowing for minor typos like "sustaianble" instead of "sustainable").
3. **Key Weighting:** Assign higher weights to `brandName` and `productName` than to `description`.

---

## 2. Deep Dive: Good On You API
**Good On You** is the world’s leading source for sustainability ratings in fashion and beauty.

### Status for Developers: **Commercial/Professional Only**
As of 2024, Good On You does **not** offer a free, public API for individual developers or hobbyists. It is a premium product designed for enterprise integrations (e.g., retailers like Farfetch or banking apps).

### Rating Methodology (The "Three Pillars")
The Good On You rating is built on over **1,000 data points** across more than **100 material issues**. They evaluate brands on a **5-point scale**:
1. **We Avoid** (Critical issues/No disclosure)
2. **Not Good Enough** (Low transparency)
3. **It's a Start** (Some progress)
4. **Good** (Clear policies and actions)
5. **Great** (Industry leader)

#### Evaluation Categories:
- **People:** Labor rights, living wages, worker safety, and child labor policies.
- **Planet:** Resource use, carbon emissions, chemical management, and water usage.
- **Animals:** Use of fur, angora, exotic skins, and wool/leather sourcing policies.

### Data Sourcing
Good On You uses **exclusively public data**. They do not accept private data from brands, ensuring that ratings reflect what a brand is willing to state publicly and be held accountable for. They utilize:
- Brand reports and disclosures.
- Third-party indices (e.g., Fashion Transparency Index).
- Independent certifications (B Corp, Fairtrade, GOTS).

---

## 3. Free & Zero-Wait Sustainability APIs
Since the Good On You API is not free, the following resources provide immediate access to product sustainability data with zero waiting time.

### A. Open Food Facts API (The Best Overall)
- **Data:** 3M+ products globally. Includes "Eco-Score" (environmental impact) and "Nova" (processing level).
- **Access:** Truly open. No API key required for GET requests.
- **Endpoint:** `https://world.openfoodfacts.org/api/v2/product/[barcode].json`
- **Zero Wait:** You can start querying via `fetch()` immediately.

### B. Open Beauty Facts
- **Data:** Sister project to Open Food Facts, focusing on cosmetics and personal care.
- **Setup:** Identical to Open Food Facts.
- **Use Case:** Perfect for the "Beauty" segment of SustainaBuy.

### C. GreenDB (Open Dataset)
- **Data:** A massive dataset of products and their sustainability claims/ratings.
- **Access:** Downloadable as a Parquet/CSV file from Zenodo.
- **Benefit:** Since it's a file, you can host it as a local database, removing all network latency for your search.

---

## 4. Implementation Roadmap for SustainaBuy

### Phase 1: The "Instant Search" Engine (1-2 Hours)
- **Step 1:** Download a subset of the **GreenDB** dataset or use a local JSON file of top sustainable brands.
- **Step 2:** Integrate **Fuse.js** into your frontend.
- **Step 3:** Implement a "Search as you type" UI component.

### Phase 2: Live Sustainability Enrichment (2-4 Hours)
- **Step 1:** When a user clicks a product, use the **Open Food/Beauty Facts API** to fetch live Eco-Scores and ingredient data.
- **Step 2:** Display a "Sustainability Scorecard" based on the API response.

### Phase 3: Brand Research (Ongoing)
- Since no free API provides "Brand Ratings" (like Good On You), manually aggregate a list of **B Corp** or **Fairtrade** certified brands. You can find these lists for free on their respective websites and include them in your local search index.

---

## Summary Table

| Feature | Tool/API | Access | Setup Time |
| :--- | :--- | :--- | :--- |
| **Search Logic** | Fuse.js | Free (Open Source) | < 5 mins |
| **Food Sustainability** | Open Food Facts | Free (No Key) | < 5 mins |
| **Beauty Sustainability** | Open Beauty Facts | Free (No Key) | < 5 mins |
| **Brand Ratings** | Good On You | **Paid/Enterprise** | N/A |
| **Bulk Product Data** | GreenDB | Free (Open Data) | 30 mins |

> [!TIP]
> To simulate the "Good On You" experience for free, create a mapping in your database that highlights "Certified B Corp" or "PETA-Approved Vegan" brands. This data is publicly available for manual collection and adds high value to your search results.
