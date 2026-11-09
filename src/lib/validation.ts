import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().toLowerCase().email("E-mail invalido."),
  password: z.string().min(8, "A senha precisa ter no minimo 8 caracteres."),
});

export type RegisterInput = z.infer<typeof registerSchema>;

const optionalText = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((value) => (value ? value : undefined));

export const indicacaoSchema = z.object({
  title: z.string().trim().min(2, "Informe um nome.").max(120),
  categoryId: z.string().min(1, "Escolha uma categoria."),
  description: z.string().trim().min(10, "Descreva em poucas palavras o que e essa indicacao.").max(2000),
  address: optionalText,
  neighborhood: optionalText,
  city: optionalText,
  phone: optionalText,
  instagram: optionalText,
});

export type IndicacaoInput = z.infer<typeof indicacaoSchema>;

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Informe um nome para a categoria.").max(60),
});

export const reviewSchema = z.object({
  stars: z.coerce.number().int().min(1, "Escolha de 1 a 5 estrelas.").max(5, "Escolha de 1 a 5 estrelas."),
  recommend: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export const commentSchema = z.object({
  body: z.string().trim().min(1, "Escreva um comentário.").max(1000),
});

export const reportSchema = z.object({
  reason: z.string().trim().min(5, "Explique em poucas palavras o motivo.").max(500),
});
