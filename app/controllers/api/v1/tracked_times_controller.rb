module Api::V1
  class TrackedTimesController < ApiController
    before_action :set_user

    # GET /v1/users/{user_id}/tracked_times/
    def index
      render json: @user.tracked_times.all
    end

    # POST /v1/users/{user_id}/tracked_times/
    def create
      @tracked_time = TrackedTime.new(tracked_times_params)
      if @tracked_time.save
        render json: @tracked_time, status: :created, location: v1_user_tracked_times_url(@tracked_time)
      else
        render json: @tracked_time.errors, status: :unprocessable_entity
       end
    end

    # GET /v1/users/{user_id}/tracked_times/{id}
    def show
      render json: @user.tracked_times.find(params[:id])
    end

    private

    def set_user
      @user = User.find(params[:user_id])
    end

    def tracked_times_params
      params.require(:tracked_times).permit(:started, :stopped, :user_id)
    end
  end
end