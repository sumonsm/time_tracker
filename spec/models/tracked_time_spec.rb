require 'rails_helper'

RSpec.describe TrackedTime, type: :model do
  before :all do
    @user = User.find_by(name: 'Bruce Wayne', email: 'batphone@batcate.com') ||
            User.create(name: 'Bruce Wayne', email: 'batphone@batcate.com',
                        password: '!secret123', password_confirmation: '!secret123')
  end

  subject { described_class.new }

  it "is valid with valid attributes" do
    subject.started = Time.now - 20.seconds
    subject.stopped = Time.now
    subject.user_id = @user.id
    expect(subject).to be_valid
  end

  it "is not valid without stopped" do
    subject.started = Time.now - 20.seconds
    subject.user_id = @user.id
    expect(subject).to_not be_valid
  end

  it "is not valid without started" do
    subject.stopped = Time.now
    subject.user_id = @user.id
    expect(subject).to_not be_valid
  end

  it "is not valid without user" do
    subject.started = Time.now - 20.seconds
    subject.stopped = Time.now
    expect(subject).to_not be_valid
  end

  it "is not valid if stopped is earlier than started" do
    subject.started = Time.now
    subject.stopped = Time.now - 20.seconds
    subject.user_id = @user.id
    expect(subject).to_not be_valid
  end

  it "is not valid if started is not datetime" do
    subject.started = 'foo'
    subject.stopped = Time.now - 20.seconds
    subject.user_id = @user.id
    expect(subject).to_not be_valid
  end

  it "is not valid if stopped is not datetime" do
    subject.started = Time.now - 20.seconds
    subject.stopped = 'foo'
    subject.user_id = @user.id
    expect(subject).to_not be_valid
  end
end
