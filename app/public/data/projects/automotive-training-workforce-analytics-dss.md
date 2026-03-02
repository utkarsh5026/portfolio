# Automotive Training & Workforce Analytics DSS

> Transform workforce data into strategic insights 📊

## The Problem

Managing training data for **Skoda, VW, and Audi** meant wading through **200,000+ training records** scattered across Excel spreadsheets. Managers were spending **3+ days** just to produce a single performance report—by which time the data was already stale.

There was no way to track trainer effectiveness, spot skill gaps across brands, or calculate ROI on training programs. Decisions relied on gut feeling rather than evidence.

## What I Built

An enterprise analytics platform that turns raw training data into actionable intelligence in **under 5 minutes**.

### Data Processing Pipeline

The core is a **Django REST API** backed by custom **Pandas pipelines** that aggregate metrics across all three brands simultaneously. Instead of generating reports on demand and freezing the UI, heavy computations run as **Celery background workers** on a schedule—so dashboards are always showing fresh numbers when a manager opens them.

CSV imports up to **50MB** go through automatic validation with built-in error detection. If anything goes wrong, atomic rollback prevents partial writes from corrupting the dataset.

### Caching & Performance

**Redis caching** sits in front of every expensive aggregation query. Combined with **PostgreSQL read replicas** for high-availability data retrieval, query response times dropped to sub-second even during peak load.

### Visualization Layer

The frontend is built on **React + Plotly** with 10+ custom chart types chosen specifically for workforce analytics—heatmaps for trainer attendance patterns, funnel charts for program completion rates, scatter plots for performance correlation.

Managers can drill down from brand-level KPIs all the way to an individual trainer's session history in a few clicks. Any view can be exported as **PDF or Excel** for executive presentations.

### Access Control

A **JWT-based RBAC system** enforces strict data boundaries. A VW regional manager can't accidentally see Audi's confidential trainer scores. Each login tier sees only the metrics relevant to their role, and every data access is logged for compliance auditing.

## Results

| Metric                 | Before                | After              |
| ---------------------- | --------------------- | ------------------ |
| Report generation      | 3+ days               | Under 5 minutes    |
| Data source            | Scattered Excel files | Unified PostgreSQL |
| Cross-brand comparison | Impossible            | Single dashboard   |
| Trainer ROI visibility | None                  | Real-time          |

## Technical Highlights

- **Celery** for async ETL tasks with scheduled re-runs
- **Docker** containerization for consistent deployments across environments
- **Multi-tenant** architecture ensuring complete data isolation per brand
- Comprehensive audit logging for security and compliance

```python
# Example: Celery task for cross-brand aggregation
@shared_task
def aggregate_training_metrics(brand_ids: list[str], period: str):
    pipeline = TrainingPipeline(brands=brand_ids)
    metrics = pipeline.run(period=period)
    cache.set(f"metrics:{'-'.join(brand_ids)}:{period}", metrics, timeout=3600)
    return metrics
```
