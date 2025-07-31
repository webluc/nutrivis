
export enum UserRole {
  Admin = "admin",
  Nutritionist = "nutritionist",
  Owner = "owner",
  Manager = "manager",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedStoreIds?: string[];
  password?: string; // Should be handled securely, here for mock purposes
  forcePasswordChange?: boolean;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  managerIds: string[];
  nutritionistIds: string[];
}

export enum ChecklistStatus {
  Conforme = "Conforme",
  NaoConforme = "Não Conforme",
  NaoAplica = "Não se Aplica",
  Pendente = "Pendente",
}

export interface ChecklistItemData {
  status: ChecklistStatus;
  comment: string;
  photoUrls: string[];
}

export interface Inspection {
  id: string;
  storeId: string;
  storeName: string;
  nutritionistId: string;
  status: "draft" | "completed";
  startedAt: Date | null;
  endedAt: Date | null;
  checklist: Record<string, ChecklistItemData>;
}

export interface ChecklistItemDef {
  id: string;
  text: string;
}

export interface ChecklistSectionDef {
  id: string;
  title: string;
  items: ChecklistItemDef[];
}
