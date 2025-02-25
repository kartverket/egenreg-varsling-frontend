import { z, ZodErrorMap } from "zod";

const customErrorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case "invalid_type":
      if (issue.received === "undefined") {
        return { message: "Påkrevd felt" };
      }
      break;
    case "too_big":
      if (issue.type === "string") {
        return {
          message: `Maks ${issue.maximum} tegn er tillatt.`,
        };
      }
      break;
    default:
      break;
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
