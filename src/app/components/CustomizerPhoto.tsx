"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Upload, CheckCircle2, ShoppingBag, Camera } from "lucide-react";

export default function CustomizerPhoto() {
  const { addToCart } = useCart();

  // Config state
  const [photoSize, setPhotoSize] = useState<"10x15 cm" | "13x18 cm" | "A4 (21x30 cm)">("10x15 cm");
  const [finish, setFinish] = useState<"Brillo" | "Mate">("Brillo");
  const [quantity, setQuantity] = useState<number>(5);

  // File upload state
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Pricing
  const [unitPrice, setUnitPrice] = useState<number>(0.25);
  const [totalPrice, setTotalPrice] = useState<number>(1.25);

  // Recalculate prices
  useEffect(() => {
    let base = 0.25; // 10x15 cm

    if (photoSize === "13x18 cm") {
      base = 0.45;
    } else if (photoSize === "A4 (21x30 cm)") {
      base = 1.50;
    }

    // Volume discount
    let volumeDiscount = 1.0;
    if (quantity >= 50) {
      volumeDiscount = 0.70; // 30% off
    } else if (quantity >= 10) {
      volumeDiscount = 0.85; // 15% off
    }

    const calculatedUnit = base * volumeDiscount;
    setUnitPrice(Number(calculatedUnit.toFixed(2)));
    setTotalPrice(Number((calculatedUnit * quantity).toFixed(2)));
  }, [photoSize, finish, quantity]);

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
      type: "foto",
      name: `Revelado Foto (${photoSize} - ${finish})`,
      quantity: quantity,
      unitPrice: unitPrice,
      config: {
        photo: {
          photoSize,
          finish,
        },
      },
    });

    setUploadSuccess(false);
    setFileName("");
    alert("¡Fotos añadidas al carrito!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Canvas Mockup (5 cols) */}
      <div className="lg:col-span-5 bg-slate-100 p-8 rounded-3xl border border-slate-200/50 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>

        <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-wider text-slate-400 bg-white/80 border border-slate-200 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm z-10">
          Simulador de Revelado
        </span>

        {/* Dynamic Image Holder */}
        <div className="relative w-56 h-40 bg-white p-2.5 rounded-xl shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-2 select-none z-10 border border-slate-200 flex flex-col justify-between">
          {uploadSuccess ? (
            <div className="w-full h-full bg-slate-200 rounded-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <span className="text-3xl mb-1">📸</span>
              <p className="font-bold text-[10px] text-slate-700 max-w-[150px] truncate">{fileName}</p>
              <p className="text-[8px] text-slate-400 mt-0.5 uppercase font-bold tracking-widest">{finish} | {photoSize}</p>
            </div>
          ) : (
            <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-center p-4">
              <Camera className="w-8 h-8 text-slate-300 animate-pulse" />
              <p className="text-[9px] text-slate-400/80 font-bold mt-2 uppercase tracking-widest leading-none">
                Carga tu Fotografía
              </p>
            </div>
          )}
        </div>

        <p className="text-[10px] text-slate-400 font-medium mt-4 z-10">Papel fotográfico premium Fuji de alto gramaje.</p>
      </div>

      {/* Inputs Form (7 cols) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-900">Revelado de Fotografías</h3>
          <p className="text-slate-400 text-xs mt-1">Impresión química profesional con la máxima fidelidad de color.</p>
        </div>

        {/* Size selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700">Tamaño de Fotografía</label>
          <div className="grid grid-cols-3 gap-2">
            {(["10x15 cm", "13x18 cm", "A4 (21x30 cm)"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setPhotoSize(sz)}
                className={`py-2.5 px-1 rounded-xl text-xs font-bold border transition-all ${
                  photoSize === sz
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Finish selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700">Acabado del Papel</label>
          <div className="grid grid-cols-2 gap-2">
            {(["Brillo", "Mate"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFinish(f)}
                className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                  finish === f
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {f === "Brillo" ? "🌟 Brillo (Efecto espejo)" : "🎨 Mate (Sin reflejos)"}
              </button>
            ))}
          </div>
        </div>

        {/* Photo upload zone */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            <span>Subir tus Imágenes</span>
            {uploadSuccess && <span className="text-xs text-emerald-500 font-bold">¡Imágenes listas!</span>}
          </label>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 group">
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.tiff"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              multiple
            />
            {isUploading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-semibold">Cargando fotos...</span>
              </div>
            ) : uploadSuccess ? (
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <Upload className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-blue-500" />
                <span>Seleccionar fotos para revelar</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing panel & Action */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Fotos a revelar</label>
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
            <span className="text-blue-500 text-xs font-bold">⭐ 10+ fotos:</span>
            <span>15% de descuento automático</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500 text-xs font-bold">🔥 50+ fotos:</span>
            <span>30% de descuento automático</span>
          </div>
        </div>
      </div>
    </div>
  );
}
