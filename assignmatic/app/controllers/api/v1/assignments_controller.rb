class Api::V1::AssignmentsController < Api::ApplicationController
    before_action :find_assignment, only: [:show, :update, :destroy]


    def show
        render(json: @assignment, include: ["answers", "course", "test_cases"])
    end

    def create
        course = Course.find params[:course_id]
        assignment = Assignment.new(assignment_params)
        assignment.course = course
        if assignment.save
            render json:{id: assignment.id}
        else
            render json:{errors:assignment.errors.full_messages, status:422}
        end
    end

    def update
        if @assignment.update(assignment_params)
            render json:{id: assignment.id}
        else
            render json:{errors:assignment.errors.full_messages, status:422}
        end
    end

   

    private

    def find_assignment
        @assignment = Assignment.find params[:id]
    end

    def assignment_params
        params.require(:assignment).permit(:title, :instructions, :function, :starter_code)
    end
end
