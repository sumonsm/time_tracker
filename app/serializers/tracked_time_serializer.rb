class TrackedTimeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :started, :stopped
end
