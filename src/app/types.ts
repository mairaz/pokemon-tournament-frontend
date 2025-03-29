export const SortOptions = ['Wins', 'Losses', 'Name', 'Tie', 'Id'] as const
export type SortOptions = typeof SortOptions[number];

export const SortDirection = ['Asc', 'Desc'] as const
export type SortDirection = typeof SortDirection[number];


export interface Pokemon {
  id: number;
  name: string;
  image:string;
  type:string;
  wins: number;
  losses: number;
  ties: number;
}