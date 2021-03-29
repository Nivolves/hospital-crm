import convexNorm from '../assests/Convex_Norm.png';
import convexPatology from '../assests/Convex_Pathology.png';
import convexStrangeNorm from '../assests/Convex_Strange_Norm.png';
import linearNorm from '../assests/Linear_Norm.png';
import linearPatology from '../assests/Linear_Pathology.png';
import linearStrangeNorm from '../assests/Linear_Strange_Norm.png';
import reinforcedNorm from '../assests/Reinforced_Norm.png';
import reinforcedPatology from '../assests/Reinforced_Pathology.png';
import reinforcedStrangeNorm from '../assests/Reinforced_Strange_Path.png';


export const TYPICAL_IMAGES = {
  convex: [{image: convexNorm, name: 'Норма'}, {image: convexPatology, name: 'Патологія'}, {image: convexStrangeNorm, name: 'Не визначено'}],
  linear: [{image: linearNorm, name: 'Норма'}, {image: linearPatology, name: 'Патологія'}, {image: linearStrangeNorm, name: 'Не визначено'}],
  reinforced_linear: [{image: reinforcedNorm, name: 'Норма'}, {image: reinforcedPatology, name: 'Патологія'}, {image: reinforcedStrangeNorm, name: 'Не визначено'}],
};