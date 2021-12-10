Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      get("/courses/:id/teacher", {to: "courses#teacher"})
      resources :courses, only: [:index, :show, :create, :update, :destroy] do
        resources :assignments, only: [:show, :create, :update] do
          resources :test_cases, only: [:index, :show, :create, :update]
          resources :answers, only: [:index, :show, :create, :update] do
            resources :grades, only: [:create, :update, :show]
          end
        end
      end
      get("/courses/:course_id/assignments/:assignment_id/answers/:id/test", {to: "answers#test_code"})

      resources :enrollments, only: [:create]
      
      
      resource :session, only: [:create, :destroy]
      resources :users, only: [:create, :show] do
        
      end
    end
  end
end
