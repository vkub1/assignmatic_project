class CreateAssignments < ActiveRecord::Migration[6.1]
  def change
    create_table :assignments do |t|
      t.references :course, null: false, foreign_key: true
      t.string :title
      t.text :instructions
      t.timestamps
    end
  end
end
