# Smart Business Operating System — Draft Requirements

**Status:** Draft for user research and supervisor review. These requirements are derived from the project brief, not yet validated by interviews.

## Problem and goal

Small businesses may track customers, sales, calls and messages, staff activity, and tasks in paper records or separate spreadsheets. This can make information hard to find and business performance difficult to understand. The first-version goal is one secure web application for an authorized business's daily records and basic summaries.

## Users

- **Business user:** signs in and uses functions permitted by their assigned role.
- **Staff member:** may be assigned tasks; the permitted actions for each role need confirmation through research and supervisor review.

## First-version functional requirements

1. **Sign-in and access:** An authorized user can sign in. The system restricts records and actions according to the user's assigned role and business.
2. **Dashboard:** A signed-in user can see customer and sales summaries, pending tasks, and recent activity.
3. **Customers:** A permitted user can add, view, update, search, and archive customer records.
4. **Sales and payments:** A permitted user can record a sale or payment and view transaction history.
5. **Tasks:** A permitted user can create a task, assign it to a staff member, set a due date, and track its status.
6. **Reports:** A permitted user can select a date range and view sales totals and completed/pending task summaries.
7. **Validation and errors:** The system validates required input and communicates errors without silently losing or accepting invalid data.

## Quality, privacy, and scope constraints

- Use sample data during development. Do not enter real customer or financial data without written permission.
- Protect sign-in credentials and enforce authorization on the server for every business record.
- Do not publish passwords, API keys, or private business information.
- Treat the app as a prototype until it has been tested and approved for real business use.
- Do not add features beyond the agreed first version without supervisor approval.

## Open questions for interviews and supervisor

- Which business types and daily workflows should the prototype prioritize?
- Which customer fields are necessary, and what does “archive” mean to users?
- Should a transaction represent a sale, a payment, or both? Which fields and payment methods are needed?
- What task statuses, assignment rules, and staff roles are needed?
- Which dashboard figures and report date ranges are most useful?
- What roles and record-level access rules should be enforced?
- Which technology stack and hosting/database environment has the supervisor approved?

**Research gate:** Replace or confirm these draft requirements after 3–5 interviews. Do not treat this document as approval to build the full system.
