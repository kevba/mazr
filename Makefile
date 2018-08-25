watch: build
	npm run watch

build: clean
	npm run build
	cp index.html build/index.html
	cp app.css build/app.css
	$(MAKE) assets

assets:
	rm -rf build/img/*
	cp -r img/ build/

clean:
	rm -rf build

.PHONY: build, clean, watch, assets
