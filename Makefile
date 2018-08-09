watch: build
	npm run watch

build: clean
	npm run build
	cp index.html build/index.html
	cp app.css build/app.css

clean:
	rm -rf build

.PHONY: build, clean, watch
