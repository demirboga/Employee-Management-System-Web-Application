package net.javaguides.ems.Mapper;

import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.entity.Projects;

public class ProjectsMapper {
    public static ProjectsDto maptoProjectDto(Projects projects){
        ProjectsDto projectsDto = new ProjectsDto();
        projectsDto.setId(projects.getId());
        projectsDto.setProjectName(projects.getProjectName());
        projectsDto.setProjectDescription(projects.getProjectDescription());
        projectsDto.setDepartment(projects.getDepartment());
        projectsDto.setEmployees(projects.getEmployees());
        projectsDto.setManager(projects.getManager());
        return projectsDto;
    }

    public static Projects maptoProjects(ProjectsDto projectsDto){
        Projects projects = new Projects();
        projects.setId(projectsDto.getId());
        projects.setProjectName(projectsDto.getProjectName());
        projects.setProjectDescription(projectsDto.getProjectDescription());
        projects.setDepartment(projectsDto.getDepartment());
        projects.setEmployees(projectsDto.getEmployees());
        projects.setManager(projectsDto.getManager());
        return projects;
    }
}
