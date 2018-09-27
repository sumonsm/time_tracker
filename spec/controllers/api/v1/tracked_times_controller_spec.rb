require 'spec_helper'

describe Api::V1::TrackedTimesController do
  describe 'GET #index' do
    before(:each) do
      @user = FactoryBot.create :user
      auth_headers = @user.create_new_auth_token
      request.headers.merge!(auth_headers)

      @tracked_time = FactoryBot.create :tracked_time, user_id: @user.id
      get :index
    end

    it 'responds with 200 status code' do
      expect(response.code).to eq('200')
    end

    it 'returns the serialized tracked time attributes' do
      expect(JSON.parse(response.body)['data'].length).to eq(1)
      expect(JSON.parse(response.body)['data'].first['attributes']['user-id']).to eq(@user.id)

      started = JSON.parse(response.body)['data'].first['attributes']['started']
      stopped = JSON.parse(response.body)['data'].first['attributes']['stopped']
      expect(Time.parse(started).to_s).to eq(@tracked_time.started.utc.to_s)
      expect(Time.parse(stopped).to_s).to eq(@tracked_time.stopped.utc.to_s)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      before(:each) do
        @user = FactoryBot.create :user
        auth_headers = @user.create_new_auth_token
        request.headers.merge!(auth_headers)

        @tracked_time = {started: Time.now - 2.minutes, stopped: Time.now, user_id: @user.id }
        @params = {tracked_times: @tracked_time}
        post :create, params: @params
      end

      it 'responds with 201 status code' do
        expect(response.code).to eq('201')
      end
    end

    context "with invalid attributes" do
      before(:each) do
        @user = FactoryBot.create :user
        auth_headers = @user.create_new_auth_token
        request.headers.merge!(auth_headers)

        @tracked_time = {started: Time.now - 2.minutes, user_id: @user.id }
        @params = {tracked_times: @tracked_time}
        post :create, params: @params
      end

      it 'responds with 422 status code' do
        expect(response.code).to eq('422')
      end

      it 'responds with error description' do
        expect(JSON.parse(response.body)['errors']).to be_present
      end
    end
  end
end
