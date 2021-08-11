import create from 'zustand';

import { getRandomInd } from '../components/random';

const useStore = create(set=>({
    points:0,
    incPoints: ()=>set(state=>({points: state.points+1})),
    decPoints: ()=>set(state=>({points: state.points-1})),
    answer : 0,
    correctAnswer:()=>set({answer:true}),
    wrongAnswer:()=>set({answer:false}),
    id: getRandomInd(),
    setNextId: ()=>set({id:getRandomInd()}),
}))