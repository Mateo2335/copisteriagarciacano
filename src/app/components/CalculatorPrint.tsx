"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Upload, FileText, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CalculatorPrint() {
  const { addToCart } = useCart();

  // State for calculation
  const [paperSize, setPaperSize] = useState<"A4" | "A3">("A4");
  const [colorMode, setColorMode] = useState<"Color" | "Blanco y Negro">("Blanco y Negro");
  const [sides, setSides] = useState<"Una cara" | "Doble cara">("Una cara");
  const [binding, setBinding] = useState<"Sin encuadernar" | "Espiral" | "Grapado">("Sin encuadernar");
  const [pages, setPages] = useState<number>(10);
  const [copies, setCopies] = useState<number>(1);

  // File upload simulation
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Price result
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Recalculate price whenever options change
  useEffect(() => {
    // 1. Calculate per-page base price
    let pageCost = 0.05; // Default: A4 B/N

    if (paperSize === "A4") {
      pageCost = colorMode === "Color" ? 0.25 : 0.05;
    } else if (paperSize === "A3") {
      pageCost = colorMode === "Color" ? 0.50 : 0.15;
    }

    // 2. Double-sided adjustment (discount on page cost)
    if (sides === "Doble cara") {
      pageCost = pageCost * 0.9; // 10% paper-saving discount
    }

    // 3. Page volume tier discounts
    const totalSheets = pages * copies;
    let volumeDiscount = 1.0;
    if (totalSheets >= 500) {
      volumeDiscount = 0.80; // 20% discount
    } else if (totalSheets >= 100) {
      volumeDiscount = 0.90; // 10% discount
    }

    const discountedPageCost = pageCost * volumeDiscount;

    // 4. Calculate binding cost
    let bindingCost = 0;
    if (binding === "Espiral") {
      bindingCost = 2.50;
    } else if (binding === "Grapado") {
      bindingCost = 0.15;
    }

    // 5. Compute totals
    const unitPriceCalculated = (discountedPageCost * pages) + bindingCost;
    setUnitPrice(Number(unitPriceCalculated.toFixed(3)));
    setTotalPrice(Number((unitPriceCalculated * copies).toFixed(2)));
  }, [paperSize, colorMode, sides, binding, pages, copies]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadSuccess(false);
      // Simulate fake upload delay
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
        setUploadSuccess(true);
      }, 800);
    }
  };

  const handleAddToCart = () => {
    // If no file uploaded, prompt warning or auto-assign a mock filename
    const activeFileName = fileName || "documento_imprimir.pdf";

    addToCart({
      type: "documento",
      name: `Impresión ${paperSize} (${colorMode})`,
      quantity: copies,
      unitPrice: unitPrice,
      config: {
        print: {
          paperSize,
          colorMode,
          sides,
          binding,
          pages,
        },
      },
    });

    // Reset status but keep configuration
    setUploadSuccess(false);
    setFileName("");
    alert("¡Añadido al carrito con éxito!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form column (8 cols on large screen) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-900">Configuración de Impresión</h3>
          <p className="text-slate-400 text-xs mt-1">Personaliza tu impresión y obtén precios por volumen al instante.</p>
        </div>

        {/* Paper Size & Color Mode selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Tamaño de Papel</label>
            <div className="grid grid-cols-2 gap-2">
              {(["A4", "A3"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setPaperSize(size)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                    paperSize === size
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                      : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Color / Blanco y Negro</label>
            <div className="grid grid-cols-2 gap-2">
              {(["Blanco y Negro", "Color"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setColorMode(mode)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                    colorMode === mode
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                      : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sides & Binding selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Caras de Impresión</label>
            <div className="grid grid-cols-2 gap-2">
              {(["Una cara", "Doble cara"] as const).map((sideOption) => (
                <button
                  key={sideOption}
                  onClick={() => setSides(sideOption)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                    sides === sideOption
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                      : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {sideOption}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Encuadernación</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["Sin encuadernar", "Espiral", "Grapado"] as const).map((bindOption) => (
                <button
                  key={bindOption}
                  onClick={() => setBinding(bindOption)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                    binding === bindOption
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                      : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {bindOption === "Sin encuadernar" ? "Sin encuad." : bindOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inputs count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex justify-between">
              <span>Número de Páginas</span>
              <span className="text-xs font-bold text-slate-400">por documento</span>
            </label>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex justify-between">
              <span>Copias / Juegos</span>
              <span className="text-xs font-bold text-slate-400">número de juegos</span>
            </label>
            <input
              type="number"
              min={1}
              value={copies}
              onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
            />
          </div>
        </div>

        {/* Drag & Drop PDF upload mockup */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Subir tu Documento (PDF o imágenes)</label>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 group">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {isUploading ? (
              <div className="space-y-2 text-slate-500">
                <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-semibold">Subiendo archivo...</p>
              </div>
            ) : uploadSuccess ? (
              <div className="space-y-1 text-emerald-600">
                <CheckCircle2 className="w-8 h-8 mx-auto animate-bounce text-emerald-500" />
                <p className="text-xs font-bold">{fileName}</p>
                <p className="text-[10px] text-emerald-500">Archivo subido correctamente</p>
              </div>
            ) : (
              <div className="space-y-2 text-slate-500">
                <Upload className="w-8 h-8 text-slate-400 mx-auto group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Arrastra o haz clic para subir</p>
                  <p className="text-[10px] text-slate-400 mt-1">Formatos soportados: PDF, JPG, PNG (Max 50MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary column (5 cols) */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 lg:sticky lg:top-24">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            Resumen de Presupuesto
          </h3>
          <p className="text-slate-400 text-xs mt-1">Precios actualizados en tiempo real según configuración.</p>
        </div>

        {/* Pricing specs breakdown */}
        <div className="space-y-3.5 pt-4 border-t border-slate-800 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Formato y Tipo</span>
            <span className="font-semibold text-slate-200">{paperSize} | {colorMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Caras</span>
            <span className="font-semibold text-slate-200">{sides}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Encuadernación</span>
            <span className="font-semibold text-slate-200">{binding}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Páginas totales</span>
            <span className="font-semibold text-sky-400">{pages * copies} pág.</span>
          </div>

          {/* Volume discount alert */}
          {pages * copies >= 100 && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <span className="text-emerald-300">🎉</span>
              <span>¡Descuento por volumen del {pages * copies >= 500 ? "20%" : "10%"} aplicado!</span>
            </div>
          )}
        </div>

        {/* Final pricing panel */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="block text-xs text-slate-400 font-semibold">Precio por juego (unitario)</span>
              <span className="text-slate-300 text-sm font-semibold">{unitPrice.toFixed(2)} €</span>
            </div>
            <div className="text-right">
              <span className="block text-xs text-slate-400 font-semibold">Total estimado</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 leading-none">
                {totalPrice.toFixed(2)} €
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 font-bold text-sm shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
