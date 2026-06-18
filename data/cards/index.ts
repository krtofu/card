import { IchikaCards } from "./Leoneed/Ichika"; 
// import { SakiCards } from "./Leoneed/Saki"; 
// import { MinoriCards } from "./MMJ/Minori";
// import { KanadeCards } from "./25/Kanade";
import type { FinalCardInfo } from "./template";

const Leoneed_CARDS = [
  ...IchikaCards,
  // ...SakiCards,
];

//const MMJ_CARDS = [
  // ...MinoriCards,
//];

//const 25_CARDS = [
  // ...KanadeCards,
//];

export const ALL_CARDS: FinalCardInfo[] = [
  ...Leoneed_CARDS,
  //...MMJ_CARDS,
  //...25_CARDS,
];