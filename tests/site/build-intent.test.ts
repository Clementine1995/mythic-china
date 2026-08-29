import { describe, expect, it } from "vitest";

import { BuildIntentError, readBuildIntent } from "../../src/site/build-intent";

describe("page build intent", () => {
  it("accepts the explicit M4-U2 review intent", () => {
    expect(readBuildIntent("review")).toBe("review");
  });

  it.each([undefined, "", "public", "production", "draft"])(
    "fails closed for unsupported intent %s",
    (value) => {
      expect(() => readBuildIntent(value)).toThrow(BuildIntentError);
    },
  );
});
