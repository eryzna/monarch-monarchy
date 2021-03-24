class CreateSitings < ActiveRecord::Migration[6.0]
  def change
    create_table :sitings do |t|
      t.string :date
      t.string :town
      t.string :state_province
      t.integer :num_of_individuals
      t.integer :year_id
      t.timestamps
    end
  end
end
