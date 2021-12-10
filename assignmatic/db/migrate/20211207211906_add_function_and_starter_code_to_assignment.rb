class AddFunctionAndStarterCodeToAssignment < ActiveRecord::Migration[6.1]
  def change
    add_column :assignments, :function, :string
    add_column :assignments, :starter_code, :text
  end
end
