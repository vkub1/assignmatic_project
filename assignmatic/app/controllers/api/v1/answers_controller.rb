class Api::V1::AnswersController < Api::ApplicationController
    before_action :find_answer, only: [:show, :update, :test_code]

    def index
        assignment = Assignment.find params[:assignment_id]
        render(json: assignment.answers, include: ["user", "grades"])
    end

    def show
        render(json: @answer, include: ["assignment", "grades", "user" ])
    end

    def create
        answer = Answer.new(params.require(:answer).permit(:solution, :user_id, :assignment_id))
        if answer.save
            render json:{id: answer.id}
        else
            render json:{errors:answer.errors, status:422}
        end
    end

    def update
        if @answer.update(params.require(:answer).permit(:solution))
            render json:{id: @answer.id}
        else
            render json:{errors:@answer.errors, status:422}
        end
    end

    def test_code
        assignment = Assignment.find params[:assignment_id]
        answer = Answer.find params[:id]
        context = ExecJS.compile(answer.solution)
        responses = []
        assignment.test_cases.each do |test_case|
            test_case.inputs.each do |input|
                if input.data_type == "integer"
                    value = input.value.to_i
                    responses = responses.push({actual: context.call(assignment.function, value), expected: test_case.outputs[0].value, input:value})
                elsif input.data_type == "float"
                    value = input.value.to_f
                    responses = responses.push({actual: context.call(assignment.function, value), expected: test_case.outputs[0].value, input:value})
                else
                    responses  = responses.push({actual: context.call(assignment.function, value), expected: test_case.outputs[0].value, input:value})
                end
            end
        end
        render json: {responses: responses}
        
    end

    private

    def find_answer
        @answer = Answer.find params[:id]
    end
end
