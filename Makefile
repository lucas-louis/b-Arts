BUILD_PATH			=	.
TE_DOCKER_NAME		=	barts:latest
PORT				=	3000

all			:	build start

build		:
	@echo "🚧 Building b-Arts's docker image..."
	docker build $(BUILD_PATH) -t $(TE_DOCKER_NAME)

start		:
	@echo "🚀 Starting b-Arts's docker image..."
	docker run -p $(PORT):$(PORT) $(TE_DOCKER_NAME)

.PHONY		:	all build start