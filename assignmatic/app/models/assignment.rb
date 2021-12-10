class Assignment < ApplicationRecord
    has_many :answers, dependent: :destroy
    has_many :test_cases, dependent: :destroy
    belongs_to :course

    validates :title, presence: true
    validates :instructions, presence: true
    validates :function, presence: true
    validates :starter_code, presence: true
    

end
