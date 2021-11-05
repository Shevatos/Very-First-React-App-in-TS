import { ReactElement } from 'react';

interface btnProps {
  text: string | number | ReactElement
  onChangePage: (num: number | string) => void
  pageSwitch: number | string
  border: string
}

const PageButton: React.FC<btnProps> = ({ text, onChangePage, pageSwitch, border }) => {
  return (
    <div
      className='btn'
      style={{ border: border }}
      onClick={() => onChangePage(pageSwitch)}
    >
      {text}
    </div>
  );
};

export default PageButton;