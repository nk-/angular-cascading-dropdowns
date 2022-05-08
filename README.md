# The Traffic Meister - cascading dropdowns

## Application assignment developed in Angular version 13.3.6 (core), with a genuine and plain theme-like CSS.

### A few general impressions on this project realization:

* Designed, developed and delivered with a full product orientation. Therefore it contains not only the elements described in the original assignment but a few more basic ones that could be part of one page for instance. There is a page layout/scope itself as well.

* The result is a modern UI, achieved with a fairly little code. All within here is custom made for this occasion and there is no any other libraries included, none for Angular scope neither any for CSS.

* Usage of all data (from provided service), including images. That made a dropdown widgets logic slightly different than proposed in Instructions.md but, hopefully, _could_ make a better UX overall. With that I _did try_ to show some of my UI "engineering" ideas and I sincerely hope you will like it and not think I did not understand well assignment instruction

![Poster image](Poster.gif)

### Use

`npm install`
`ng serve`
`# Note: In order to try to load originally provided service as is (intact code) but yet more like "the angular way" I did place an exact copy of it in "assets/js/index.js" file and loading it from there.`

### Angular code overview

* Application is structured in a logical way, code is separated between components, services, directives, assets etc., in addequate files within sort of logical folders organization.  

* A few components I made here are fairly generic, such as `select`, `form service`, as well as `loader` component. That should make the application more modular/extandable - as an example, the `traffic-types` component designated for this assignment, 3 dropdown widgets it is rendering, each is using the same generic `select` component.

* I tried to design the code with presumption of it belonging to existing Angular project, as if it was just another component within web app codebase and not as standalone app. This is why the 3 different components in the main `app.compnent` template are rendered there in a different scopes/parts of the main DOM structure.

* No external libraries used, all done within Angular 13 core modules, components, decorators etc. The only thing that was added is Google Material icons font, just to have some icons available for this UI.

* I tried to follow and implement some of the best practices in Angular, i.e. https://blogs.halodoc.io/angular-best-practices/

### CSS

Using a classic CSS installation here was sort of decision, in order to demonstrate the skill on the core of that end.

* It is minimal (barely 900 lines in total which includes some simple animations set), yet it does include definition of completely custom select widget as well as async loader and search widget (Note: the latter two I added as placeholders for a nicer UI).

* Application UI is basic responsive with a very few definitions. It should fit logically to most of the viewports, of course possibly without particular details on UI assets.

* Styles are also logically organized to belong either to global scope or to load within particular components as an asset belonging to it.

### Tests
* Some basic testing included for now.

### TODO (could be)
* Make more tests/testing rules.
* Implement Routes.
* Store state in localStorage or similar (so that on browser page reload we preserve the state).
