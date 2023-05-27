import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import calcEmptyFields from './calcEmptyFields';

export default function updateProgressBar(statsRemove: ModifiedStatsPlayer[], originalStatsRemove: ModifiedStatsPlayer[], setProgressBar: React.Dispatch<React.SetStateAction<number>>) {
    const emptyFields: number = calcEmptyFields(statsRemove);
    const originalEmptyFields: number = calcEmptyFields(originalStatsRemove);
    console.log(emptyFields);
    const answeredFields = originalEmptyFields - emptyFields;
    setProgressBar(answeredFields * 10); // multiply by scaling factor of 10, as progress bar is 1-100%
}