import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "Admin" | "Agent" | "Branch Manager" | "Marketing" | "Management";

interface RoleContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
}

const RoleContext = createContext<RoleContextType>({
  role: "Admin",
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("Admin");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}

// Role-based nav permissions
export const roleNavPermissions: Record<UserRole, string[]> = {
  Admin: ["all"],
  Agent: ["/", "/communication-engine", "/channel-manager", "/help-documents"],
  "Branch Manager": ["/", "/communication-engine", "/analytics", "/system-layer", "/crm-integration", "/help-documents"],
  Marketing: ["/", "/campaign-engine", "/template-manager", "/analytics", "/help-documents"],
  Management: ["/", "/analytics", "/system-layer", "/campaign-engine", "/crm-integration", "/help-documents"],
};

export const roleColors: Record<UserRole, { bg: string; text: string; border: string }> = {
  Admin: { bg: "rgba(99,102,241,0.2)", text: "#A78BFA", border: "rgba(99,102,241,0.4)" },
  Agent: { bg: "rgba(0,201,177,0.2)", text: "#00C9B1", border: "rgba(0,201,177,0.4)" },
  "Branch Manager": { bg: "rgba(245,158,11,0.2)", text: "#FCD34D", border: "rgba(245,158,11,0.4)" },
  Marketing: { bg: "rgba(236,72,153,0.2)", text: "#F9A8D4", border: "rgba(236,72,153,0.4)" },
  Management: { bg: "rgba(16,185,129,0.2)", text: "#6EE7B7", border: "rgba(16,185,129,0.4)" },
};
