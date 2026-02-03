// types.ts
export type Role = "parent" | "org" | "director";

export type FieldType = "text" | "email" | "select" | "textarea" | "multiselect";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; // for select
};

export type RoleConfig = {
  role: Role;
  title: string;
  description: string;
  submitText: string;
  fields: FieldConfig[];
};
