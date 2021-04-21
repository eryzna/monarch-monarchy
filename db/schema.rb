# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_21_212615) do

  create_table "images", force: :cascade do |t|
    t.string "img_url"
  end

  create_table "my_sightings", force: :cascade do |t|
    t.string "first_name"
    t.string "date"
    t.string "town"
    t.string "state_province"
    t.integer "num_of_individuals"
    t.integer "year_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sightings", force: :cascade do |t|
    t.string "date"
    t.string "town"
    t.string "state_province"
    t.integer "num_of_individuals"
    t.integer "year_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username", default: "f"
    t.string "notes", default: "f"
  end

  create_table "years", force: :cascade do |t|
    t.integer "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
