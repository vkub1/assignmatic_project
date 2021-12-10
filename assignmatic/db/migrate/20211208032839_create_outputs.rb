class CreateOutputs < ActiveRecord::Migration[6.1]
  def change
    create_table :outputs do |t|
      t.references :test_case, null: false, foreign_key: true
      t.text :value

      t.timestamps
    end
  end
end
