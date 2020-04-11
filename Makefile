# Remove auto-generated folders
install:
	npm install

# Remove auto-generated folders
clean:
	rm -rf coverage dist

# Compile TypeScript files to JS
compile:
	rm -rf ./dist
	npx tsc --skipLibCheck

# Starts aplication. Use this on production.
run: compile
	node ./dist/src/cluster

# Starts application in development mode.
dev:
	npx nodemon --watch src --ext ts --exec "make run || exit 1"

# Lint and format code
lint:
	# Lint with tslint
	npx eslint . --ext .ts
	# Format with prettier
	npx prettier --write './src/**/*.ts' --loglevel=error

# Run all tests
test:
	npx jest --forceExit

# Run tests and coverage
coverage:
	npx jest --coverage --forceExit

# Compile and run checks before starting application
# Used on Procfile
release: compile

# First run of the app
bootstrap:
	# Install dependencies
	make install
	# If no .env is found, clone and rename ".env.example"
	( ls .env -R 2>/dev/null && echo "=> Skipping .env file creation" ) \
		|| mv .env.example .env && cp .env .env.example
	# Start local databases and application
	make dev

# ---

rules :=	all	\
					dev \
					run \
					test \
					lint \
					clean	\
					release \
					compile	\
					coverage \
					bootstrap \

.PHONY: $(rules)
.SILENT: $(rules)
