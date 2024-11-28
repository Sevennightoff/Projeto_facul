import React from 'react';
import { useCartStore } from '../store/cartStore';
import { cupcakes } from '../data/cupcakes';

export function Home() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Nossos Cupcakes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cupcakes.map((cupcake) => (
          <div
            key={cupcake.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={cupcake.image}
              alt={cupcake.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {cupcake.name}
              </h2>
              <p className="text-gray-600 mb-4">{cupcake.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-600">
                  R$ {cupcake.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addItem(cupcake)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}