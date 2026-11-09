export type Role = "ADMIN" | "MODERATOR" | "MEMBER";

const roleOrder: Record<Role, number> = {
  MEMBER: 0,
  MODERATOR: 1,
  ADMIN: 2,
};

export function hasAtLeastRole(role: Role | undefined, required: Role): boolean {
  if (!role) return false;
  return roleOrder[role] >= roleOrder[required];
}

export function isAdmin(role: Role | undefined): boolean {
  return role === "ADMIN";
}

export function isModeratorOrAbove(role: Role | undefined): boolean {
  return hasAtLeastRole(role, "MODERATOR");
}
