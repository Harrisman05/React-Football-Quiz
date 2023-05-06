import InputFieldStats from '../types/InputFieldStats';
import TextareaAutosize from 'react-textarea-autosize';


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
  console.log(id);
  console.log(stats);
  console.log(statsKey);
  console.log(inputIdentifier);
  console.log(stats[statsKey]);
  return (
    <>
      {stats[statsKey] === '' ? (
        <TextareaAutosize minRows={1}
          name={`${inputIdentifier}-${id}`}
          className='bg-slate-400 w-32  p-1 resize-none h-max'
        />
      ) : (
        <div className='w-32 text-center border-s-blue-900 p-1'>
          {stats[statsKey]}
        </div>
      )}
    </>
  );
};

export default QuizField;
