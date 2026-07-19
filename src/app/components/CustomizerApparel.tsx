"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Upload, Shirt, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CustomizerApparel() {
  const { addToCart } = useCart();

  // Configuration state
  const [size, setSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [color, setColor] = useState<string>("Blanco");
  const [customText, setCustomText] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // File upload state
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Price calculation
  const [unitPrice, setUnitPrice] = useState<number>(12.50);
  const [totalPrice, setTotalPrice] = useState<number>(12.50);

  const colors = [
    { name: "Blanco", hex: "#ffffff", border: "border-slate-300" },
    { name: "Negro", hex: "#111827", border: "border-slate-800" },
    { name: "Azul Marino", hex: "#1e3a8a", border: "border-blue-900" },
    { name: "Rojo", hex: "#dc2626", border: "border-red-700" },
    { name: "Gris", hex: "#6b7280", border: "border-gray-500" },
  ];

  // Recalculate price
  useEffect(() => {
    let base = 12.50; // Base T-shirt

    // Add cost for custom text
    if (customText.trim().length > 0) {
      base += 2.00;
    }

    // Add cost for design file upload
    if (uploadSuccess) {
      base += 3.50;
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
  }, [color, size, customText, uploadSuccess, quantity]);

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
      type: "camiseta",
      name: `Camiseta Personalizada (${size} - ${color})`,
      quantity: quantity,
      unitPrice: unitPrice,
      config: {
        apparel: {
          size,
          color,
          customText: customText || undefined,
          imageFile: fileName || undefined,
        },
      },
    });

    setUploadSuccess(false);
    setFileName("");
    setCustomText("");
    alert("¡Camiseta añadida al carrito!");
  };

  // Get hex color for selected shirt color option
  const activeColorObj = colors.find((c) => c.name === color) || colors[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Canvas Mockup (5 cols) */}
      <div className="lg:col-span-5 bg-slate-100 p-8 rounded-3xl border border-slate-200/50 flex flex-col items-center justify-center min-h-[350px] relative group overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>

        <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-wider text-slate-400 bg-white/80 border border-slate-200 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
          Vista Previa En Vivo
        </span>

        {/* Dynamic SVG T-Shirt */}
        <div className="relative w-56 h-56 transition-all duration-500 hover:scale-105 select-none drop-shadow-xl z-10">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transition-colors duration-500"
            style={{ fill: activeColorObj.hex }}
          >
            <path
              d="M 30,10 
                 C 35,16 65,16 70,10 
                 L 88,18 
                 C 90,20 90,26 84,30 
                 L 76,26 
                 L 76,90 
                 C 76,92 74,94 72,94 
                 L 28,94 
                 C 26,94 24,92 24,90 
                 L 24,26 
                 L 16,30 
                 C 10,26 10,20 12,18 
                 Z"
              stroke="#cbd5e1"
              strokeWidth="0.75"
            />
          </svg>

          {/* Simulated Printed Area */}
          <div className="absolute inset-x-12 top-16 bottom-10 flex flex-col items-center justify-center text-center p-2 border border-dashed border-sky-400/30 rounded-lg">
            {/* Custom text display */}
            {customText ? (
              <p
                className={`font-black text-xs break-all max-w-[100px] leading-tight select-none tracking-tight ${
                  color === "White" || color === "Blanco" ? "text-slate-900" : "text-white"
                }`}
              >
                {customText}
              </p>
            ) : null}

            {/* Simulated logo or design uploaded */}
            {uploadSuccess ? (
              <div
                className={`mt-1 bg-sky-500/10 text-[8px] font-bold px-1.5 py-0.5 rounded border border-sky-400 flex items-center gap-0.5 ${
                  color === "White" || color === "Blanco" ? "text-sky-700" : "text-sky-300"
                }`}
              >
                🖼️ Imagen
              </div>
            ) : !customText && (
              <span className="text-[9px] text-slate-400/70 font-semibold select-none leading-tight uppercase tracking-wider">
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
          <h3 className="text-xl font-bold text-slate-900">Configuración de Camiseta</h3>
          <p className="text-slate-400 text-xs mt-1">Impresión premium a todo color, ideal para eventos o uso personal.</p>
        </div>

        {/* Color picker */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Color de la prenda</span>
            <span className="text-xs font-bold text-slate-400">{color}</span>
          </label>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer relative ${c.border} ${
                  color === c.name ? "ring-2 ring-blue-500 scale-110" : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {color === c.name && (
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

        {/* Size selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700">Talla de Camiseta</label>
          <div className="grid grid-cols-4 gap-2">
            {(["S", "M", "L", "XL"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={`py-2.5 rounded-xl text-sm font-extrabold border transition-all ${
                  size === sz
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Custom text input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Texto personalizado (+2,00 €)</span>
            <span className="text-xs text-slate-400">{customText.length}/40 caracteres</span>
          </label>
          <input
            type="text"
            maxLength={40}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Escribe una frase, nombre o palabra..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold bg-slate-50"
          />
        </div>

        {/* Design upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Añadir Imagen / Logo (+3,50 €)</span>
            {uploadSuccess && <span className="text-xs text-emerald-500 font-bold">¡Subido!</span>}
          </label>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 group">
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.ai"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {isUploading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-semibold">Subiendo diseño...</span>
              </div>
            ) : uploadSuccess ? (
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <Upload className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-blue-500" />
                <span>Subir logo o imagen de estampación</span>
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
            <span className="text-blue-500 text-xs font-bold">⭐ 5+ uds:</span>
            <span>10% de descuento automático</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500 text-xs font-bold">🔥 20+ uds:</span>
            <span>20% de descuento automático</span>
          </div>
        </div>
      </div>
    </div>
  );
}
