module Api::V1
  class TrackedTimesController < ApiController
    before_action :set_user

    # GET /v1/users
    def index
      render json: @user.tracked_times.all
    end

    # GET /v1/users/{id}
    def show
      render json: @user.tracked_times.find(params[:id])
    end

    private

    def set_user
      @user = User.find(params[:user_id])
    end

  end
end