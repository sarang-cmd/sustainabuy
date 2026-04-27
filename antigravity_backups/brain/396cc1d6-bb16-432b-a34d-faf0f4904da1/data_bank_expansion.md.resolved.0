# SustainaBuy Data Bank Expansion Strategy

To transform SustainaBuy into a robust product discovery engine, we are integrating the following open-source databases into your "Data Bank" (Firebase).

---

## 1. Integrated Databases

### A. Open Food Facts (Groceries)
- **Source:** [Open Food Facts API](https://world.openfoodfacts.org/)
- **Focus:** 3M+ food products globally.
- **Sustainability Metric:** **Eco-Score** (A to E).
- **Integration:** We filter for products with Eco-Score "A" or "B" to ensure high sustainability.

### B. GreenDB (General Retail & Clothing)
- **Source:** [GreenDB Research Project](https://github.com/h-da/green-db)
- **Focus:** Consumer goods (Apparel, Home, Electronics) with verified sustainability labels.
- **Sustainability Metric:** EU Ecolabel, Blue Angel, and Fairtrade certifications.
- **Integration:** Curated import of top-rated products across fashion and home decor.

### C. TCO Certified (Electronics/IT)
- **Source:** [TCO Development](https://tcocertified.com/)
- **Focus:** Sustainable IT products (Laptops, Monitors, Phones).
- **Sustainability Metric:** TCO Certified Generation 9.
- **Integration:** Focused on high-longevity and repairable electronics.

---

## 2. Technical Implementation: Automated Sync Script

I have created a new utility, `lib/data-bank-sync.ts`, which acts as the bridge between these external databases and your Firebase Data Bank.

### How it works:
1. **Fetch:** It queries external APIs (like Open Food Facts).
2. **Transform:** It maps the external data format to your `Product` interface.
3. **Upsert:** It saves the products into your Firestore collection with unique IDs (slugs).

---

## 3. Recommended Workflow

### Batch Import (One-Time)
Run the sync script to populate your database with an initial 1,000+ sustainable products.

### Real-Time Discovery (Ongoing)
When a user searches for a product not in your data bank, the **Global Indexer** (Phase 2) will scan these databases and add them "on-the-fly" to your collection.

> [!TIP]
> To maintain the "Premium" feel of SustainaBuy, only products with a **Sustainability Score > 80** should be auto-added to the public library. Products with lower scores can be shown in results but marked as "Not Recommended".
