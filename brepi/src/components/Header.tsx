interface NameProps {
  name: string
  co?: string
  totalBeerNum: number
  handleBeerNum: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleAbvRange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Header: React.FC<NameProps> = ({ name, co, totalBeerNum, handleBeerNum, handleAbvRange }) => {
  return (
    <div className='header'>
      <div className='container'>
        <h1 className='company'>
          {name} {co}
        </h1>
        <div className='selectors'>
          <div className='selector-container'>
            <span className='label'>Beers per page: </span>
            <select className='selector' onChange={handleBeerNum}>
              <option className='option' value={6}>6</option>
              <option className='option' value={15}>15</option>
              <option className='option' value={totalBeerNum}>All</option>
            </select>
          </div>
          <div className='selector-container'>
            <span className='label'>ABV: </span>
            <select className='selector' onChange={handleAbvRange}>
              <option className='option' value='all'>all</option>
              <option className='option' value='<5'>less than 5%</option>
              <option className='option' value='5< <10'>bw 5% & 10%</option>
              <option className='option' value='10<'>above 10%</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
