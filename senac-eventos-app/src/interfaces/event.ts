import { AreaOfExpertiseDTO } from "./areaOfExpertise";
import { Checkin } from "./checkin";
import { Speaker } from "./speaker";


export interface Event {
    idActivity: number;
    title: string;
    description: string;
    time: string;
    date: string;
    location: string;
    checkins?: Checkin[];
    speaker?: Speaker[];
    areaOfExpertise: AreaOfExpertiseDTO[];
}
