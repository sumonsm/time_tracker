module Api::V1
  class TrackedTimesController < ApiController
    before_action :set_user

    # GET /v1/tracked_times/
    def index
      render json: @user.tracked_times.all
    end

    # POST /v1/tracked_times/
    def create
      @tracked_time = TrackedTime.new(tracked_times_params)
      @tracked_time.user = current_user
      if @tracked_time.save
        render json: {}, status: :created
      else
        render json: {errors: @tracked_time.errors}, status: :unprocessable_entity
       end
    end

    private

    def set_user
      @user = current_user
    end

    def tracked_times_params
      params.require(:tracked_times).permit(:started, :stopped, :user_id)
    end
  end
end
