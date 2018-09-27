require 'rails_helper'
include ActionController::RespondWith

RSpec.describe "TrackedTimes", type: :request do
  describe "GET /v1/tracked_times" do
    before(:each) do
      @user1 = FactoryBot.create :user
      @user2 = FactoryBot.create :user
      @tracked_time = FactoryBot.create :tracked_time, user_id: @user1.id
    end

    it "You shall not pass!! without authentication" do
      get v1_tracked_times_path
      expect(response).to have_http_status(401)
    end

    it "with authentication, json data returned for correct user" do
      @auth_headers = @user1.create_new_auth_token
      get v1_tracked_times_path, headers: @auth_headers
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['data'].length).to eq(1)
      expect(JSON.parse(response.body)['data'].first['attributes']['user-id']).to eq(@user1.id)

      started = JSON.parse(response.body)['data'].first['attributes']['started']
      stopped = JSON.parse(response.body)['data'].first['attributes']['stopped']
      expect(Time.parse(started).to_s).to eq(@tracked_time.started.utc.to_s)
      expect(Time.parse(stopped).to_s).to eq(@tracked_time.stopped.utc.to_s)
    end
  end

  describe "POST /v1/tracked_times" do
    before(:each) do
      @user1 = FactoryBot.create :user
      @user2 = FactoryBot.create :user
      @tracked_time = {started: Time.now - 2.minutes, stopped: Time.now, user_id: @user1.id }
      @params = {tracked_times: @tracked_time}
    end

    it "You shall not pass!! without authentication" do
      post v1_tracked_times_path, params: @params
      expect(response).to have_http_status(401)
    end

    it "with authentication, record was successfully created" do
      @auth_headers = @user1.create_new_auth_token
      post v1_tracked_times_path, params: @params, headers: @auth_headers
      expect(response).to have_http_status(201)
      expect(JSON.parse(response.body)).to eq({})
    end
  end
end
