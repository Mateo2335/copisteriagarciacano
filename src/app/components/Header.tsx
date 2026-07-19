"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Phone, Clock, MapPin, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onOpenCart, onNavigate }: HeaderProps) {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Check if store is open right now
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const hour = now.getHours();
      const min = now.getMinutes();
      const timeVal = hour + min / 60;

      // Sabadell Copisteria schedules:
      // Mon-Fri: 9:00 - 13:30, 16:30 - 20:00
      // Sat: 10:00 - 13:30
      // Sun: Closed
      if (day >= 1 && day <= 5) {
        if ((timeVal >= 9 && timeVal <= 13.5) || (timeVal >= 16.5 && timeVal <= 20)) {
          setIsOpenNow(true);
        } else {
          setIsOpenNow(false);
        }
      } else if (day === 6) {
        if (timeVal >= 10 && timeVal <= 13.5) {
          setIsOpenNow(true);
        } else {
          setIsOpenNow(false);
        }
      } else {
        setIsOpenNow(false);
      }
    };

    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      {/* Top micro-bar */}
      <div className="hidden bg-slate-900 text-slate-100 py-1.5 px-4 sm:flex justify-between items-center text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            93 711 31 68 | Whatsapp: 649 22 52 75
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            Sol i Padrís, 95 - Sabadell
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>L-V: 9-13:30, 16:30-20 | S: 10-13:30</span>
          <span
            className={`ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 ${
              isOpenNow
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOpenNow ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
              }`}
            ></span>
            {isOpenNow ? "Abierto" : "Cerrado"}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("hero")}>
          <img src="/logo-garcia-cano.png" alt="Logo Copistería García Cano" className="h-10 w-auto rounded-xl object-contain shadow-sm border border-slate-100" />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase leading-none">Copistería</span>
            <span className="text-base font-bold text-slate-900 leading-none">García Cano</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => handleNavClick("servicios")} className="hover:text-blue-600 transition-colors">Servicios</button>
          <button onClick={() => handleNavClick("calculadoras")} className="hover:text-blue-600 transition-colors">Calculadoras & Pedidos</button>
          <button onClick={() => handleNavClick("tienda")} className="hover:text-blue-600 transition-colors">Tienda</button>
          <button onClick={() => handleNavClick("nosotros")} className="hover:text-blue-600 transition-colors">Nosotros</button>
          <button onClick={() => handleNavClick("contacto")} className="hover:text-blue-600 transition-colors">Contacto</button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Status badge for mobile */}
          <span
            className={`inline-flex md:hidden items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
              isOpenNow ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
            }`}
          >
            {isOpenNow ? "Abierto" : "Cerrado"}
          </span>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-extrabold shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 flex flex-col shadow-inner">
          <button
            onClick={() => handleNavClick("servicios")}
            className="text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-all"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick("calculadoras")}
            className="text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-all"
          >
            Calculadoras & Pedidos
          </button>
          <button
            onClick={() => handleNavClick("tienda")}
            className="text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-all"
          >
            Tienda
          </button>
          <button
            onClick={() => handleNavClick("nosotros")}
            className="text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-all"
          >
            Nosotros
          </button>
          <button
            onClick={() => handleNavClick("contacto")}
            className="text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-all"
          >
            Contacto
          </button>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2 text-xs text-slate-500 px-3">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              93 711 31 68 | Whatsapp: 649 22 52 75
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Sol i Padrís, 95 - Sabadell
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              L-V: 9-13:30, 16:30-20 | S: 10-13:30
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
