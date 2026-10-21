# Smart Business Operating System — Proposed Database Design

**Status:** Initial relational model for review. Validate fields and access rules through interviews and supervisor approval. It is not a production security design.

## Relationships

```text
Business 1---* User
Business 1---* Customer
Business 1---* Transaction
Business 1---* Task
Business 1---* Activity
User     1---* Task (assignee)
User     1---* Transaction (recorder)
User     1---* Activity (actor, optional)
Customer 1---* Transaction (optional customer link)
```

## Proposed tables

| Table | Proposed fields | Purpose |
|---|---|---|
| `businesses` | `id` (PK), `name`, `created_at` | Owns and separates business records. |
| `users` | `id` (PK), `business_id` (FK), `name`, `email`, `password_hash`, `role`, `created_at`, `is_active` | Sign-in identity and assigned role. Store only a securely hashed password; never store plaintext credentials. |
| `customers` | `id` (PK), `business_id` (FK), approved customer fields, `created_at`, `updated_at`, `archived_at` (nullable) | Customer records; archive by setting `archived_at`, rather than deleting transaction history. |
| `transactions` | `id` (PK), `business_id` (FK), `customer_id` (nullable FK), `recorded_by` (FK to users), `type` (sale/payment), `amount`, `occurred_at`, approved reference/notes, `created_at` | Transaction history. Confirm whether payments and sales need separate fields or a different model. |
| `tasks` | `id` (PK), `business_id` (FK), `title`, approved details, `assigned_to` (FK to users), `due_at`, `status`, `created_by` (FK to users), `created_at`, `updated_at` | Assigned work and completion status. |
| `activities` | `id` (PK), `business_id` (FK), `actor_user_id` (nullable FK), `action`, `record_type`, `record_id`, `created_at` | Minimal recent-activity feed for the dashboard. Avoid storing sensitive record contents in activity descriptions. |

## Integrity and access rules to validate

- Every business-owned record includes `business_id`; enforce it in server-side queries and authorization checks, not only in the UI.
- Verify that referenced users belong to the same business as each task, transaction, or activity.
- Define approved `role`, transaction `type`, and task `status` values with the supervisor; do not infer permissions from UI visibility.
- Require positive transaction amounts unless research and supervisor approval establish a different convention.
- Use database constraints and indexes appropriate to the approved database (for example, business-scoped customer search and date-range reporting).
- Store `password_hash` using an established authentication library and current password-hashing algorithm; never log or return it.
- Retain transaction history when a customer is archived. Define retention and deletion policy before using real data.

## Decisions still required

- Approved stack and database engine.
- Business/user onboarding and role/permission matrix.
- Customer fields, transaction semantics, currencies, and task statuses.
- Whether `activities` must record all changes or only selected dashboard events.
- Retention, backup, and privacy requirements.

This proposal intentionally excludes integrations, messaging, inventory, payroll, and other features not listed in the first-version brief.
