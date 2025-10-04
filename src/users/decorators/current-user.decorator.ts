import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    data:
      | keyof {
          sub: number;
          email: string;
        }
      | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user; // Assuming user is attached to the request
  },
);
