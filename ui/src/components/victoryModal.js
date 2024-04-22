import React, { useState } from 'react';

const GameModal = ({ gameResult }) => {
  const [showModal, setShowModal] = useState(false);

  // Simulating a checkmate or stalemate condition
  const isGameOver = true;

  // Open the modal when the game is over
  if (isGameOver && !showModal) {
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-md mx-auto">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Game Over</h2>
              <p className="text-gray-600">{gameResult}</p>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameModal;
