# mesa

`mesa` is an R package for rendering HTML tables in Shiny applications.
It's a minimal wrapper for the JavaScript package [Tanstack Table](https://tanstack.com/table/v8).
It also uses [Tanstack Query](https://tanstack.com/query/latest) for **server-side rendering**, handling both paginated rendering and **infinite scroll**.

`mesa` follows the design philosphy of Tanstack Table as much as possible.
That means `mesa` is utilitarian in nature and doesn't do as much hand-holding as you see in many Shiny packages.
What you do get is flexibility and customizability.
With `mesa` you get

- server-side rendering via pagination and infinite scroll
- complete control over your tables style
- use your own components for things like pagination controls and row selection
- full access to the table object in JavaScript
