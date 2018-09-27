FactoryBot.define do
  factory :tracked_time do
    association :user, factory: :user
    started { Time.now - 3.minutes }
    stopped { Time.now - 1.minutes }
  end
end
