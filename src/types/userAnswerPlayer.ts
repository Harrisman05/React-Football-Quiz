export default interface UserAnswerPlayer {
  [key: string]: FormDataEntryValue | undefined;
  name?: '' | undefined;
  nationality?: string | undefined;
  team?: string | undefined;
}
