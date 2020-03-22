start:
	npm start

local-backend:
	npm run local-backend

lint:
	npm run lint

build:
	npm run build

deploy-dev-from-local:
	npm run deploy-dev-from-local

update:
	npm run fetch-data

build-size:
	npm run reset-cache
	npm run build
	npm run size-limit
