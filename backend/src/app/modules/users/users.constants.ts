export const ZodUserRoles = ['SUPERADMIN', 'ADMIN', 'USER'];

export const userFilterableFields: string[] = ['searchTerm', 'userStatus', 'role'];
export const userSearchableFields: string[] = ['email'];

export const userRelationalFields: string[] = ['firstName', 'role', 'lastName'];
export const userRelationalFieldsMapper: { [key: string]: string } = {
  firstName: 'firstName',
  lastName: 'lastName',
  role: 'role'
};
