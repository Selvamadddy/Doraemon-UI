export interface Exercise {
  id: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment?: string;
  difficultyLevel?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  articleUrl?: string;
  createdAt: string;   // Date comes as string from API
  updatedAt: string;
  isCustom: boolean;
  userId: number | undefined;
}

export interface SaveExercisePayload {
  id?: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment?: string;
  difficultyLevel?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  articleUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  isCustom: boolean;
  userId?: number;
  file?: File; 
  IsImageUpdated : boolean;
}

export interface SaveWorkout{
  id: number
  name : string;
  description : string;
  workoutDate : Date;
  exercises : WorkoutExercise[];
}

export interface WorkoutExercise{
  id: number;
  exerciseId : number;
  sets : number;
  completedSets: number;
  reps: number;
  completedReps: number;
  weight: number;
  completedWeight: number;
  duration: number;
  completedDuration: number;
  note: string;
  status: boolean;
  isUpdated: boolean;
}

export interface GetDailyWorkoutsPayload{
 startDate : Date;
 endDate : Date;
}