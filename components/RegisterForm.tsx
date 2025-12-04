"use client";

import { useActionState, useState, ChangeEvent } from "react";
import { registerAction } from "@/actions/register-action";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const t = useTranslations("Auth"); // 👈 Cargar traducciones
  const [state, action, isPending] = useActionState(registerAction, {
    error: null,
    success: false,
  });

  // 1. Estado para controlar el checkbox
  const [useSameData, setUseSameData] = useState(false);

  // 2. Estado para guardar los valores de los inputs
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    identificador: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    web: "",
    direccion: "",
    codigoPostal: "",
    localizacion: "",
    // Datos empresa
    empresa: "",
    identificadorFiscalEmpresa: "",
    direccionEmpresa: "",
    codigoPostalEmpresa: "",
    localizacionEmpresa: "",
  });

  // Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Si el checkbox está marcado, sincronizamos en tiempo real
      if (useSameData) {
        if (
          name === "nombre" ||
          name === "apellidoUno" ||
          name === "apellidoDos"
        ) {
          newData.empresa =
            `${newData.nombre} ${newData.apellidoUno} ${newData.apellidoDos}`.trim();
        }
        if (name === "identificador")
          newData.identificadorFiscalEmpresa = value;
        if (name === "direccion") newData.direccionEmpresa = value;
        if (name === "codigoPostal") newData.codigoPostalEmpresa = value;
        if (name === "localizacion") newData.localizacionEmpresa = value;
      }

      return newData;
    });
  };

  // Función al marcar/desmarcar el checkbox
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseSameData(isChecked);

    if (isChecked) {
      // Al marcar, copiamos todo lo que haya escrito hasta ahora
      setFormData((prev) => ({
        ...prev,
        empresa:
          `${prev.nombre} ${prev.apellidoUno} ${prev.apellidoDos}`.trim(),
        identificadorFiscalEmpresa: prev.identificador,
        direccionEmpresa: prev.direccion,
        codigoPostalEmpresa: prev.codigoPostal,
        localizacionEmpresa: prev.localizacion,
      }));
    } else {
      // Opcional: ¿Quieres borrar los datos al desmarcar?
      // Normalmente es mejor dejarlos por si el usuario solo quiere editar un detalle.
      // (No hacemos nada, dejamos los datos ahí para que los edite).
    }
  };

  if (state.success) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl">
          📩
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-800">
          {t("successTitle")}
        </h3>
        <p className="text-gray-600 mb-6">{t("successMsg")}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4 text-left">
      {/* --- DATOS PERSONALES --- */}
      <div className="space-y-3">
        <h4 className="border-b pb-1 text-xs font-bold uppercase tracking-wide text-gray-400">
          {t("personalData")}
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder={t("placeholders.name")}
            required
            className="input-style"
          />
          <input
            name="apellidoUno"
            value={formData.apellidoUno}
            onChange={handleChange}
            placeholder={t("placeholders.surname1")}
            required
            className="input-style"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="apellidoDos"
            value={formData.apellidoDos}
            onChange={handleChange}
            placeholder={t("placeholders.surname2")}
            className="input-style"
          />
          <input
            name="identificador"
            value={formData.identificador}
            onChange={handleChange}
            placeholder={t("placeholders.dni")}
            required
            className="input-style"
          />
        </div>

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder={t("emailLabel")}
          required
          className="input-style w-full"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder={t("passwordLabel")}
            required
            className="input-style"
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder={t("confirmPassword")}
            required
            className="input-style"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder={t("placeholders.phone")}
            className="input-style"
          />
          <input
            name="web"
            value={formData.web}
            onChange={handleChange}
            placeholder={t("placeholders.web")}
            className="input-style"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder={t("placeholders.address")}
            className="input-style col-span-3 sm:col-span-2"
          />
          <input
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
            placeholder={t("placeholders.cp")}
            className="input-style col-span-3 sm:col-span-1"
          />
        </div>
        <input
          name="localizacion"
          value={formData.localizacion}
          onChange={handleChange}
          placeholder={t("placeholders.city")}
          className="input-style w-full"
        />
      </div>

      {/* --- CHECKBOX --- */}
      <div className="flex items-center gap-2 py-2">
        <input
          type="checkbox"
          id="sameData"
          checked={useSameData}
          onChange={handleCheckboxChange}
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
        />
        <label
          htmlFor="sameData"
          className="text-sm text-gray-600 cursor-pointer select-none"
        >
          {t("useSameData")}
        </label>
      </div>

      {/* --- DATOS EMPRESA --- */}
      <div
        className={`space-y-3 transition-opacity duration-300 ${
          useSameData ? "opacity-80" : "opacity-100"
        }`}
      >
        <h4 className="border-b pb-1 text-xs font-bold uppercase tracking-wide text-gray-400">
          {t("companyData")}
        </h4>

        <input
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          placeholder={t("placeholders.companyName")}
          className="input-style w-full"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="identificadorFiscalEmpresa"
            value={formData.identificadorFiscalEmpresa}
            onChange={handleChange}
            placeholder={t("placeholders.cif")}
            className="input-style"
          />
          <input
            name="localizacionEmpresa"
            value={formData.localizacionEmpresa}
            onChange={handleChange}
            placeholder={t("placeholders.city")}
            className="input-style"
          />
        </div>
        {/* ... resto inputs de empresa igual ... */}
      </div>

      {state?.error && (
        <div className="rounded-md bg-red-50 p-2 text-sm text-red-500 border border-red-200 text-center">
          🚨 {state.error}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className={`w-full ... (clases iguales) ...`}
        >
          {isPending ? t("creating") : t("registerBtn")}
        </button>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #000;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 1px #22c55e;
        }
      `}</style>
    </form>
  );
}
