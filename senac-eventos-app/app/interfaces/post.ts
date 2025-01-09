import { Like } from "./likes";
import { Participant } from "./participant";

export interface Post {
    map(arg0: (post: any) => import("react").JSX.Element): import("react").ReactNode;
    idPost: number;
    participant: Participant;
    imageUrl: string;
    description: string;
    likes?: Like[];
    data: any;
}  

export interface CreatePost {
    idParticipant: number;
    imageUrl: string;
    description: string;
}