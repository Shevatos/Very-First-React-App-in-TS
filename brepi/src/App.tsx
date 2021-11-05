import React, { useState, useEffect, useRef } from 'react'
// import ReactPaginate from 'react-paginate'  // npm i @types/react-paginate --save

import Header from "./components/Header";
import BeerTileContainer from "./components/BeerTileContainer";
import Paginator from "./components/Paginator";

import { Beer } from './components/BeerTile';

function App() {

  // == Fetch support functions and variables ==
  const [beers, setBeers] = useState<Beer[] | []>([])

  const URL: string = 'https://api.punkapi.com/v2/beers?page=1&per_page=50'

  // fetch 50 beers from API; async functions always returns a promise
  const fetchBeers = async () => {
    const res = await fetch(URL)
    const beersJson = await res.json()
    const beersList = [...beersJson]
      .map(({ id, name, description, abv, image_url }) => (
        { id, name, description, abv, image: image_url, showDesc: false }
      ))

    console.log(beersList);

    return beersList
  }

  useEffect(() => {
    fetchBeers()
      .then(res => setBeers(res))
  }, [])

  // switch/toggle showDesc param

  const toggleShowDesc = (id: number) => {
    setBeers(
      beers.map(beer => beer.id === id
        ? { ...beer, showDesc: !beer.showDesc }
        : { ...beer, showDesc: false }
      )
    )
  }

  // previous beers status setup with useRef

  const prevBeers: React.MutableRefObject<[] | Beer[]> = useRef([])

  useEffect(() => { prevBeers.current = beers }, [beers])

  // set showDesc to false as default case for all beers

  const defaultShowDesc = () => setBeers(beers.map(beer => ({ ...beer, showDesc: false })))

  // == Beer per Page Header selector support functions and variables ==

  const [beersPerPage, setBeersPerPage] = useState<number>(6)

  useEffect(() => console.log(`Beers per page selected: ${beersPerPage}`), [beersPerPage])

  const [pageNum, setPageNum] = useState<number>(0)

  useEffect(() => console.log(`Page selected: ${pageNum + 1}`), [pageNum])

  const beerNumHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const beerNum: number = +e.target.value
    setBeersPerPage(beerNum)
    setPageNum(0)
    defaultShowDesc()
  }

  // == Paginator support functions and variables ==

  const beersPassed: number = pageNum * beersPerPage
  const pageCount: number = Math.ceil(beers.length / beersPerPage)

  const pageLister = (num: number) => {
    const list: number[] = []
    for (let i = 0; i < num; i++) list.push(i + 1)
    return list
  }

  const pageList: number[] = pageLister(pageCount)

  const changePage = (num: number | string): void => {
    typeof num === 'number' && setPageNum(num)
    num === 'decrease' && setPageNum(prev => Math.max(0, prev - 1))
    num === 'increase' && setPageNum(prev => Math.min(pageCount - 1, prev + 1))
    num === 'start' && setPageNum(0)
    num === 'finish' && setPageNum(pageCount - 1)
    defaultShowDesc()
  }

  // == ABV range selector support functions and variables

  const [abvRange, setAbvRange] = useState<string>('all')

  const abvRangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const abvRange: string = e.target.value
    pageNum !== 0 && setPageNum(0)
    defaultShowDesc()
    fetchBeers()
      .then(res => {
        setBeers(res)
        setAbvRange(abvRange)
      })
  }

  useEffect(() => {
    console.log(`ABV range selected: ${abvRange}`)
    if (abvRange === '<5') { setBeers(b => b.filter(beer => beer.abv < 5)) }
    if (abvRange === '5< <10') { setBeers(b => b.filter(beer => beer.abv >= 5 && beer.abv < 10)) }
    if (abvRange === '10<') { setBeers(b => b.filter(beer => beer.abv >= 10)) }
  }, [abvRange])

  const displayBeers: Beer[] = beers
    .slice(beersPassed, beersPassed + beersPerPage)

  // == App structure == 

  return (
    <div className="app">
      <Header
        name='BrewDog'
        co='Ltd.'
        totalBeerNum={beers.length}
        handleBeerNum={beerNumHandler}
        handleAbvRange={abvRangeHandler}
      />
      <BeerTileContainer
        beers={displayBeers}
        onToggle={toggleShowDesc}
      />
      <Paginator
        pages={pageList}
        onChangePage={changePage}
        activePage={pageNum}
      />
    </div>
  );
}

export default App;
