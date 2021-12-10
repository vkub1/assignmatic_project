class CreateInputs < ActiveRecord::Migration[6.1]
  def change
    create_table :inputs do |t|
      t.references :test_case, null: false, foreign_key: true
      t.string :data_type
      t.text :value

      t.timestamps
    end
  end
end
