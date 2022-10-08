import { FC } from "react";
import ActivityCardItem from "../components/ActivityCardItem";
import LessonCardItem from "../components/LessonCardItem";
import { IDataProps } from "../interface/CardInterface";

export const initialState: {
  selectedPlan: IDataProps[];
  addActivity: (domain: IDataProps) => void;
  addLesson: (domain: IDataProps) => void;
  removeActivity: (domain: IDataProps) => void;
} = {
  selectedPlan: [],
  addActivity: () => {},
  addLesson: () => {},
  removeActivity: () => {},
};

export enum ReducerActionType {
  Add_Activity,
  Add_Lesson,
  Remove_Activity,
}

export type ReducerAction = {
  type: IDataProps | ReducerActionType;
  payload?: any;
};

type initState = {
  selectedPlan: IDataProps[];
};

const ActivityLessonSelectReducer = (
  state: initState,
  action: ReducerAction
): initState => {
  const { type, payload } = action;
  switch (type) {
    case ReducerActionType.Add_Activity:
      return {
        selectedPlan: [...state.selectedPlan, payload.activity],
      };
    case ReducerActionType.Add_Lesson:
      return {
        selectedPlan: [...state.selectedPlan, payload.lesson],
      };
    case ReducerActionType.Remove_Activity:
      return {
        selectedPlan: state.selectedPlan.filter((state) => {
          state != payload.activity;
        }),
      };

    default:
      throw new Error();
  }
};

export default ActivityLessonSelectReducer;
