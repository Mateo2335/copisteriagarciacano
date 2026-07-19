"use client";

import React from "react";
import { ArrowRight, Printer, Sparkles, Shirt } from "lucide-react";

interface HeroProps {
  onCTASelect: (sectionId: string) => void;
}

export default function Hero({ onCTASelect }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-20 lg:py-28">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 opacity-70 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/50 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Copistería familiar en Sabadell desde hace años
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Impresión <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Rápida</span> y Regalos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-extrabold">Personalizados</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium">
              ¿Necesitas imprimir tus apuntes, diseñar camisetas para tu grupo o una taza personalizada para regalar? En <strong>Copistería García Cano</strong> nos encargamos con la mejor calidad y un trato 100% personalizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => onCTASelect("calculadoras")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-600/35 active:scale-[0.98] transition-all"
              >
                Calculadora & Pedidos
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onCTASelect("servicios")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm"
              >
                Nuestros Servicios
              </button>
            </div>

            {/* Micro stats / Trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-extrabold text-slate-900">100%</span>
                <span className="text-xs text-slate-500 font-medium">Atención familiar</span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="block text-2xl font-extrabold text-slate-900">En el día</span>
                <span className="text-xs text-slate-500 font-medium">Servicios exprés</span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="block text-2xl font-extrabold text-slate-900">Desde Sabadell</span>
                <span className="text-xs text-slate-500 font-medium">Sol i Padrís, 95</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component Cards (Interactive look-alike) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-300 rounded-full blur-[80px] opacity-25"></div>

            <div className="relative w-full max-w-sm grid grid-cols-2 gap-4">
              {/* Card 1: Document Printing Mock */}
              <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">Impresión Documentos</h3>
                  <p className="text-xs text-slate-400 mt-1">A4 y A3, Color o B/N, encuadernados al momento.</p>
                </div>
                <div className="text-xs font-bold text-blue-600">Desde 0,05 € / pág</div>
              </div>

              {/* Card 2: Apparel Customizing Mock */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 mt-6">
                <div className="w-10 h-10 rounded-2xl bg-white/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm leading-tight">Camisetas Custom</h3>
                  <p className="text-xs text-slate-400 mt-1">Impresión y serigrafía textil premium.</p>
                </div>
                <div className="text-xs font-bold text-cyan-400">Desde 12,50 €</div>
              </div>

              {/* Card 3: Personalized Mugs */}
              <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <span className="text-base font-extrabold">☕</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">Tazas de Regalo</h3>
                  <p className="text-xs text-slate-400 mt-1">Imprime fotos, frases y diseños a todo color.</p>
                </div>
                <div className="text-xs font-bold text-amber-600">Desde 8,90 €</div>
              </div>

              {/* Card 4: Photo Printing */}
              <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 mt-6">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <span className="text-base font-extrabold">📸</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">Fotos de Carnet</h3>
                  <p className="text-xs text-slate-400 mt-1">Fotos carnet oficiales y revelado de fotos.</p>
                </div>
                <div className="text-xs font-bold text-rose-600">Al instante</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
