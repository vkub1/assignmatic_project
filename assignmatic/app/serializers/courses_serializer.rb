class CoursesSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :description,
    :icon_url,
    :is_private,
    :created_at,
    :updated_at,
    :assignments,
    :price,
    :teacher,
    :enrolled_users
  )

  def teacher
    Object.teacher
  end

  has_many :enrolled_users

  has_many :assignments, serializer: AssignmentSerializer
  
end
