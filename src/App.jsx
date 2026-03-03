// App.jsx
// App.jsx
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        data.results.forEach(p => {
          fetch(p.url)
            .then(res => res.json())
            .then(details => {
              setPokemonDetails(prev => ({...prev, [p.name]: details}));
            });
        });
      })
      .catch(error => console.log("Error:", error));
  }, []);

  const filteredPokemon = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const details = pokemonDetails[p.name];
    const matchesType = selectedType === "all" || 
      (details && details.types.some(t => t.type.name === selectedType));
    return matchesSearch && matchesType;
  });

 return (
  <Layout>
  <SearchBar 
    search={search} 
    setSearch={setSearch} 
    selectedType={selectedType} 
    setSelectedType={setSelectedType} 
  />
  <PokemonList 
    pokemon={filteredPokemon} 
    pokemonDetails={pokemonDetails}
    onSelectPokemon={setSelectedPokemon}
  />

      {selectedPokemon && (
        <div className="modal-overlay" onClick={() => setSelectedPokemon(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPokemon(null)}>×</button>
            <PokemonDetail pokemon={selectedPokemon} />
          </div>
        </div>
      )}
    </Layout>
  );
}

function PokemonDetail({ pokemon }) {
  const [activeTab, setActiveTab] = useState("stats");
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    if (activeTab === "moves") {
      Promise.all(
        pokemon.moves.slice(0, 8).map(m => 
          fetch(m.move.url).then(r => r.json())
        )
      ).then(setMoves);
    }
  }, [activeTab, pokemon]);

  const typeColors = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#EE99AC"
  };

  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType];

  return (
    <div className="pokemon-detail">
      <div className="detail-header" style={{background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`}}>
        <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <h2 className="detail-name">{pokemon.name}</h2>
        <div className="detail-types">
          {pokemon.types.map(t => (
            <span key={t.type.name} style={{backgroundColor: typeColors[t.type.name]}}>
              {t.type.name}
            </span>
          ))}
        </div>
        <img src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      
      <div className="detail-tabs">
        <button className={activeTab === "stats" ? "active" : ""} onClick={() => setActiveTab("stats")}>Stats</button>
        <button className={activeTab === "abilities" ? "active" : ""} onClick={() => setActiveTab("abilities")}>Abilities</button>
        <button className={activeTab === "moves" ? "active" : ""} onClick={() => setActiveTab("moves")}>Moves</button>
      </div>

      <div className="detail-content">
        {activeTab === "stats" && (
          <div className="stats-content">
            <div className="physical-info">
              <div>Height: {pokemon.height / 10}m</div>
              <div>Weight: {pokemon.weight / 10}kg</div>
            </div>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="stat-bar">
                <label>{stat.stat.name.replace('-', ' ')}</label>
                <div className="bar-container">
                  <div className="bar" style={{width: `${(stat.base_stat/255)*100}%`, backgroundColor: bgColor}}>
                    <span>{stat.base_stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "abilities" && (
          <div className="abilities-content">
            {pokemon.abilities.map(a => (
              <div key={a.ability.name} className="ability-item">
                <strong>{a.ability.name.replace('-', ' ')}</strong>
                {a.is_hidden && <span className="hidden-badge">Hidden</span>}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "moves" && (
          <div className="moves-content">
            {moves.length === 0 ? <p>Loading moves...</p> : moves.map(move => (
              <div key={move.name} className="move-item">
                <div className="move-header">
                  <strong>{move.name.replace('-', ' ')}</strong>
                  <span style={{backgroundColor: typeColors[move.type?.name] || '#777'}}>{move.type?.name}</span>
                </div>
                <div className="move-stats">Power: {move.power || '-'} | Accuracy: {move.accuracy || '-'} | PP: {move.pp}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;