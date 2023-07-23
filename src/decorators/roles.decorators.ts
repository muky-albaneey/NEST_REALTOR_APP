import { UserTypes } from "@prisma/client";
import { SetMetadata } from "@nestjs/common/decorators";

export const Roles = (...roles: UserTypes[]) => SetMetadata ('roles', roles)