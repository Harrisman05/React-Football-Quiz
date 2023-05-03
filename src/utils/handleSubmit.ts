import UserAnswers from '../types/UserAnswers';

export default function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // currentTarget because event.target can be anything because of event bubbling - https://stackoverflow.com/questions/73819465/argument-of-type-eventtarget-is-not-assignable-to-parameter-of-type-htmlforme

    const formData = new FormData(form);
    const userAnswers: UserAnswers = new Map();

    for (const [nameId, value] of formData.entries()) {
      console.log(nameId, value);
      const [name, idStr] = nameId.split('-');
      const id = Number(idStr); // values coming from form are always strings, convert to number to avoid type errors
      console.log(id, name, value);

      if (!userAnswers.has(id)) {
        // set id as a key on the user answer map if it doesn't exist
        userAnswers.set(id, {
          [name]: value,
        });
      } else {
        const answerObject = userAnswers.get(id);
        const updatedAnswer = {
          ...answerObject,
          [name]: value,
        };
        userAnswers.set(id, updatedAnswer);
      }
    }
    console.log(typeof userAnswers);
    return userAnswers;
  }

