class AnswersSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :solution,
    :user,
    :assignment.course,
    :grades
  )

  belongs_to :assignment
  has_many :grades, serializer: GradesSerializer


  belongs_to :user, serializer: UsersSerializer
end
