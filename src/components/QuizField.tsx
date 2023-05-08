import { useState } from 'react';
import InputFieldStats from '../types/InputFieldStats';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';

interface Props {
  id: number;
  stats: InputFieldStats;
  statsKey: keyof InputFieldStats;
  inputIdentifier: keyof InputFieldStats;
  checkStat: InputFieldStats;
}

const QuizField: React.FC<Props> = ({
  id,
  stats,
  statsKey,
  inputIdentifier,
  checkStat,
}) => {
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
      {console.log(checkStat[statsKey])}
      {console.log(checkStat && stats[statsKey] === checkStat[statsKey])}

      {stats[statsKey] === '' ? (
        <input
          name={`${inputIdentifier}-${id}`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className='w-48 p-1 text-center text-last-center rtl focus:bg-blue-100'
        />
      ) : stats[statsKey] === checkStat[statsKey] ? (
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
