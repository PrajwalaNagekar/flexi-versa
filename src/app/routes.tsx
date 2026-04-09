import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { WorkflowBuilder } from "./pages/workflow-builder";
import { CommunicationEngine } from "./pages/communication-engine";
import { ChannelManager } from "./pages/channel-manager";
import { TemplateManager } from "./pages/template-manager";
import { CampaignEngine } from "./pages/campaign-engine";
import { CRMIntegration } from "./pages/crm-integration";
import { Analytics } from "./pages/analytics";
import { VoiceSolutions } from "./pages/voice-solutions";
import { SystemLayer } from "./pages/system-layer";
import { HelpDocuments } from "./pages/help-documents";
import { AdminSettings } from "./pages/admin-settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "workflow-builder", Component: WorkflowBuilder },
      { path: "communication-engine", Component: CommunicationEngine },
      { path: "channel-manager", Component: ChannelManager },
      { path: "template-manager", Component: TemplateManager },
      { path: "campaign-engine", Component: CampaignEngine },
      { path: "crm-integration", Component: CRMIntegration },
      { path: "analytics", Component: Analytics },
      { path: "voice-solutions", Component: VoiceSolutions },
      { path: "system-layer", Component: SystemLayer },
      { path: "help-documents", Component: HelpDocuments },
      { path: "admin-settings", Component: AdminSettings },
    ],
  },
]);