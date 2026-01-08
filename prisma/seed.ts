import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config();
const prisma = new PrismaClient();

const YOUR_STACKAUTH_USER_ID = "cf152887-822e-477e-a5eb-bedefd36b8da";

async function main() {
  console.log('🌱 Starting seed...');

  // First, ensure the user exists in your database
  const user = await prisma.user.upsert({
    where: { id: YOUR_STACKAUTH_USER_ID },
    update: {},
    create: {
      id: YOUR_STACKAUTH_USER_ID,
      email: "aboyejiisaac@gmail.com",
      name: "Izyko",
    },
  });

  console.log('Created/updated user:', user);

  // Now create products with the StackAuth user ID
  await prisma.product.createMany({
    data: Array.from({ length: 25 }, (_, i) => ({
      name: `Product ${i + 1}`,
      userId: YOUR_STACKAUTH_USER_ID,
      quantity: Math.floor(Math.random() * 100),
      price: parseFloat((Math.random() * 1000).toFixed(2)),
    })),
  });

  console.log(`✅ Created 25 products for user: ${YOUR_STACKAUTH_USER_ID}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });