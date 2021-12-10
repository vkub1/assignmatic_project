class GradesSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :grade,
    :comment
  )
end
