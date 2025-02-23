import { SetMetadata } from '@nestjs/common';

import { Roles } from '@@types/auth.types';

export const ROLES_KEY = 'roles';
export const RolesAccept = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
