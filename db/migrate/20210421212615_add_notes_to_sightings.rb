class AddNotesToSightings < ActiveRecord::Migration[6.0]
  def change
    add_column :sightings, :notes, :string, default: false

  end
end
