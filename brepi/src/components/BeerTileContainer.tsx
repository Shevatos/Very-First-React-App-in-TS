import BeerTile, { Beer } from "./BeerTile"

interface BeersProps {
  beers: Beer[],
  onToggle: (id: number) => void
}

const BeerTileContainer: React.FC<BeersProps> = ({ beers, onToggle }) => {
  return (
    <div className='beerTile'>
      {beers.map((beer: Beer) => (
        <BeerTile
          key={beer.id}
          beer={beer}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default BeerTileContainer
