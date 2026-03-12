import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useProjectStore } from "@/store";

export const useProject = () => {
  const {
    projects,
    featuredProject,
    otherProjects,
    isLoading,
    error,
    selectedProject,
    fetchProjects,
    selectProject,
  } = useProjectStore(
    useShallow((state) => ({
      projects: state.projects,
      featuredProject: state.featuredProject,
      otherProjects: state.otherProjects,
      isLoading: state.isLoading,
      error: state.error,
      selectedProject: state.selectedProject,
      fetchProjects: state.fetchProjects,
      selectProject: state.selectProject,
    }))
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    featuredProject,
    otherProjects,
    isLoading,
    error,
    selectedProject,
    fetchProjects,
    selectProject,
  };
};
