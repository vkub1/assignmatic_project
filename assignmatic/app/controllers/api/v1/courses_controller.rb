class Api::V1::CoursesController < Api::ApplicationController
    before_action :find_course, only: [:show, :update, :destroy, :teacher]
    def index
        courses = Course.order(created_at: :desc)
        render(json: courses, each_serializer: CourseCollectionSerializer)
    end

    def show
        course = Course.find params[:id]
        render(json: course, include: ["assignments", "teacher", "enrolled_users"])
    end

    def create
        course = Course.new(course_params)
        if course.save
            user = User.find params[:user]
            e = Enrollment.create(user:user, course: course, is_teacher:true)
            render json:{id: course.id}
        else
            render json:{errors:course.errors.full_messages, status:422}
        end
    end

    def update 
        if @course.update(course_params)
            render json:{id: course.id}
        else
            render json:{errors:course.errors, status:422}
        end
    end

    def destroy
       if @course.destroy
            render(json:{status:200})
        else
            render(json:{status:500})
        end
    end

    def teacher
        render json: @course.teacher
    end

    private

    def find_course
        @course = Course.find params[:id]
    end

    def course_params
        params.require(:course).permit(:title,:description,:price)
    end

end
