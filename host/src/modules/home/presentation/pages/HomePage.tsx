import { useState } from "react";
import { PokemonListModal } from "../../../pokemon/presentation/components/PokemonListModal";
import { PokemonByTypeSection } from "../../../pokemon/presentation/components/PokemonByTypeSection";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-headline-xl text-on-surface mb-4">Kinetic Dex</h1>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-primary text-[28px]">search</span>
          </div>
          <input
            type="text"
            readOnly
            onFocus={() => setIsModalOpen(true)}
            placeholder="Buscar Pokémon..."
            className="w-full h-16 bg-surface-container-high border-none rounded-xl pl-16 pr-4 text-body-md text-on-surface focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/40 shadow-inner focus:outline-none cursor-text"
          />
        </div>
      </div>

      <PokemonByTypeSection />

      {isModalOpen && <PokemonListModal isOpen onClose={handleCloseModal} />}
    </div>
  );
};

export default HomePage;
