import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

const isTaxCodeMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();

  return value;
};
