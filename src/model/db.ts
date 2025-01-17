import Dexie, { Table } from 'dexie';

export interface Markup {
  id: string;
  htmlState: string;
  cssState: string;
}

export class MySubClassedDexie extends Dexie {
  markups!: Table<Markup>;

  constructor() {
    super('CamuDatabase');
    this.version(1).stores({
      markups: 'id',
    });
  }
}

export const db = new MySubClassedDexie();
