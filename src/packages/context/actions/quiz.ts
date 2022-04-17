import { User, UserInput } from "../../utility";

export enum QuizActionType {
  SaveUserData,
  SaveAnsweredQuestionData,
}

export interface SaveUserAction {
  type: QuizActionType.SaveUserData;
  payload: User;
}
export interface SaveAnswerAction {
  type: QuizActionType.SaveAnsweredQuestionData;
  payload: UserInput;
}

// action creators
export const saveUser = (payload: User): SaveUserAction => ({
  type: QuizActionType.SaveUserData,
  payload,
});
export const saveQuestionAnswer = (payload: UserInput): SaveAnswerAction => ({
  type: QuizActionType.SaveAnsweredQuestionData,
  payload,
});

export type QuizActions = SaveUserAction | SaveAnswerAction;
