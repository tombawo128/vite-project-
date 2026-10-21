# Smart Business Operating System — Low-Fidelity Wireframes

**Status:** Initial text wireframes based on the project brief. Validate page priorities and terminology in interviews; confirm scope with the supervisor before implementation.

## Shared application frame

```text
+------------------------------------------------------------------+
| Business name                         Signed-in user | Sign out  |
+----------------+-------------------------------------------------+
| Dashboard      |                                                 |
| Customers      |             Current page content                |
| Sales          |                                                 |
| Tasks          |                                                 |
| Staff / Users  |                                                 |
| Reports        |                                                 |
+----------------+-------------------------------------------------+
```

Navigation and visible actions must be limited by the signed-in user's approved role. “Staff / Users” is included only to support the brief's staff/user-account requirement; account administration details need supervisor approval.

## Dashboard

```text
+------------------------------------------------------------------+
| Dashboard                                      [Date range ▼]     |
|                                                                  |
| +----------------+ +----------------+ +------------------------+ |
| | Customers      | | Sales          | | Pending tasks          | |
| | Count          | | Total/range    | | Count                  | |
| +----------------+ +----------------+ +------------------------+ |
|                                                                  |
| Recent activity                                                  |
| Date/time       Activity                         By              |
| ...             ...                              ...             |
|                                                                  |
| [View customers] [View sales] [View tasks] [View reports]        |
+------------------------------------------------------------------+
```

## Customers

```text
+------------------------------------------------------------------+
| Customers                         [Search] [Add customer]        |
| Name             Contact (if approved)    Updated      Status     |
| ...              ...                      ...          Active     |
| Row actions: [View] [Edit] [Archive]                             |
+------------------------------------------------------------------+
| Customer details: approved fields, related transaction history    |
+------------------------------------------------------------------+
```

## Sales / transactions

```text
+------------------------------------------------------------------+
| Sales / transactions                [Date range ▼] [Record entry] |
| Date        Type      Customer       Amount       Recorded by     |
| ...         ...       ...            ...          ...            |
+------------------------------------------------------------------+
| Entry form: type (sale/payment), date, amount, customer (optional),|
|             notes/reference (if approved)                 [Save]  |
+------------------------------------------------------------------+
```

## Tasks

```text
+------------------------------------------------------------------+
| Tasks                              [Status ▼] [Create task]       |
| Task             Assigned to      Due date       Status           |
| ...              ...              ...            ...              |
+------------------------------------------------------------------+
| Task form: title, details (if approved), assignee, due date,      |
|            status                                           [Save] |
+------------------------------------------------------------------+
```

## Staff / users and reports

```text
Staff / Users                         Reports
+-----------------------------+       +------------------------------+
| Approved user list          |       | [Start date] [End date]      |
| Name/role/status            |       | Sales total                  |
| Actions per approved role   |       | Completed / pending tasks    |
+-----------------------------+       | [Run report]                 |
                                      +------------------------------+
```

User provisioning, role names, report export, and additional staff fields are not assumed. Confirm whether they are in scope before design or implementation.
