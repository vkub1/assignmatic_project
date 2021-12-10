class CourseCollectionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :icon_url,
    :created_at,
    :description,
    :assignments
  )

  

end
