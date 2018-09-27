class TrackedTime < ApplicationRecord
  belongs_to :user

  validates :started, :stopped, presence: true
  validate :started_before_stopped?

  def started_before_stopped?
    unless stopped && started && stopped > started
      errors.add :stopped, "stopped must be a time after started"
    end
  end
end
