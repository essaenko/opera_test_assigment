export interface ITransaction {
  hash: string;
  from: string;
  to: string;
}

export interface IBlock {
  hash: string;
  number: string;
  transactions: ITransaction[];
}

export interface IStore {
  block: {
    loaded: boolean;
    loading: boolean;
    data: IBlock;
    error?: string;
  }
}
