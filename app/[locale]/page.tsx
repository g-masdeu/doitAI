"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
// 👇 1. Importamos 'Variants' además de 'motion'
import { motion, Variants } from "framer-motion";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// 👇 2. Asignamos el tipo explícito ': Variants'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// 👇 3. Asignamos el tipo explícito ': Variants' aquí también
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function LandingPage() {
  const t = useTranslations("Landing");
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );
  const closeModal = () => setActiveModal(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 1. Fondo Animado (CSS) */}
      <div className="absolute inset-0 z-0 opacity-30 bg-animated-grid pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_10%,#020617_90%)] pointer-events-none"></div>

      {/* 2. Barra Superior */}
      <nav className="absolute top-0 right-0 z-50 p-6 flex gap-4 items-center">
        <LanguageSwitcher />

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          onClick={() => setActiveModal("login")}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition hidden sm:block"
        >
          {t("login")}
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal("register")}
          className="rounded-full bg-green-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-green-900/50 transition hover:bg-green-500"
        >
          {t("register")}
        </motion.button>
      </nav>

      {/* 3. Contenido Central (Animado en Cascada) */}
      <motion.div
        className="z-10 flex flex-col items-center px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LOGO LEVITANDO */}
        <motion.div
          className="relative mb-8 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          variants={itemVariants}
        >
          <Image
            src="/logo.png"
            alt="Doit AI Logo"
            width={150}
            height={150}
            className="h-auto w-auto"
            priority
          />
        </motion.div>

        {/* TEXTO PRINCIPAL */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-6xl glow-text"
        >
          {t("heroTitle")
            .split(" ")
            .map((word, i) =>
              word.toLowerCase().includes("negocio") ||
              word.toLowerCase().includes("business") ? (
                <span key={i} className="text-green-500">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
        </motion.h1>

        {/* SUBTITULO */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-xl text-lg text-slate-400"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* BOTONES PRINCIPALES */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <button
            onClick={() => setActiveModal("register")}
            className="group relative overflow-hidden rounded-lg bg-white px-8 py-3 font-bold text-green-900 transition hover:bg-gray-100"
          >
            <span className="relative z-10">Empezar Gratis</span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"></div>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModal("login")}
            className="rounded-lg border border-white/20 bg-white/5 px-8 py-3 font-bold backdrop-blur-sm transition hover:bg-white/10"
          >
            Saber más
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 4. MODALES */}
      <Modal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        title={t("login")}
      >
        <LoginForm />
        <div className="mt-4 text-center text-sm text-gray-500">
          ¿Aún no tienes cuenta?
          <button
            onClick={() => setActiveModal("register")}
            className="ml-1 text-green-600 font-medium hover:underline"
          >
            Crea una
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        title={t("register")}
      >
        <div className="max-h-[80vh] overflow-y-auto px-1 scrollbar-hide">
          <RegisterForm />
          <div className="mt-6 border-t pt-4 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?
            <button
              onClick={() => setActiveModal("login")}
              className="ml-1 text-green-600 font-medium hover:underline"
            >
              Inicia sesión
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
