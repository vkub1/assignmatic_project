class Course < ApplicationRecord
    has_many :enrollments, dependent: :destroy
    has_many :enrolled_users, through: :enrollments, source: :user

    has_many :assignments, dependent: :destroy

    validates :title, presence: true
    validates :description, presence: true

    def teacher
        self.enrolled_users.where('is_teacher = true')[0]
    end
end
