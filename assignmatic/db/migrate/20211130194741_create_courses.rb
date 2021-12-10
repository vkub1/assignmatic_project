class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.integer :price
      t.boolean :is_private
      t.timestamps
    end
  end
end
