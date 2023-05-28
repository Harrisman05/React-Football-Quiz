// nationality and team are optional parameter (becaues of randomisation), which if they exist, can contain an string or empty string

export default interface UserAnswers {
  [id: string]: {
    [key: string]: FormDataEntryValue | undefined;
    name?: '' | undefined;
    nationality?: string | '' | undefined;
    team?: string | '' | undefined;
  };
}
