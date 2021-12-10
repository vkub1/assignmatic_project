class AssignmentsSerializer < ActiveModel::Serializer
  attributes (
    :id,
    :title,
    :instructions,
    :starter_code,
    :teacher,
    :answers,
    :test_cases
  )

  has_many :test_cases, serializer: TestCasesSerializer
  has_many :answers
  


  belongs_to :course, serializer: CoursesSerializer

  def teacher
    Object.course.teacher
  end

end
