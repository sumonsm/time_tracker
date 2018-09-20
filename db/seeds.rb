puts 'Creating users...'
@password = 'iambatman!'
@user1 = User.create!(name: 'Bruce Wayne', email:'batman@batcave.com', password: @password, password_confirmation: @password)
@user2 = User.create!(name: 'Alfred Pennyworth', email:'alfred@waynemanor.com', password: @password, password_confirmation: @password)
puts 'done'

puts 'Creating tracked_times...'
TrackedTime.create!(user: @user1, started: Time.now - 100.minutes, stopped: Time.now - 97.minutes)
TrackedTime.create!(user: @user1, started: Time.now - 12.minutes, stopped: Time.now - 10.minutes)
TrackedTime.create!(user: @user1, started: Time.now - 30.minutes, stopped: Time.now - 28.minutes)
TrackedTime.create!(user: @user2, started: Time.now - 14.minutes, stopped: Time.now - 10.minutes)
puts 'done'
