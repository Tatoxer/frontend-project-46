install:
	npm ci

run:
	node bin/index.js

runHelp:
	node bin/index.js -h

runFiles:
	node bin/index.js ./src/file1.json ./src/file2.json

test:
	npx jest

testCoverage:
	npx jest --coverage

testWatch:
	npx jest --watch

lint:
	npx eslint