class Api::V1::UsersController < Api::ApplicationController
    def create
        user_params = params.require(:user).permit(:name, :email, :password, :password_confirmation)
        user = User.new user_params
        if user.save
            session[:user_id] = user.id
            render json: {user: user}
        else
            render(
                json: { errors: user.errors.messages },
                status: 422 #Unprocessable Entity
            )
        end
    end

    def show
        user = User.find params[:id]
        render json: user
    end
end
