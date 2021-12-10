class TestCase < ApplicationRecord
  belongs_to :assignment
  has_many :inputs, dependent: :destroy
  has_many :outputs, dependent: :destroy

end
