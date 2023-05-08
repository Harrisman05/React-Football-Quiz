import { useState } from 'react';
import InputFieldStats from '../types/InputFieldStats';

interface Props {
  id: number;
  stats: InputFieldStats;
  statsKey: keyof InputFieldStats;
  originalStats: InputFieldStats;
}

const QuizField: React.FC<Props> = ({
  id,
  stats,
  statsKey,
  originalStats,
}) => {
  const inputIdentifier = statsKey; // input-Idendifier used in form data extraction, assigned a variable for semantic reasons in name attribute

  const [placeholder, setPlaceholder] = useState('???');
  const handleFocus = () => {
    setPlaceholder('');
  };
  const handleBlur = () => {
    setPlaceholder('???');
  };

  return (
    <>
      {console.log(stats)}
      {console.log(statsKey)}
      {console.log(stats[statsKey])}
      {console.log(originalStats[statsKey])}

      {stats[statsKey] === '' ? (
        <input
          name={`${inputIdentifier}-${id}`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className='w-48 p-1 text-center text-last-center rtl focus:bg-blue-100'
        />
      ) : stats[statsKey] === originalStats[statsKey] ? (
        <div className='w-48 text-center border-s-blue-900 p-1'>
          {stats[statsKey]}
        </div>
      ) : (
        <div className='w-48 text-center border-s-blue-900 bg-green-400 p-1'>
          {stats[statsKey]}
        </div>
      )}
    </>
  );
};

export default QuizField;