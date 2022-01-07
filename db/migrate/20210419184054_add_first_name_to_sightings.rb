class AddFirstNameToSightings < ActiveRecord::Migration[6.0]
  def change
    add_column :sightings, :username, :string, default: false
  end
end
