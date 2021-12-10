class Api::V1::GradesController < Api::ApplicationController
    def create
        grade = Grade.new(params.require(:grade).permit(:grade, :comment))
        answer = Answer.find params[:answer_id]
        grade.answer = answer
        if grade.save
            grade.answer.update(graded:true)
            render json:{id: grade.id}
        else
            render json:{errors:grade.errors, status:422}
        end
    end

    def show
        grade = Grade.find params[:id]
    end

    def update
        grade = Grade.find params[:id]
        if grade.update(params.require(:grade).permit(:grade, :comment))
            render json:{id: grade.id}
        else
            render json:{errors:grade.errors, status:422}
        end
    end
end
