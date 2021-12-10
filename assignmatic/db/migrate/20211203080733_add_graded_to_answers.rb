class AddGradedToAnswers < ActiveRecord::Migration[6.1]
  def change
    add_column :answers, :graded, :boolean, default: false
  end
end
