import { useProjectStore } from "@/store";
import { useEffect } from "react";

export const useProject = () => {
  const projects = useProjectStore((state) => state.projects);
  const featuredProject = useProjectStore((state) => state.featuredProject);
  const otherProjects = useProjectStore((state) => state.otherProjects);
  const isLoading = useProjectStore((state) => state.isLoading);
  const error = useProjectStore((state) => state.error);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const selectProject = useProjectStore((state) => state.selectProject);

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
