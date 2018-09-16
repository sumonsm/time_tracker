class CreateTrackedTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :tracked_times do |t|
      t.references :user, foreign_key: true
      t.datetime :started, null: false
      t.datetime :stopped, null: false
    end
  end
end
