export interface Beer {
  id: number,
  name: string,
  description: string,
  abv: number
  image: string,
  showDesc: boolean,
}

export interface BeerProps {
  beer: Beer,
  onToggle: (id: number) => void
}

const BeerTile: React.FC<BeerProps> = ({ beer, onToggle }) => {
  return (
    <div className='tile'>
      <div className='beer' onClick={() => onToggle(beer.id)}>
        {!beer.showDesc
          ? <img src={beer.image} alt='beer' />
          : <p>{beer.description}</p>}
      </div>
      <div className='title'>
        <h4>{beer.name} ({beer.abv}%)</h4>
      </div>
    </div>
  )
}

export default BeerTile
