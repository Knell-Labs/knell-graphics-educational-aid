export interface DropdownItem {
  label?: string | null;
  callback?: () => void;
  isText?: boolean;
  isDivider?: boolean;
  isFormAction?: boolean;
  formActionUrl?: string;
  formMethod?: "GET" | "POST";
}
