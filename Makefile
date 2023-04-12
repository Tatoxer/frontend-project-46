install:
	npm ci

run:
	node bin/gendiff.js.js

run-help:
	node bin/gendiff.js -h

run-json-files:
	node bin/gendiff.js ./__fixtures__/fileDeep1.json ./__fixtures__/fileDeep2.json

run-yaml-files:
	node bin/gendiff.js ./__fixtures__/fileDeep1.yaml ./__fixtures__/fileDeep2.yml

run-plain:
	node bin/gendiff.js ./__fixtures__/fileDeep1.json ./__fixtures__/fileDeep2.json --format plain

run-json:
	node bin/gendiff.js.js ./__fixtures__/fileDeep1.json ./__fixtures__/fileDeep2.json --format json

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

lint:
	npx eslint