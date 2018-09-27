require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new }
  let(:password) { 'big!secret' }

  it "is valid with valid attributes" do
    subject.name = "Bruce Wayne"
    subject.email = "bruce@batcave.com"
    subject.password = password
    subject.password_confirmation = password
    expect(subject).to be_valid
  end

  it "is not valid without email" do
    subject.name = "Bruce Wayne"
    subject.password = password
    subject.password_confirmation = password
    expect(subject).to_not be_valid
  end

  it "is not valid with incorrect email format" do
    subject.email = "bruce#batcave"
    subject.name = "bruce"
    subject.password = password
    subject.password_confirmation = password
    expect(subject).to_not be_valid
  end

  it "is not valid without passwords" do
    subject.name = "Bruce Wayne"
    subject.email = "bruce@batcave.com"
    expect(subject).to_not be_valid
  end

  it "is not valid with mismatching passwords" do
    subject.name = "Bruce Wayne"
    subject.email = "bruce@batcave.com"
    subject.password = password
    subject.password_confirmation = 'foo'
    expect(subject).to_not be_valid
  end
end
