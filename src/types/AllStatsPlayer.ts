export default interface AllStatsPlayer {
    [id: number]: {
        name: string;
        firstname: string;
        lastname: string;
        nationality: string;
        team: string;
        ranking: number;
        goals: number;
    }
}