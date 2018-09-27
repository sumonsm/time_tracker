FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Foo Bar #{n}" }
    sequence(:email) { |n| "foo_#{n}@test.com" }
    password {'secret123'}
    password_confirmation {'secret123'}
  end
end
