class Output < ApplicationRecord
  belongs_to :test_case
  validates :value, presence: true
end
