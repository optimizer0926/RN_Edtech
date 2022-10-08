import React, { FC } from "react";
import { createContext, useReducer } from "react";
import ActivityLessonSelectReducer, {
  ReducerActionType,
} from "../reducer/ActivityLessonSelectReducer";
import { initialState } from "../reducer/ActivityLessonSelectReducer";
import { IDataProps } from "../interface/CardInterface";

export const ActivityLessonSelectContext = createContext<{
  selectedPlan: IDataProps[];
  addActivity: (domain: IDataProps) => void;
  addLesson: (domain: IDataProps) => void;
  removeActivity: (domain: IDataProps) => void;
}>(initialState);

const ActivityLessonSelectProvider = ({
  children,
}: {
  children: any;
}): JSX.Element => {
  const [state, dispatch] = useReducer(ActivityLessonSelectReducer, {
    selectedPlan: [],
  });

  const addActivity: (domain: IDataProps) => void = (domain: IDataProps) => {
    dispatch({
      type: ReducerActionType.Add_Activity,
      payload: {
        activity: domain,
      },
    });
    console.log(state.selectedPlan.length);
  };

  const removeActivity: (domain: IDataProps) => void = (domain: IDataProps) => {
    dispatch({
      type: ReducerActionType.Remove_Activity,
      payload: {
        removeActivity: domain,
      },
    });
    console.log(state.selectedPlan.length);
  };

  const addLesson: (domain: IDataProps) => void = (domain: IDataProps) => {
    dispatch({
      type: ReducerActionType.Add_Lesson,
      payload: {
        lesson: domain,
      },
    });
  };

  const value: {
    selectedPlan: IDataProps[];
    addActivity: (domain: IDataProps) => void;
    addLesson: (domain: IDataProps) => void;
    removeActivity: (domain: IDataProps) => void;
  } = {
    addActivity,
    selectedPlan: state.selectedPlan,
    addLesson,
    removeActivity,
  };

  return (
    <ActivityLessonSelectContext.Provider value={value}>
      {children}
    </ActivityLessonSelectContext.Provider>
  );
};

export default ActivityLessonSelectProvider;
