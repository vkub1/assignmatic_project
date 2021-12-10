class Api::V1::EnrollmentsController < Api::ApplicationController
    def create
        enrollment = Enrollment.new(params.require(:enrollment).permit(:user_id, :course_id))
        if enrollment.save
            render json:{id: enrollment.id}
        else
            render json:{errors:enrollment.errors, status:422}
        end
    end
end
