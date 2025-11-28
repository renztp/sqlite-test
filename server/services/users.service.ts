import { prisma } from '../lib/prisma';

export async function findUser(email: string, phone: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
      phone
    }
  })

  if(!existingUser) {
    throw new Error('User not found with those credentials.');
  }
  return existingUser;
}
