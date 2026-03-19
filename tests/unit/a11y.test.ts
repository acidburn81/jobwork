import { describe, expect, it } from "vitest";
import { buildFieldA11yProps } from "../../src/accessibility/form-a11y.js";

describe("buildFieldA11yProps", () => {
  it("includes both helper and error description ids when invalid", () => {
    const props = buildFieldA11yProps({
      id: "taxNo",
      hasError: true,
      descriptionId: "taxNo-help",
      errorId: "taxNo-error"
    });

    expect(props["aria-invalid"]).toBe(true);
    expect(props["aria-describedby"]).toBe("taxNo-help taxNo-error");
  });
});
