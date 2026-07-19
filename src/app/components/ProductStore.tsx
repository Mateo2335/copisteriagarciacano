"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Grid, Filter, Star, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Textil" | "Tazas" | "Llaveros" | "Papelería";
  rating: number;
  emoji: string;
  variantLabel?: string;
  variants?: string[];
}

export default function ProductStore() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const products: Product[] = [
    {
      id: "prod-llavero-sbd",
      name: "Llavero de Madera 'Sabadell'",
      description: "Llavero de madera natural grabado con láser de precisión. Representa el orgullo local de nuestra ciudad.",
      price: 3.50,
      category: "Llaveros",
      rating: 5,
      emoji: "🪵",
      variantLabel: "Tipo de Madera",
      variants: ["Pino Claro", "Roble Oscuro"]
    },
    {
      id: "prod-taza-cafe-code",
      name: "Taza 'Café, Código y Copias'",
      description: "Taza de cerámica AAA premium con un diseño ingenioso de la casa. Ideal para programadores, estudiantes y amantes del café.",
      price: 9.50,
      category: "Tazas",
      rating: 4.8,
      emoji: "☕",
      variantLabel: "Color Interior",
      variants: ["Negro", "Azul", "Blanco"]
    },
    {
      id: "prod-camiseta-solipadriss",
      name: "Camiseta Oficial 'Sol i Padrís'",
      description: "Camiseta de algodón 100% orgánico con serigrafía premium del icónico barrio de Sabadell donde nos ubicamos.",
      price: 15.00,
      category: "Textil",
      rating: 4.9,
      emoji: "👕",
      variantLabel: "Talla",
      variants: ["S", "M", "L", "XL"]
    },
    {
      id: "prod-libreta-kraft",
      name: "Libreta Kraft García Cano",
      description: "Cuaderno artesanal de hojas lisas de papel reciclado, cosido a mano y con cubiertas rígidas de cartón kraft.",
      price: 4.50,
      category: "Papelería",
      rating: 4.7,
      emoji: "📓",
      variantLabel: "Tamaño",
      variants: ["A5 (Mediana)", "A6 (Bolsillo)"]
    },
    {
      id: "prod-llavero-acrilico",
      name: "Llavero de Acrílico Cristal",
      description: "Llavero de metacrilato transparente cortado a láser, muy resistente y con bordes pulidos brillantes.",
      price: 3.00,
      category: "Llaveros",
      rating: 4.6,
      emoji: "💎",
      variantLabel: "Forma",
      variants: ["Rectángulo", "Círculo", "Corazón"]
    },
    {
      id: "prod-cojin-familiar",
      name: "Cojín Decorativo 'Nuestra Casa'",
      description: "Cojín con funda de lino súper suave impresa a todo color con diseños acogedores de la casa.",
      price: 12.00,
      category: "Textil",
      rating: 4.9,
      emoji: "🛋️",
      variantLabel: "Diseño",
      variants: ["Estilo Nórdico", "Frase Familiar"]
    }
  ];

  const categories = ["Todos", "Textil", "Tazas", "Llaveros", "Papelería"];

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleVariantChange = (productId: string, val: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: val
    }));
  };

  const handleAddToCart = (product: Product) => {
    // Determine active variant, fallback to first variant if none selected
    const activeVar = selectedVariants[product.id] || product.variants?.[0] || "";

    addToCart({
      type: "articulo",
      name: product.name,
      quantity: 1,
      unitPrice: product.price,
      config: {
        article: {
          category: product.category,
          variant: activeVar || undefined
        }
      }
    });

    alert(`¡"${product.name}" añadido al carrito!`);
  };

  return (
    <section id="tienda" className="py-20 bg-slate-50/50 border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
              Catálogo de la Casa
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nuestra Tienda de Artículos Propios
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              Artículos prediseñados y creados artesanalmente en nuestro taller de Sabadell. ¡Listos para comprar sin esperas!
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const currentVariant = selectedVariants[p.id] || p.variants?.[0] || "";
            return (
              <div
                key={p.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-xl hover:border-blue-200/50 transition-all duration-300 group relative"
              >
                {/* Micro Category Badge */}
                <span className="absolute top-4 right-4 text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {p.category}
                </span>

                <div className="space-y-4">
                  {/* Emoji Visual container */}
                  <div className="h-40 rounded-2xl bg-slate-50 flex items-center justify-center text-6xl shadow-inner relative group-hover:bg-blue-50/30 transition-colors">
                    <span className="group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
                      {p.emoji}
                    </span>
                  </div>

                  {/* Ratings & Title */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-slate-700">{p.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({Math.floor(p.rating * 15)} opiniones)</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Option Variant selectors if exists */}
                  {p.variants && p.variants.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                        {p.variantLabel || "Variante"}
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {p.variants.map((v) => (
                          <button
                            key={v}
                            onClick={() => handleVariantChange(p.id, v)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                              currentVariant === v
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing & Add Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Precio</span>
                    <span className="text-2xl font-black text-slate-900 leading-none">
                      {p.price.toFixed(2)} €
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/10 flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Comprar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
