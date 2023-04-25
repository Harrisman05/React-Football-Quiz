import AllStatsPlayer from './AllStatsPlayer';

// This is probably over-complex, but this type is needed to prevefnt type error of AllStatPlayer reduce function. Pick utility type extracts the values needed from AllStatPlayer type to make a new type. Could just re-type everything manually, but this method reduces duplication (altho is more complex). ChatGPT helped create this

export default interface AllStatPlayerReduce extends Pick<
  AllStatsPlayer extends Map<infer K, infer V> ? V : never,
  'name' | 'firstname' | 'lastname' | 'nationality' | 'team' | 'ranking' | 'goals'
> {}
