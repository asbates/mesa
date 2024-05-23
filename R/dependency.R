#' mesa Dependency
#'
#' Adds the necessary JavaScript dependencies. Call this in your apps UI.
#'
#' @export
mesaDependency <- function() {
  htmltools::htmlDependency(
    name = "mesa",
    version = "0.0.1",
    src = system.file(package = "mesa"),
    script = "mesa.js",
    stylesheet = "mesa.css"
  )
}


# maybe put this inside mesaOutput or renderMesa
