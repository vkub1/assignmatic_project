class Api::V1::QuestionsController < Api::ApplicationController
    before_action :find_question, only: [:show]

    def show
        render(json: @question, include: ["answers", "assignment"])
    end

    private

    def find_question
        @question = Question.find params[:id]
    end
end
