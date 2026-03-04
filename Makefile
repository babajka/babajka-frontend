start:
	npm start

local-backend:
	npm run local-backend

lint:
	npm run lint

_pre_build:
	[ ! -z "${BACKEND_URL}" ] || (echo "\n\n\tPlease, set 'BACKEND_URL' env var, or run 'make build'\n\n" && exit 1)
	@echo "\n\n\tWARNING: Generate static pages. Make sure actual api at ${BACKEND_URL}\n\n"

build:
	BACKEND_URL=https://api-prod.wir.by npm run build

deploy-dev-from-local:
	npm run deploy-dev-from-local

deploy-prod-from-local:
	npm run deploy-prod-from-local

update:
	npm run fetch-data

build-size:
	npm run size

analyze:
	npm run analyze

install:
	npm i

docker-build:
	docker build --build-arg WIR_ENV=staging --build-arg BACKEND_URL=https://api.wir.by --build-arg BABAJKA_GOOGLE_API_KEY='' -t babajka/frontend .

docker-publish:
	make docker-build
	docker push babajka/frontend

docker-run-locally:
	docker run -dp 3000:3000 babajka/frontend