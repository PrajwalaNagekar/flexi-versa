Update the existing “Flexi Versa 1” prototype into a highly functional, enterprise-grade SaaS ERP portal for Flyworld, without changing the overall visual design style. Keep the current clean professional SaaS look, but make the product much more interactive, informative, and operationally realistic.

Important product context:
Flexi Versa 1 is not just a dashboard. It is a role-based ERP and communication ecosystem for lead management, WhatsApp automation, CRM integration, campaign execution, analytics, voice communication, compliance, and support. The interface must reflect contextual experiences for different roles such as Agent, Branch Manager, Admin, Marketing, and Management. The design should prioritize real-time feedback, system transparency, actionable insights, scalable workflows, and multi-region adaptability for UAE, UK, and Australia.

Use the attached product requirements as the source of truth:
- Role-based experience design
- Real-time feedback and system responsiveness
- Data visibility and actionable insights
- Integration transparency and system continuity
- Scalability and multi-region adaptability
- Screens and modules including login, dashboard, lead capture, conversation panel, WhatsApp flow builder, routing engine, CRM sync dashboard, pipeline view, campaign dashboard, source tracking, analytics, call management, IVR configuration, audit logs, settings, integration configuration, help & support, and admin controls

Do not redesign the product from scratch. Keep the same design language, but improve the functionality, navigation, structure, and workflow realism.

Core UI and navigation changes:
1. Make every dashboard card and major button clickable and route to the correct detailed page.
2. Add a collapse / expand sidebar toggle at the top so the main content can use the full screen width when the sidebar is hidden.
3. Ensure the main canvas and all modules remain fully visible and do not get hidden behind panels.
4. Make all screens behave like a connected enterprise web app, not isolated mock pages.
5. Add smooth navigation between sections with clear active states and breadcrumbs if needed.
6. Keep the right-side content area fully usable and responsive when users move through workflows.

Add a new top-level navigation section:
Help and Documents
This section must contain:
- Business documents
- Technical documents
- Troubleshooting guides
- Admin manuals
- CRM integration documents
- Database-related documents
- API documents
- Workflow documentation
- SOPs
- FAQs
- System limitation notes
- User onboarding guides
- A ticket-raising form for support requests

Help and Documents must also allow users to:
- search documents
- filter by category
- open a document detail view
- download or preview files
- raise a support ticket from inside the section
- see ticket status and history

Role-based experience requirements:
- Agent view: focused on conversations, lead handling, follow-ups, and assigned tasks
- Branch Manager view: lead distribution, team activity, performance metrics, SLA alerts, conversion summaries
- Admin view: system controls, routing, integrations, security, templates, user management, audit, database controls
- Marketing view: campaign creation, source tracking, audience targeting, campaign analytics
- Management view: executive dashboard, KPIs, conversion trends, alerts, regional performance

Dashboard behavior:
- All dashboard widgets must click through to their relevant module
- Total Leads should open lead management
- Active Conversations should open the conversation panel
- Conversion Rate should open analytics / funnel view
- Unassigned Leads should open routing and assignment
- Campaign Performance should open campaign analytics
- CRM Sync Status should open integration health / sync logs
- Alerts should open system notifications and SLA issues
- Every widget should feel actionable and not static

Workflow Builder requirements:
The workflow builder must be redesigned to feel like a real flowchart editor, using computer-science style nodes such as circles, diamonds, and process blocks.

It must support:
- draggable nodes
- zoom and pan
- connecting lines between nodes
- automatic connection suggestions if the user does not manually connect
- manual connection from any node to any other node
- editable node details when clicked
- a right-side or modal editor for node configuration
- save changes to a node
- reroute the workflow after editing
- node statuses such as active, pending, failed, completed
- a simulation mode button

Simulation mode requirements:
- when clicked, simulate the workflow from the first node to the last node
- display live simulation logs below the canvas
- show step-by-step execution of the workflow
- highlight nodes as they are triggered
- show success, warning, or failure states
- preserve visibility of the full workflow without hiding nodes behind the panel

Workflow node types to include:
- Trigger node
- Condition node
- Action node
- CRM update node
- WhatsApp send node
- Email send node
- SMS send node
- Voice call node
- Delay / wait node
- End node

Communication Channel Manager requirements:
The channel manager must be functional and support:
- WhatsApp Business API configuration
- email channel setup
- SMS setup
- voice platform setup
- live status indicators
- connection testing
- form-based inputs for credentials and settings
- saved configuration states
- mock data that reflects real-time operation
- buttons that open actual input dialogs, not dummy alerts

Template Manager requirements:
The template manager must be editable and support:
- WhatsApp templates
- email templates
- SMS templates
- web app pop-up messages
- website notification messages
- push notification templates
- approval status
- draft / published / archived states
- template preview
- edit / save / duplicate actions
- template variables such as customer name, country, service type, lead source

CRM Integration requirements:
The CRM pages must show:
- Zoho CRM
- Salesforce CRM
- HubSpot CRM
- custom CRM / ERP integration
- API mapping
- webhook settings
- sync status
- lead assignment logic
- error handling
- retry queue
- sync logs
- field mapping tables

Admin Settings requirements:
Add a secure admin settings area with a high-security feel.
Include:
- user management
- role-based access control
- database control
- data import / export
- data retention settings
- user retention / inactivity rules
- session timeout settings
- screen auto-lock settings
- two-factor authentication settings
- password reset controls
- API key rotation
- regeneration of secrets / credentials
- rollback controls
- audit log view

Security requirement:
For sensitive admin actions, require an additional verification step even if the admin is already logged in.
Examples:
- deleting data
- rotating keys
- exporting databases
- changing retention settings
- modifying roles
- resetting passwords
- changing authentication settings
- performing rollback or destructive operations

Add secure logout:
Place a secure logout button below the Admin User section on the left sidebar.

Voice and communication pages:
Keep the voice and communication pages functional and informative.
Include:
- voice campaign creation
- IVR configuration
- automated call reminders
- voice logs
- call status
- message logs
- delivery receipts
- mock live activity indicators

Campaigns and analytics:
The campaign and analytics sections must show:
- campaign creation flow
- campaign audience selection
- source tracking
- conversion metrics
- response rate
- campaign ROI
- lead source breakdown
- country-based reporting
- region-based routing performance
- SLA and delay alerts
- actionable analytics cards

Tickets and support:
Inside Help and Documents, include a “Raise Ticket” action that opens a proper form with:
- issue title
- category
- priority
- description
- module affected
- attachment option
- submit button
After submit, show ticket created status and ticket ID.

Additional enhancements to include:
- real-time toasts and alerts for success, failure, and sync updates
- empty states with helpful guidance
- loading states where data is being fetched
- status chips and colored indicators
- a professional enterprise information hierarchy
- a responsive layout for different screen sizes
- mock data that feels realistic for enterprise operations
- better visibility of integration health and errors
- multi-country routing behavior for UAE, UK, and Australia
- role-based screens where irrelevant controls are hidden for the current role

Functional behavior expectations:
Every important action should open a modal, side panel, detail page, or editable form with actual inputs and saved states.
Do not use non-functional placeholders.
Do not use dead buttons.
Do not use static cards that never change.
Do not hide workflow content behind panels.
Do not change the overall design language, only improve functionality and depth.

Prototype output:
Create a fully connected, clickable, enterprise-grade prototype with:
- dashboard drill-downs
- functional navigation
- workflow editor
- simulation mode
- editable templates
- channel configuration screens
- CRM integration screens
- admin security controls
- Help and Documents center
- ticketing flow
- analytics and monitoring pages
- realistic mock data and alerts

The final result should feel like a real operational system for a business client, not a visual mockup.