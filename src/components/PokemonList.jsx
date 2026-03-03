// PokemonList.jsx
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemon, pokemonDetails, selectedType, setSelectedType, onSelectPokemon }) {
  return (
    <div>
      <div className="results-header">
        <span className="results-count">Showing {pokemon.length} Pokémon</span>
      </div>
      <div className="pokemon-grid">
        {pokemon.map((p, index) => (
          <PokemonCard 
            key={index} 
            pokemon={p} 
            details={pokemonDetails[p.name]}
            onClick={() => pokemonDetails[p.name] && onSelectPokemon(pokemonDetails[p.name])}
          />
        ))}
      </div>
      {pokemon.length === 0 && (
        <div className="empty-state">
          <p>No Pokémon found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default PokemonList;