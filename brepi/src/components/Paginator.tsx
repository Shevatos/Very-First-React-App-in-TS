import PageButton from "./PageButton";
import { FaAngleRight, FaAngleLeft, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'  // npm react-icons --save

interface PaginatorProps {
  pages: number[]
  onChangePage: (num: number | string) => void
  activePage: number
}

const Paginator: React.FC<PaginatorProps> = ({ pages, onChangePage, activePage }) => {
  return (
    <div className='paginator'>
      <PageButton
        text={<FaAngleDoubleLeft />}
        onChangePage={onChangePage}
        pageSwitch='start'
        border='none'
      />
      <PageButton
        text={<FaAngleLeft />}
        onChangePage={onChangePage}
        pageSwitch='decrease'
        border='none'
      />
      {pages.map((page: number, index) => (
        <PageButton
          key={page}
          text={page}
          onChangePage={onChangePage}
          pageSwitch={index}
          border={activePage === index ? '1px solid white' : 'none'}
        />
      ))}
      <PageButton
        text={<FaAngleRight />}
        onChangePage={onChangePage}
        pageSwitch='increase'
        border='none'
      />
      <PageButton
        text={<FaAngleDoubleRight />}
        onChangePage={onChangePage}
        pageSwitch='finish'
        border='none'
      />
    </div>
  );
};

export default Paginator;
