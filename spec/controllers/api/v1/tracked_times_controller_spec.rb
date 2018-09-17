require 'spec_helper'

describe Api::V1::TrackedTimesController do
  describe 'GET #index' do
    before(:each) do
      @user = FactoryBot.create :user
      auth_headers = @user.create_new_auth_token
      request.headers.merge!(auth_headers)

      @tracked_time = FactoryBot.create :tracked_time
      get :index, params: {user_id: @user.id}
    end

    it 'responds with 200 status code' do
      expect(response.code).to eq('200')
    end

    # it 'returns the serialized tracked time attributes' do
    #   expect(JSON.parse(response.body)['data'].length).to eq(1)
    #   expect(JSON.parse(response.body)['data'].first['attributes']).to eq({'name' => @user.name, 'email' => @user.email})
    # end
  end

  # describe "GET #show" do
  #   before(:each) do
  #     @user = FactoryBot.create :user
  #     auth_headers = @user.create_new_auth_token
  #     request.headers.merge!(auth_headers)
  #     get :show, params: {id: @user.id}
  #   end

  #   it 'responds with 200 status code' do
  #     expect(response.code).to eq('200')
  #   end

  #   it "returns the serialized user attributes" do
  #     expect(JSON.parse(response.body)['data']['attributes']).to eq({'name' => @user.name, 'email' => @user.email})
  #   end
  # end
end
