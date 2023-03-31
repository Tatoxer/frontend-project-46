install:
	npm ci

run:
	node bin/index.js

run-help:
	node bin/index.js -h

run-files:
	node bin/index.js ./__fixtures__/file1.json ./__fixtures__/file2.json

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

lint:
	npx eslint