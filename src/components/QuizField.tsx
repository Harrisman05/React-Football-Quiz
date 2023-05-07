import { useState } from 'react';
import InputFieldStats from '../types/InputFieldStats';


interface Props {
  id: number;
  stats: InputFieldStats;
  statsKey: keyof InputFieldStats;
  inputIdentifier: keyof InputFieldStats;
}

const QuizField: React.FC<Props> = ({
  id,
  stats,
  statsKey,
  inputIdentifier,
}) => {

  const [placeholder, setPlaceholder] = useState('???');
  
  const handleFocus = () => {
    setPlaceholder('');
  }

  const handleBlur = () => {
    setPlaceholder('???');
  }

  return (
    <>
      {stats[statsKey] === '' ? (
        <input
          name={`${inputIdentifier}-${id}`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className='w-48 p-1 text-center text-last-center rtl focus:bg-blue-100'
        />
      ) : (
        <div className='w-48 text-center border-s-blue-900 p-1'>
          {stats[statsKey]}
        </div>
      )}
    </>
  );
};

export default QuizField;
