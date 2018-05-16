import { DetailFrame } from './detail.frame';
export class Frame{
    name: string;
    model: string;
    detail = new DetailFrame();
    image: string;
    category: number;    
    checked: boolean;    
}