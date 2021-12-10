class AddImageUrlToCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :icon_url, :text
  end
end
