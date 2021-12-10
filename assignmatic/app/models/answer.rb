class Answer < ApplicationRecord
    has_many :grades, dependent: :destroy
    belongs_to :user
    belongs_to :assignment
end
