class Input < ApplicationRecord
  belongs_to :test_case
  validates :data_type, presence: true
  validates :value, presence: true
end
