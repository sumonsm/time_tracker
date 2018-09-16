class TrackedTime < ApplicationRecord
  belongs_to :user

  validates :started, :stopped, presence: true
end
