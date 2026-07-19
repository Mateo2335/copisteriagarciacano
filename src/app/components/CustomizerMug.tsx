"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Upload, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CustomizerMug() {
  const { addToCart } = useCart();

  // Configuration state
  const [innerColor, setInnerColor] = useState<string>("Blanco");
  const [customText, setCustomText] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // File upload state
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Price calculation
  const [unitPrice, setUnitPrice] = useState<number>(8.90);
  const [totalPrice, setTotalPrice] = useState<number>(8.90);

  const colors = [
    { name: "Blanco", hex: "#ffffff", displayHex: "#ffffff", border: "border-slate-300" },
    { name: "Azul", hex: "#3b82f6", displayHex: "#1d4ed8", border: "border-blue-300" },
    { name: "Rojo", hex: "#ef4444", displayHex: "#b91c1c", border: "border-red-300" },
    { name: "Negro", hex: "#1f2937", displayHex: "#111827", border: "border-slate-800" },
    { name: "Amarillo", hex: "#f59e0b", displayHex: "#d97706", border: "border-amber-300" },
  ];

  // Recalculate price
  useEffect(() => {
    let base = 8.90; // Base Mug

    if (customText.trim().length > 0) {
      base += 1.50;
    }

    if (uploadSuccess) {
      base += 2.55;
    }

    // Volume discount
    let volumeDiscount = 1.0;
    if (quantity >= 20) {
      volumeDiscount = 0.80; // 20% off
    } else if (quantity >= 5) {
      volumeDiscount = 0.90; // 10% off
    }

    const calculatedUnit = base * volumeDiscount;
    setUnitPrice(Number(calculatedUnit.toFixed(2)));
    setTotalPrice(Number((calculatedUnit * quantity).toFixed(2)));
  }, [innerColor, customText, uploadSuccess, quantity]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadSuccess(false);
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
        setUploadSuccess(true);
      }, 800);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      type: "taza",
      name: `Taza Personalizada (Interior ${innerColor})`,
      quantity: quantity,
      unitPrice: unitPrice,
      config: {
        mug: {
          innerColor,
          customText: customText || undefined,
          imageFile: fileName || undefined,
        },
      },
    });

    setUploadSuccess(false);
    setFileName("");
    setCustomText("");
    alert("¡Taza añadida al carrito!");
  };

  const activeColorObj = colors.find((c) => c.name === innerColor) || colors[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Mug Mockup (5 cols) */}
      <div className="lg:col-span-5 bg-slate-100 p-8 rounded-3xl border border-slate-200/50 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>

        <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-wider text-slate-400 bg-white/80 border border-slate-200 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm z-10">
          Vista Previa En Vivo
        </span>

        {/* Dynamic SVG Mug */}
        <div className="relative w-48 h-48 transition-all duration-500 hover:scale-105 select-none drop-shadow-xl z-10 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Mug Handle */}
            <path
              d="M 68,25 C 85,25 90,40 90,50 C 90,60 85,75 68,75"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 68,25 C 85,25 90,40 90,50 C 90,60 85,75 68,75"
              fill="none"
              stroke="#ffffff"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Mug Body (White outer) */}
            <path
              d="M 15,20 L 68,20 C 70,20 70,22 70,24 L 66,80 C 66,84 62,86 58,86 L 25,86 C 21,86 17,84 17,80 L 13,24 C 13,22 13,20 15,20 Z"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />

            {/* Inner Rim Color (Dynamic) */}
            <ellipse
              cx="41.5"
              cy="22"
              rx="26.5"
              ry="5"
              fill={activeColorObj.displayHex}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />

            {/* Shading/Highlights */}
            <path
              d="M 15,24 L 17,80 C 17,84 21,86 25,86 L 28,86 L 26,24 Z"
              fill="#000000"
              fillOpacity="0.03"
            />
          </svg>

          {/* Mug Custom Print Overlay */}
          <div className="absolute inset-x-12 top-14 bottom-10 flex flex-col items-center justify-center text-center p-2 border border-dashed border-sky-400/30 rounded-lg">
            {customText ? (
              <p className="font-extrabold text-[10px] break-all max-w-[80px] leading-tight text-slate-800 select-none tracking-tight">
                {customText}
              </p>
            ) : null}

            {uploadSuccess ? (
              <div className="mt-1 bg-sky-500/10 text-sky-700 text-[8px] font-bold px-1 py-0.5 rounded border border-sky-400 flex items-center gap-0.5">
                🖼️ Imagen
              </div>
            ) : !customText && (
              <span className="text-[8px] text-slate-400/70 font-semibold select-none leading-tight uppercase tracking-wider">
                Tu Diseño Aquí
              </span>
            )}
          </div>
        </div>

        <p className="text-[10px] text-slate-400 font-medium mt-4 z-10">Colores y textos son simulaciones aproximadas.</p>
      </div>

      {/* Inputs Form (7 cols) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-900">Configuración de Taza</h3>
          <p className="text-slate-400 text-xs mt-1">Taza de cerámica blanca brillante con interior de color personalizable.</p>
        </div>

        {/* Color picker */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Color del interior de la taza</span>
            <span className="text-xs font-bold text-slate-400">{innerColor}</span>
          </label>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setInnerColor(c.name)}
                className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer relative ${c.border} ${
                  innerColor === c.name ? "ring-2 ring-blue-500 scale-110" : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {innerColor === c.name && (
                  <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${
                    c.name === "Blanco" ? "text-slate-900" : "text-white"
                  }`}>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom text input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Texto personalizado (+1,50 €)</span>
            <span className="text-xs text-slate-400">{customText.length}/40 caracteres</span>
          </label>
          <input
            type="text"
            maxLength={40}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Escribe un mensaje, nombre, fecha..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold bg-slate-50"
          />
        </div>

        {/* Design upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Añadir Foto o Logotipo (+2,55 €)</span>
            {uploadSuccess && <span className="text-xs text-emerald-500 font-bold">¡Subido!</span>}
          </label>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 group">
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {isUploading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-semibold">Subiendo foto...</span>
              </div>
            ) : uploadSuccess ? (
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <Upload className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-blue-500" />
                <span>Subir fotografía o diseño para la taza</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing panel & Action */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Cantidad</label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 rounded-l-xl font-bold text-slate-600"
                >
                  -
                </button>
                <span className="px-3 py-1 font-bold text-sm text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-slate-100 rounded-r-xl font-bold text-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right sm:text-left sm:pl-6 sm:border-l sm:border-slate-100 space-y-0.5">
              <span className="block text-xs text-slate-400 font-semibold">Precio Total</span>
              <span className="text-2xl font-black text-slate-900 leading-none">
                {totalPrice.toFixed(2)} €
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">({unitPrice.toFixed(2)} € / ud)</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            Añadir al Carrito
          </button>
        </div>

        {/* Volume discounts helper */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500 text-xs font-bold">⭐ 5+ tazas:</span>
            <span>10% de descuento automático</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500 text-xs font-bold">🔥 20+ tazas:</span>
            <span>20% de descuento automático</span>
          </div>
        </div>
      </div>
    </div>
  );
}
