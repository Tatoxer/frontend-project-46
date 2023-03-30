install:
	npm ci

run:
	node bin/index.js

runHelp:
	node bin/index.js -h

runFiles:
	node bin/index.js ./src/file1.json ./src/file2.json

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

testCoverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

testWatch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

lint:
	npx eslint