watch: build
	npm run watch

build: clean assets
	npm run build
	cp index.html build/index.html
	cp app.css build/app.css
	cp -r img build/img

clean:
	rm -rf build

.PHONY: build, clean, watch, assets
