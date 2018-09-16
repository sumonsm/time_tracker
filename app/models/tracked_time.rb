class TrackedTime < ApplicationRecord
  belongs_to :user

  validates :started, :stopped, presence: true
  validates_datetime :started, :stopped
  validates_datetime :stopped, :after => :started
end
