import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const initialCategories = [
  "Saude",
  "Alimentacao",
  "Servicos domesticos",
  "Beleza e estetica",
  "Educacao",
  "Pet",
  "Automotivo",
  "Eventos e festas",
  "Tecnologia",
  "Outros",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  for (const name of initialCategories) {
    await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) },
    });
  }
  console.log(`Seed concluida: ${initialCategories.length} categorias.`);

  const adminEmail = "admin@clubedohobby.local";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("admin1234", 10);
    await prisma.user.create({
      data: {
        name: "Admin (dev)",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`Usuario admin de teste criado: ${adminEmail} / senha: admin1234`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
