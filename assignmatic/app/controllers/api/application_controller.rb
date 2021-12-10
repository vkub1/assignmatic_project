class Api::ApplicationController < ApplicationController

    private
    

    def authenticate_user!
        unless current_user.present?
            render(json:{status: 401})
        end
    end
end
