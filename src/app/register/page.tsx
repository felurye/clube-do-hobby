import type { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Criar conta | Clube do Hobby",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
