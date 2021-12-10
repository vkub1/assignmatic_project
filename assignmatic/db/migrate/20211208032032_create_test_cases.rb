class CreateTestCases < ActiveRecord::Migration[6.1]
  def change
    create_table :test_cases do |t|
      t.references :assignment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
