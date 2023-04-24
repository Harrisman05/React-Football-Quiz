// nationality and team are optional parameter (becaues of randomisation), which if they exist, can contain an string or empty string

export default interface UserAnswers
  extends Map<
    number,
    {
        [key: string]: FormDataEntryValue | undefined
        name?: '';
        nationality?: string | '';
        team?: string | '';
    }
  > {}
