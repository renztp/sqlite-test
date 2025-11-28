import { prisma } from './lib/prisma'

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@email.com',
      phone: '0000-000-000'
    }
  })

  if(user) {
    console.log("User created successfully!")
  }

  logData();
}

async function logData() {
  const users = await prisma.user.findMany();
  console.log(users);
}

await main();
