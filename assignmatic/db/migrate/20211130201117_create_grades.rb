class CreateGrades < ActiveRecord::Migration[6.1]
  def change
    create_table :grades do |t|
      t.float :grade
      t.text :comment
      t.references :answer, null: false, foreign_key: true
      t.timestamps
    end
  end
end
