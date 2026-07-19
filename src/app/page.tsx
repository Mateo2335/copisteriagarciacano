"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BentoServices from "./components/BentoServices";
import CalculatorPrint from "./components/CalculatorPrint";
import CustomizerApparel from "./components/CustomizerApparel";
import CustomizerMug from "./components/CustomizerMug";
import CustomizerPhoto from "./components/CustomizerPhoto";
import ProductStore from "./components/ProductStore";
import ContactInfo from "./components/ContactInfo";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import CheckoutModal from "./components/CheckoutModal";
import { FileText, Shirt, Sparkles, Star, Users } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"documento" | "camiseta" | "taza" | "foto">("documento");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBentoSelect = (calcType: string) => {
    setActiveTab(calcType as any);
    handleNavigate("calculadoras");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30 text-slate-900 font-sans">
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero onCTASelect={handleNavigate} />

        {/* Bento Services Grid */}
        <BentoServices onSelectCalculator={handleBentoSelect} />

        {/* Tabbed Interactive Calculators & Customizers */}
        <section id="calculadoras" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Configurador Interactivo
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Calcula tu Presupuesto & Pide Online
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base">
                Elige el producto que deseas personalizar, selecciona las opciones a tu gusto y añádelo directamente al carrito de compras.
              </p>
            </div>

            {/* Tab navigation buttons */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 gap-1 overflow-x-auto max-w-full">
                <button
                  onClick={() => setActiveTab("documento")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === "documento"
                      ? "bg-white text-blue-600 shadow-md shadow-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Impresiones A4/A3
                </button>
                <button
                  onClick={() => setActiveTab("camiseta")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === "camiseta"
                      ? "bg-white text-blue-600 shadow-md shadow-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  Camisetas
                </button>
                <button
                  onClick={() => setActiveTab("taza")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === "taza"
                      ? "bg-white text-blue-600 shadow-md shadow-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  ☕ Tazas
                </button>
                <button
                  onClick={() => setActiveTab("foto")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === "foto"
                      ? "bg-white text-blue-600 shadow-md shadow-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  📸 Revelado Fotos
                </button>
              </div>
            </div>

            {/* Dynamic calculator tabs */}
            <div className="transition-all duration-300">
              {activeTab === "documento" && <CalculatorPrint />}
              {activeTab === "camiseta" && <CustomizerApparel />}
              {activeTab === "taza" && <CustomizerMug />}
              {activeTab === "foto" && <CustomizerPhoto />}
            </div>
          </div>
        </section>

        {/* Product Store catalog */}
        <ProductStore />

        {/* Family business story / Nosotros */}
        <section id="nosotros" className="py-20 bg-slate-50 border-t border-slate-200/40 overflow-hidden relative">
          {/* Decorative side shape */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-20 -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Visual graphic representing family value and commitment */}
              <div className="lg:col-span-5 relative space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/60 shadow-lg relative z-10 flex gap-4 items-start">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Atención 100% Familiar</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Llevamos años atendiendo a estudiantes, profesionales y vecinos de Sabadell. No somos una gran imprenta automatizada; nos importa cada dossier y cada prenda.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl relative z-10 flex gap-4 items-start sm:translate-x-6">
                  <div className="p-3 rounded-2xl bg-white/10 text-cyan-400 shrink-0">
                    <Star className="w-6 h-6 fill-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-100 text-base">Calidad Garantizada</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      Utilizamos tazas de cerámica clase AAA brillante, papeles premium de alto gramaje e impresoras láser de última generación con la máxima precisión de color.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sobre Nosotros
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Comprometidos con Sabadell y con tus ideas
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  En <strong>Copistería García Cano</strong> creemos que cada proyecto tiene su importancia, ya sea una simple copia para entregar en clase o cincuenta camisetas personalizadas para una despedida de soltero. Por eso, combinamos tecnología de vanguardia para lograr acabados duraderos con el trato cercano de la tienda de barrio de toda la vida.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  Ven a vernos en nuestra tienda en Sol i Padrís, utiliza nuestros puestos de auto-servicio informático, o haz tu pedido directamente por la web para recogerlo listo y ahorrarte colas. ¡Estamos encantados de ayudarte!
                </p>

                {/* Bullets lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/60 text-xs text-slate-500 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 text-base">✓</span>
                    <span>Maquinaria láser de alto rendimiento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 text-base">✓</span>
                    <span>Papel ecológico certificado FSC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 text-base">✓</span>
                    <span>Estampaciones textiles duraderas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 text-base">✓</span>
                    <span>Asistencia en auto-servicio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact and Location Section */}
        <ContactInfo />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Shopping Cart Drawer */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
