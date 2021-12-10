class Api::V1::TestCasesController < ApplicationController
    def show
        test_case = TestCase.find params[:id]
    end

    def create
        assignment = Assignment.find params[:assignment_id]
        test_case = TestCase.new()
        test_case.assignment = assignment
        if test_case.save 
            input = Input.new(params.require(:input).permit(:data_type, :value))
            input.test_case = test_case
            output = Output.new(params.require(:output).permit(:value))
            output.test_case = test_case
            if input.save && output.save
                render json:{test_case_id: test_case.id}
            else 
                render json:{errors: {input_errors: input.errors.full_messages, output_errors: output.errors.full_messages}}
            end
        else
            render json:{errors:test_case.errors.full_messages, status:422}
        end
    end

    # def update
    #     test_case = TestCase.find params[:id]
    #     if test_case.update 
    #         input = Input.new(params.require(:input).permit(:data_type, :value))
    #         output = Output.new(params.require(:output).permit(:data_type, :value))
    #         if input.update && output.save
    #             render json:{test_case_id: test_case.id}
    #         else {
    #             render json:{input_errors: input.errors.full_messages, output_errors: output.errors.full_messages}
    #         }
    #         render json:{id: test_case.id}
    #     else
    #         render json:{errors:test_case.errors, status:422}
    #     end
    # end
end
