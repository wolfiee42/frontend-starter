export const RoleHierarchy: Record<string, string[]> = {
  admin: ["premium_user"],
  premium_user: ["trial_user"],
  trial_user: [],
} as const;

export const RoleBasedPermissions: Record<string, string[]> = {
  admin: ["product:delete", "product:create"],
  premium_user: ["product:update"],
  trial_user: ["product:read"],
} as const;
