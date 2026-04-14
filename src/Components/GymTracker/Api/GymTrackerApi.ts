import { ApiRequest, LocalApiRequest, type ApiResponse } from "../../../API/ApiCall";
import type { Exercise, GetDailyWorkoutsPayload, SaveExercisePayload, SaveWorkout } from "../Model/Exercise";

const base = "/commonservice/GymTracker/v1";

export async function GetAllExercises(): Promise<ApiResponse<Exercise[]>> {
    const result = await ApiRequest<Exercise[]>(`${base}/GetExercises`, {
        method: "POST",
        includeAuth: true,
        includeSubscriptionKey: true
    });
    return result;
}

export async function SaveExercise(payload: SaveExercisePayload) {
  const formData = await buildFormData(payload);

  return ApiRequest(`${base}/SaveExercise`, {
    method: "POST",
    formData,
    includeAuth: true,
    includeSubscriptionKey: true,
  });
}

export async function SaveDailyWorkout(payload: SaveWorkout): Promise<ApiResponse<number>> {

  const result = await ApiRequest<number>(`${base}/SaveDailyWorkout`, {
        method: "POST",
        includeAuth: true,
        includeSubscriptionKey: true,
        payload: payload
    });
  return result;
}

export async function GetDailyWorkouts(payload: GetDailyWorkoutsPayload): Promise<ApiResponse<SaveWorkout[]>> {

  const result = await ApiRequest<SaveWorkout[]>(`${base}/GetDailyWorkouts`, {
        method: "POST",
        includeAuth: true,
        includeSubscriptionKey: true,
        payload: payload
    });
  return result;
}

async function buildFormData(form: SaveExercisePayload) {
  const formData = new FormData();

  formData.append("Id", String(form.id ?? 0));
  formData.append("Name", form.name);
  formData.append("Category", form.category);
  formData.append("MuscleGroup", form.muscleGroup);
  formData.append("Equipment", form.equipment ?? "");
  formData.append("DifficultyLevel", form.difficultyLevel ?? "");
  formData.append("Description", form.description ?? "");
  formData.append("VideoUrl", form.videoUrl ?? "");
  formData.append("ImageUrl", form.imageUrl ?? "");
  formData.append("ArticleUrl", form.articleUrl ?? "");
  formData.append("IsCustom", String(form.isCustom));
  formData.append("CreatedAt", new Date().toISOString());
  formData.append("UpdatedAt", new Date().toISOString());
  formData.append("IsImageUpdated", form.IsImageUpdated.toString());

  let fileToSend = form.file;
  if (!fileToSend && form.imageUrl) {
    try {
      fileToSend = await urlToFile(form.imageUrl, "image.jpg");
    } catch (err) {
      console.warn("Failed to convert imageUrl to file", err);
    }
  }

  if (!fileToSend) {
    fileToSend = new File([""], "dummy.jpg", { type: "image/jpeg" });
  }

  formData.append("File", fileToSend);
  return formData;
}

async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const contentType = blob.type || "image/jpeg";
  return new File([blob], filename, { type: contentType });
}