import InputFieldStats from '../types/InputFieldStats';

interface Props {
  id: number;
  stats: InputFieldStats
  statsKey: keyof InputFieldStats
  inputIdentifier: keyof InputFieldStats
}

const QuizField: React.FC<Props> = ({ id, stats, statsKey, inputIdentifier }) => {
  console.log(id)
  console.log(stats)
  console.log(statsKey)
  console.log(inputIdentifier)
  console.log(stats[statsKey])
  return (
    <>
      {stats[statsKey] === '' ? (
        <input name={`${inputIdentifier}-${id}`} className='w-40 bg-slate-400' />
      ) : (
        <div className='w-40 flex items-center border-s-blue-900'>
          {stats[statsKey]}
        </div>
      )}
    </>
  );
};

export default QuizField;
