import UserAnswers from '../types/UserAnswers';

export default function updateUserAnswers(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget; // currentTarget because event.target can be anything because of event bubbling - https://stackoverflow.com/questions/73819465/argument-of-type-eventtarget-is-not-assignable-to-parameter-of-type-htmlforme

  const formData = new FormData(form);
  const userAnswers: object = {}; 

  // Loop through all user entries, and update userAnswer object, which triggers useEffect to handle check answers
  for (const [inputTypeHyphenated, value] of formData.entries()) {
    const [id, name] = extractInputType(inputTypeHyphenated);

    !userAnswers.hasOwnProperty(id) ? setId(userAnswers, id, name, value) : 
    updateValue(userAnswers, id, name, value);
    }
    console.log(userAnswers);
    return userAnswers;
}

function extractInputType(inputType: string): [number, string] {
  // explicit return type as function does a type conversion
  console.log(inputType);
  const [name, idStr] = inputType.split('-');
  const id = Number(idStr); // values coming from form are always strings, convert to number to avoid type errors
  console.log(id, name);
  return [id, name];
}

// Using single responsibility principle with functions performing one defined action

function setId(
  userAnswers: object,
  id: number,
  name: string,
  value: FormDataEntryValue
) {
  // set id as a key on the user answer map if it doesn't exist

  userAnswers[id] = {
    [name]: value
  };
}

function updateValue(
  userAnswers: object,
  id: number,
  name: string,
  value: FormDataEntryValue
) {
  const answerObject = userAnswers[id];
  const updatedAnswer = {
    ...answerObject,
    [name]: value,
  };
  userAnswers[id] = updatedAnswer;
}
