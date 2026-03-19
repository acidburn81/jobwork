export interface FieldA11yOptions {
  id: string;
  hasError: boolean;
  descriptionId?: string;
  errorId?: string;
}

export interface FieldA11yProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
}

export function buildFieldA11yProps(options: FieldA11yOptions): FieldA11yProps {
  const describedBy = [options.descriptionId, options.hasError ? options.errorId : undefined]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    id: options.id,
    "aria-invalid": options.hasError,
    ...(describedBy.length > 0 ? { "aria-describedby": describedBy } : {})
  };
}
