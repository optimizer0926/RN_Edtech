import { FC } from "react";
import ActivityCardItem from "../components/ActivityCardItem";
import LessonCardItem from "../components/LessonCardItem";
import { IDataProps } from "./CardInterface";

export interface SearchContext {
  activitiesFilters: string;
  domainFilters: string;
  updateSearchFilter: (domain: string) => void;
}

export interface ActivityLessonSelectContextProps {
  selectedPlan: IDataProps[];
  addActivity: (domain: IDataProps) => void;
  addLesson: (domain: IDataProps) => void;
  removeActivity: (domain: IDataProps) => void;
}
