import { Event } from "./event";
//import { Participant } from "./participant";

export interface SaveActivity{
    idSaveActivity: number;
    idParticipant: number;
    activity: Event;
}

export interface CreateSaveActivity {
    idParticipant: number;
    idActivity: number;
  }