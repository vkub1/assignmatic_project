class AnswerCollectionSerializer < ActiveModel::Serializer
  attributes (
    :id,
    :user,
    :solution,
    :assignment.course,
    :grades
  )

  belongs_to :user, serializer: UsersSerializer
end
