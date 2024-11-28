import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pedido Realizado com Sucesso!
        </h1>
        <p className="text-gray-600 mb-6">
          Obrigado por comprar conosco. Seu pedido está sendo preparado.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Voltar à Loja
        </button>
      </div>
    </div>
  );
}