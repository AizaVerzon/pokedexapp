// SearchBar.jsx
const types = ["all", "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];

const typeColors = {
  all: "#64748b", normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
  grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", rock: "#B8A038", ghost: "#705898",
  dragon: "#7038F8", dark: "#705848", steel: "#B8B8D0", fairy: "#EE99AC"
};

function SearchBar({ search, setSearch, selectedType, setSelectedType }) {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="type-filters">
        {types.map(type => (
          <button
            key={type}
            className={`type-btn ${selectedType === type ? 'active' : ''}`}
            style={{
              backgroundColor: selectedType === type ? typeColors[type] : 'transparent',
              borderColor: typeColors[type],
              color: selectedType === type ? 'white' : typeColors[type]
            }}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;