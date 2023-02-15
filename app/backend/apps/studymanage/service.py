from apps.studymanage.models import ProjectCreation


class StudyManageService:

    @classmethod
    def get_project_name(cls, project_id):
        project_name = ProjectCreation.objects.get(id=project_id)
        return project_name.project_name

