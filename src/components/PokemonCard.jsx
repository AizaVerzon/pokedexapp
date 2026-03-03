// PokemonCard.jsx
import { useState, useEffect } from "react";

const typeColors = {
  normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
  grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
  ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
  rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
  steel: "#B8B8D0", fairy: "#EE99AC"
};

function PokemonCard({ pokemon, details, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!details) return (
    <div className="pokemon-card skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-text"></div>
    </div>
  );

  const primaryType = details.types[0].type.name;

  return (
    <div 
      className="pokemon-card"
      style={{"--type-color": typeColors[primaryType]}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="card-bg"></div>
      <div className="card-header">
        <span className="pokemon-number">#{String(details.id).padStart(3, '0')}</span>
        <div className="type-badges">
          {details.types.map(t => (
            <span key={t.type.name} style={{backgroundColor: typeColors[t.type.name]}}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className={`pokemon-img-wrap ${isHovered ? 'float' : ''}`}>
        <img src={details.sprites.other["official-artwork"].front_default || details.sprites.front_default} alt={details.name} />
      </div>
      
      <h3 className="pokemon-name">{details.name}</h3>
      
      <div className="quick-stats">
        {details.stats.slice(0, 3).map(s => (
          <div key={s.stat.name} className="quick-stat">
            <span className="stat-name">{s.stat.name.slice(0, 2).toUpperCase()}</span>
            <span className="stat-val">{s.base_stat}</span>
          </div>
        ))}
      </div>
      
      <div className="click-indicator">Click for details</div>
    </div>
  );
}

export default PokemonCard;